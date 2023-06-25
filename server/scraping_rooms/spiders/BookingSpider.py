from scrapy.spiders import CrawlSpider, Rule
from scrapy.selector import Selector
from scrapy.loader import ItemLoader
from itemloaders.processors import MapCompose 
from scrapy.linkextractors import LinkExtractor
from scraping_rooms.items import HotelRoomItem
from datetime import datetime, timedelta

def get_date_days_after(days:int)->str:
    current_date = datetime.now()
    date_after = current_date + timedelta(days=days)
    return date_after.strftime('%Y-%m-%d')
 
class BookingSpider(CrawlSpider):
    name = "BookingSpider"
    allowed_domains = ['booking.com']
    start_urls = [f"https://www.booking.com/searchresults.es.html?ss=Colombia&ssne=Colombia&ssne_untouched=Colombia&aid=304142&lang=es&sb=1&src_elem=sb&src=searchresults&dest_id=47&dest_type=country&checkin={get_date_days_after(2)}&checkout={get_date_days_after(3)}&group_adults=2&no_rooms=1&group_children=0"]
    # https://www.booking.com/searchresults.es.html?ss=Colombia&ssne=Colombia&ssne_untouched=Colombia&aid=304142&lang=es&sb=1&src_elem=sb&src=searchresults&dest_id=47&dest_type=country&checkin=2023-06-24&checkout=2023-06-26&group_adults=2&no_rooms=1&group_children=0 
     
    download_delay = 0.5 #!
    
    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        # 'CLOSESPIDER_PAGECOUNT': 8, #!
        'CLOSESPIDER_ITEMCOUNT': 20, #!
        'DOWNLOAD_DELAY': 0.5,
    }
    
    rules = (
        Rule(
            LinkExtractor(
                allow=r'/searchresults'
            ), follow=True
        ),
        Rule(
            LinkExtractor( 
                allow=r'booking.com/hotel/'
            ), follow=True, callback='parser_hotel_room' 
        ), 
    )
    
    def clean_price(self, price:str):
       new_price = price.replace('$','').replace('.','').replace(' ','').replace('COP','').strip()
       if new_price:
           return float(new_price)
       else:
           return -1.0
       
    def clean_score(self, price:str):
       new_price = price.replace(',','.').replace(' ','').strip()
       if new_price:
           return round(float(new_price)/2, 1)
       else:
           return -1.0
   
    def parser_hotel_room(self, response):
        sel = Selector(response)
        item = ItemLoader(HotelRoomItem(), sel)
        item.add_xpath('name','//*[@id="hp_hotel_name"]//h2//text()') 
        item.add_xpath('description', '//*[@id="summary"]/div/div/p//text()')  
        item.add_xpath('price', '//*[@class="prco-valign-middle-helper"]//text()', MapCompose(self.clean_price))  
        item.add_xpath('score','//div[@data-testid="review-score-component"]//div[1]//text()', MapCompose(self.clean_score)) 
        item.add_xpath('geolocation','//p[@class="address address_clean"]/span[1]//text()') 
        item.add_value('link', [response.url]) 
        item.add_xpath('discount', '//*[@id="hprt-table"]//span[@data-bui-component="Badge"]//text()')
        item.add_xpath('images', '//a[@data-preview-image-layout="main"]/img/@src')
        item.add_xpath('images', '//a[@data-preview-image-layout="thumbnail"]/img/@src')
        item.add_xpath('services', '//div[@data-testid="property-section--content"]//div[@data-testid="property-most-popular-facilities-wrapper"]//div//span/div/span//text()')
        yield item.load_item()
    
    
    
    
        
        
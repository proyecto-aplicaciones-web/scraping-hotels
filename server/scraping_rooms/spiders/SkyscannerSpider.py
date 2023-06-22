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
 
class SkyscannerSpider(CrawlSpider):
    name = "SkyscannerSpider"
    allowed_domains = ['espanol.skyscanner.com']
    # start_urls = [f"https://www.espanol.skyscanner.com/hotels/search?entity_id=27539515&checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&adults=2&rooms=1"]
    start_urls = ["https://www.espanol.skyscanner.com/hotels/search?entity_id=27539515&","https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/hotel-bantu-by-faranda-boutique%2c-a-member-of-radisson-individuals/ht-46989106?checkin=2023-06-29&checkout=2023-06-30&rooms=1&adults=2&clicked_details_price=532486&currency=COP&impression_id=da69afe6-5b70-4438-a2fc-390b105c3198&locale=es-MX&market=CO&poiId=104128815&priceType=price-per-night&search_cycle_id=2364ec470ec5709b1f4d96182f745fffdc22b166c7a895e6e22f2bdcb70840d3&search_entity_id=27540568" ]
    # start_urls = ["https://www.espanol.skyscanner.com/hotels/"]
     
    download_delay = 5 #!
    
    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        # 'CLOSESPIDER_PAGECOUNT': 8, #!
        'CLOSESPIDER_ITEMCOUNT': 2, #!
        'DOWNLOAD_DELAY': 5,
    }
    
    rules = (
        Rule(
            LinkExtractor(
                allow=r'/hotels/search'
            ), follow=True
        ),
        Rule(
            LinkExtractor( 
                allow=r'/hoteles/([^/]+)/'
            ), follow=True, callback='parser_hotel_room' 
        ), 
    )
    
    def clean_price(self, price:str):
       new_price = price.replace('$','').replace('.','').replace(' ','').replace(',','').strip()
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
        item.add_xpath('name','//*[@id="hotel-description"]/p//text()') 
        item.add_xpath('description', '//*[@id="hotel-description"]/div/p//text()')  
        item.add_xpath('price', '//*[@data-test-id="best-offer-price"]//text()', MapCompose(self.clean_price))  
        item.add_xpath('score','//div[@data-test-id="reviews-ratings"]//div[@role="figure"]/span[@aria-hidden="true"][1]//text()', MapCompose(self.clean_score)) 
        item.add_xpath('geolocation','//button[@data-test-id="address-button"]//text()') 
        item.add_value('link', [response.url]) 
        item.add_xpath('discount', '//*[@data-test-id="hotel-card-badge"]//text()')
        
        item.add_xpath('services', '//*[@id="hotel-details-amenities-section"]//span/following-sibling::p//text()')
        yield item.load_item()
    
    
    
    
        
        
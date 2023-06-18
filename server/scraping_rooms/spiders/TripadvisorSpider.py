from scrapy.spiders import CrawlSpider, Rule
from scrapy.selector import Selector
from scrapy.loader import ItemLoader
from itemloaders.processors import MapCompose 
from scrapy.linkextractors import LinkExtractor
from scraping_rooms.items import HotelRoomItem
 
 
class TripadvisorSpider(CrawlSpider):
    name = "TripadvisorSpider"
    allowed_domains = ['tripadvisor.co']
    start_urls = ["https://www.tripadvisor.co/Hotels-g294073-Colombia-Hotels.html"]
     
    download_delay = 0.5 #!
    
    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        # 'CLOSESPIDER_PAGECOUNT': 8, #!
        'CLOSESPIDER_ITEMCOUNT': 2, #!
        'DOWNLOAD_DELAY': 1,
    }
    
    rules = (
        Rule(
            LinkExtractor(
                allow=r'/Hotels-g294073-'
            ), follow=True
        ),
        Rule(
            LinkExtractor( 
                allow=r'/Hotel_Review-g'
            ), follow=True, callback='parser_hotel_room' 
        ), 
    )
    
    def clean_price(self, price:str):
       new_price = price.replace('$','').replace('.','').replace(' ','').strip()
       if new_price:
           return float(new_price)
       else:
           return -1.0
       
    def clean_score(self, price:str):
       new_price = price.replace(',','.').replace(' ','').strip()
       if new_price:
           return float(new_price)
       else:
           return -1.0
   
    def parser_hotel_room(self, response):
        sel = Selector(response)
        item = ItemLoader(HotelRoomItem(), sel)
        item.add_xpath('name','//*[@id="HEADING"]//text()') 
        # item.add_xpath('description', '//div[@id="ABOUT_TAB"]/div[2]/div[1]/div[4]/div[1]/div[1]/div[1]/p[1]/text()') 
        # item.add_xpath('description', '//div[@id="ABOUT_TAB"]//text()')   
        item.add_xpath('price', '//div[@data-sizegroup="hr_chevron_prices"]/text()', MapCompose(self.clean_price)) #! TODO: Change later to select the lower price
        item.add_xpath('price', '//div[@data-automation="tab-bar-offer-price"]/div[1]//text()', MapCompose(self.clean_price)) 
        item.add_xpath('price', '//div[@class="premium_offers_area offers"]/div[2]/a/div[1]/div[2]//text()', MapCompose(self.clean_price)) 
        item.add_xpath('score','//div[@class="ui_column  "]/div/span//text()', MapCompose(self.clean_score)) 
        item.add_xpath('geolocation','//*[@id="component_3"]/div/div/div[2]/div/div[2]/div/div/div/span[2]//text()')
        # item.add_xpath('link','//h1[@class="ui-pdp-title"]//text()')
        # item.add_xpath('discount','//h1[@class="ui-pdp-title"]//text()')
        # item.add_value('link', ["link pendiente"])
        item.add_value('link', [response.url]) 
        item.add_xpath('discount', '//div[@data-component="@ta/hotels.hotel-review-atf-special-offer"]/div/div//text()')
        yield item.load_item()
        
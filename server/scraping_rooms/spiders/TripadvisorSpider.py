from scrapy.spiders import CrawlSpider, Rule
from scrapy.selector import Selector
from scrapy.loader import ItemLoader
from itemloaders.processors import MapCompose 
from scrapy.linkextractors import LinkExtractor
from scraping_rooms.items import HotelRoomItem
 
 
class TripadvisorSpider(CrawlSpider):
    name = "TripadvisorSpider"
    allowed_domains = ['tripadvisor.co/']
    start_urls = ["https://www.tripadvisor.co/Hotels-g294073-Colombia-Hotels.html"]
     
    download_delay = 0.5 #!
    
    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        'CLOSESPIDER_PAGECOUNT': 8, #!
        'CLOSESPIDER_ITEMCOUNT': 8, #!
        'DOWNLOAD_DELAY': 0.5,
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
       new_price = price.replace('$','').replace('.','').replace(' ','')
       return float(new_price.strip())
   
    def clean_prices(self, prices: list[str]):
        cleaned_prices = []
        for price in prices:
            new_price = price.replace('$','').replace('.','').replace(' ','')
            cleaned_prices.append(float(new_price.strip()))
        return cleaned_prices
    
    def parser_hotel_room(self, response):
        sel = Selector(response)
        item = ItemLoader(HotelRoomItem(), sel)
        item.add_xpath('name','//*[@id="HEADING"]//text()')
        item.add_value('description', "Descripción pendiente")
        item.add_xpath('price', '//div[@data-sizegroup="hr_chevron_prices"]//text()', MapCompose(self.clean_prices)) #! TODO: Change later to select the lower price
        item.add_xpath('score','//*[@id="ABOUT_TAB"]/div[2]/div[1]/div[1]/span//text()')
        item.add_xpath('geolocation','//*[@id="component_3"]/div/div/div[2]/div/div[2]/div/div/div/span[2]//text()')
        # item.add_xpath('link','//h1[@class="ui-pdp-title"]//text()')
        # item.add_xpath('discount','//h1[@class="ui-pdp-title"]//text()')
        item.add_value('link', "link pendiente")
        item.add_value('discount', False)
        yield item.load_item()
        
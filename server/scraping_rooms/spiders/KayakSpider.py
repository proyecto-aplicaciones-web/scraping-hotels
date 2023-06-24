from scrapy.spiders import CrawlSpider, Rule
from scrapy.selector import Selector
from scrapy.loader import ItemLoader
from itemloaders.processors import MapCompose 
from scrapy.linkextractors import LinkExtractor
from scraping_rooms.items import HotelRoomItem
from datetime import datetime, timedelta
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def get_date_days_after(days:int)->str:
    current_date = datetime.now()
    date_after = current_date + timedelta(days=days)
    return date_after.strftime('%Y-%m-%d')
 
class KayakSpider(CrawlSpider):
    name = "KayakSpider"
    allowed_domains = ['tripadvisor.co']
    # start_urls = [f"https://www.kayak.com.co/hotels/Colombia-u53/{get_date_days_after(2)}/{get_date_days_after(3)}/2adults?sort=rank_a", f"https://www.kayak.com.co/hotels/Four-Points-by-Sheraton-Medellin,Medellin-c30430-h42183-details/{get_date_days_after(2)}/{get_date_days_after(3)}/2adults?psid=dlDkMuEKJw#overview"]
    start_urls = [
        f"https://www.kayak.com.co/hotels/Faranda-Collection-Barranquilla-Radisson,Barranquilla-c30628-h6039795-details/2023-09-11/2023-09-12/2adults?psid=dnAkJXbPTL#overview"
        
        ]
     
    download_delay = 10 #!
    
    custom_settings = {
        'USER_AGENT': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        # 'CLOSESPIDER_PAGECOUNT': 8, #!
        'CLOSESPIDER_ITEMCOUNT': 2, #!
        'DOWNLOAD_DELAY': 10,
    }
    
    def start_requests(self):
        # Invocar las reglas y generar las solicitudes de seguimiento
        for url in self.start_urls:
            yield SeleniumRequest(
                url=url,
                callback=self.parser_hotel_room,
                wait_time=10,
                wait_until=EC.presence_of_element_located((By.XPATH, '//*[@class="c3xth-hotel-name"]//text()')),
        )
    
    rules = (
        Rule(
            LinkExtractor(
                allow=r'/hotels/Colombia-u53/'
            ), follow=True
        ),
        Rule(
            LinkExtractor( 
                allow=r'/psid='
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
           return round(float(new_price)/2, 1)
       else:
           return -1.0
   
    def parser_hotel_room(self, response):
        sel = Selector(response)
        item = ItemLoader(HotelRoomItem(), sel)
        item.add_xpath('name','//*[@class="c3xth-hotel-name"]//text()') 
        item.add_xpath('description', '//div[@data-section-name="overview"]//div[@class="b40a-desc-wrap--full"]//text()')     
        item.add_xpath('price', '//div[@class="LK1E-rates-row"]', MapCompose(self.clean_price))  
        item.add_xpath('price', '//span[@class="c3xth-price"]/span[1]//text()', MapCompose(self.clean_price))  
        item.add_xpath('score','//div[@class="b40a-rating-info"]/div[1]//text()', MapCompose(self.clean_score)) 
        item.add_xpath('geolocation','//div[@class="c3xth-address"]//text()') 
        item.add_value('link', [response.url]) 
        # item.add_xpath('discount', '//div[@data-component="@ta/hotels.hotel-review-atf-special-offer"]/div/div//text()')
        
        item.add_xpath('services', '//div[@data-section-name="amenities"]/div[1]//li//span//text()')
        yield item.load_item()
    
    
    
    
        
        
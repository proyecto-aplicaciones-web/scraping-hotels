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
 
class SkyscannerSpider(CrawlSpider):
    name = "SkyscannerSpider"
    allowed_domains = ['espanol.skyscanner.com']
    start_urls = [
        f"https://www.espanol.skyscanner.com/hotels/search?entity_id=27539515&checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&adults=2&rooms=1",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/selina-parque-93-bogota/ht-114399537?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/selina-chapinero-bogota/ht-104481095?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/hotel-boutique-embajada-de-la-feria/ht-131182057?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/ghl-hotel-tequendama-bogota/ht-116305465?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/hotel-dorado-plaza/ht-134679986?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/wyndham-bogota/ht-127019245?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/radisson-bogota-metrotel/ht-134679987?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/hotel-regina/ht-129848085?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/hotel-san-nicolas-bogota/ht-129245335?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/hotel-virrey-park/ht-71801888?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/lavid-hotel-kennedy/ht-136305278?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/c%26s-habitaciones/ht-157087000?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/bogota-hoteles/hotel-fenix-real-bogota/ht-137731350?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/selina-cartagena/ht-147898288?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/hotel-almirante-cartagena---colombia/ht-134505799?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/ghl-corales-de-indias/ht-126089712?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/wyndham-garden-cartagena/ht-212765094?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/hotel-stil-cartagena/ht-82001793?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/sonesta-hotel-cartagena/ht-46998917?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/mansion-bahia-manga/ht-213159343?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/holiday-inn-cartagena-morros%2c-an-ihg-hotel/ht-82030996?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/hotel-dann-cartagena/ht-46974927?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/santuario-getsemani-hostel/ht-199271828?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/hotel-santa-alejandria/ht-134569703?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/the-clock-hostel-and-suites/ht-160995562?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        f"https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/hotel-ayenda-casa-cano-1805/ht-205027471?checkin={get_date_days_after(3)}&checkout={get_date_days_after(5)}&rooms=1&adults=2",
        
        ]
    # start_urls = ["https://www.espanol.skyscanner.com/hotels/search?entity_id=27539515&","https://www.espanol.skyscanner.com/hoteles/colombia/cartagena-de-indias-hoteles/hotel-bantu-by-faranda-boutique%2c-a-member-of-radisson-individuals/ht-46989106?checkin=2023-06-29&checkout=2023-06-30&rooms=1&adults=2&clicked_details_price=532486&currency=COP&impression_id=da69afe6-5b70-4438-a2fc-390b105c3198&locale=es-MX&market=CO&poiId=104128815&priceType=price-per-night&search_cycle_id=2364ec470ec5709b1f4d96182f745fffdc22b166c7a895e6e22f2bdcb70840d3&search_entity_id=27540568" ]
    # start_urls = ["https://www.espanol.skyscanner.com/hotels/"]
     
    download_delay = 5 #!
    
    

    def start_requests(self):
        # Invocar las reglas y generar las solicitudes de seguimiento
        for url in self.start_urls:
            yield SeleniumRequest(
                url=url,
                callback=self.parser_hotel_room,
                wait_time=10,
                wait_until=EC.presence_of_element_located((By.XPATH, '//div[@class="PriceChangeReminder"]//h2//text()')),
        )

    
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
           return round(float(new_price)/1, 1)
       else:
           return -1.0
   
    def parser_hotel_room(self, response):
        sel = Selector(response)
        item = ItemLoader(HotelRoomItem(), sel)
        item.add_xpath('name','//*[@id="hotel-description"]/p//text()') 
        item.add_xpath('description', '//*[@id="hotel-description"]/div/p//text()')  
        # item.add_xpath('price', '//*[@data-test-id="best-offer-price"]//text()', MapCompose(self.clean_price))  
        item.add_xpath('price', '//div[@class="PriceChangeReminder"]//h2//text()', MapCompose(self.clean_price))  
        item.add_xpath('score','//div[@data-test-id="reviews-ratings"]//div[@role="figure"]/span[@aria-hidden="true"][1]//text()', MapCompose(self.clean_score)) 
        item.add_xpath('geolocation','//button[@data-test-id="address-button"]//text()') 
        item.add_value('link', [response.url]) 
        item.add_xpath('discount', '//*[@data-test-id="hotel-card-badge"]//text()')
        
        item.add_xpath('services', '//*[@id="hotel-details-amenities-section"]//span/following-sibling::p//text()')
        item.add_xpath('images', '//div[@data-test-id="media-grid-section"]//picture/img/@src')
        yield item.load_item()
    
    
    
    
        
        
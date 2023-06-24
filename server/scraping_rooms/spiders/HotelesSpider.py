from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.loader import ItemLoader
from itemloaders.processors import MapCompose
from scraping_rooms.items import HotelRoomItem
from datetime import datetime, timedelta
from scrapy_selenium import SeleniumRequest
from shutil import which
from scrapy.selector import Selector

def get_date_days_after(days: int) -> str:
    current_date = datetime.now()
    date_after = current_date + timedelta(days=days)
    return date_after.strftime('%Y-%m-%d')

SELENIUM_DRIVER_NAME = 'firefox'
SELENIUM_DRIVER_EXECUTABLE_PATH = which('geckodriver')
SELENIUM_DRIVER_ARGUMENTS = ['--headless']

class HotelesSpider(CrawlSpider):
    name = "HotelesSpider"
    allowed_domains = ['co.hoteles.com']
    start_urls = [ 
        f"https://co.hoteles.com/ho192087/hotel-park-10-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho646998/terra-biohotel-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho2957877056/versus-hotel-dixcove-ghana/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho2517890720/joe-s-place-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho1214157856/lleras-express-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho399226/mi-hotel-sandiego-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho173465888/ibis-medellin-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho323560/hotel-estelar-blue-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho1242490336/the-somos-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho2409496672/eutopiq-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho326830/hotel-estelar-milla-de-oro-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho555198/hotel-bolivariana-plaza-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho256144/novelty-suites-hotel-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho1089009824/hotel-romanza-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",
        f"https://co.hoteles.com/ho2293354816/la-martina-boutique-hotel-medellin-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP",   
        ] 

    
    
    def start_requests(self):
        # Invocar las reglas y generar las solicitudes de seguimiento
        for url in self.start_urls:
            yield SeleniumRequest(
                url=url,
                callback=self.parse_hotel_room,
                wait_time=10,
            )

    def clean_price(self, price: str):
        new_price = price.replace('$', '').replace('.', '').replace(' ', '').replace('COP', '').strip()
        if new_price:
            return float(new_price)
        else:
            return -1.0

    def clean_score(self, price: str):
        new_price = price.replace(',', '.').replace(' ', '').strip()
        if new_price:
            return round(float(new_price) / 2, 1)
        else:
            return -1.0

    rules = (
        Rule(
            LinkExtractor(
                allow=r'/Hotel-Search'
            ),
            follow=True
        ),
        Rule(
            LinkExtractor(
                allow=r"/ho\d{5,7}$"
            ),
            callback='parse_hotel_room', follow=True
        ),
    )

    def parse_hotel_room(self, response):
        sel = Selector(response)
        item = ItemLoader(HotelRoomItem(), sel)
        item.add_xpath('name', '//*[@id="Overview"]//h1//text()')
        item.add_xpath('description', '//div[@itemprop="description"]//div[@data-stid="content-markup"]//text()')  
        # item.add_xpath('price', '//*[@data-test-id="best-offer-price"]//text()', MapCompose(self.clean_price))  
        item.add_xpath('price', '//div[@data-test-id="price-summary-message-line"]/div/span[@aria-hidden="true"]//text()', MapCompose(self.clean_price))  
        item.add_xpath('score','//div[@class="uitk-spacing uitk-spacing-margin-block-six"]//div[@class="uitk-text uitk-type-900 uitk-type-regular uitk-text-default-theme"]//span//text()', MapCompose(self.clean_score)) 
        item.add_xpath('geolocation','//div[@data-stid="content-hotel-address"]//text()') 
        item.add_value('link', [response.url]) 
        item.add_xpath('discount', '//div[@class="uitk-spacing uitk-spacing-margin-three"]//span[@class="uitk-badge-text"]//text()')
        
        item.add_xpath('services', '//*[@id="Amenities"]//div[@itemprop="amenityFeature"]//span[@itemprop="name"]//text()')
        item.add_xpath('images', '//*[@id="Overview"]//div[@class="uitk-image-placeholder"]/img/@src')
        yield item.load_item()

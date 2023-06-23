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
        f"https://co.hoteles.com/ho124989/nh-collection-bogota-andino-royal-bogota-colombia/?chkin={get_date_days_after(3)}&chkout={get_date_days_after(5)}&flexibility=0_DAY&x_pwa=1&rfrr=HSR&top_cur=COP"
        
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
        item.add_value('link', [response.url])
        yield item.load_item()

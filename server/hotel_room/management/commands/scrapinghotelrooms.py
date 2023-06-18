from django.core.management.base import BaseCommand 
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings  
import requests

class Command(BaseCommand):
    help = "Release the spiders"
    
    def start_splash(self):
        url = 'http://localhost:8050/api/v1/services'
        payload = {
            'image': 'splash',
            'args': ['splash', '--disable-lua-sandbox'],
            'port': 8050,
            'wait': 0,
        }
        response = requests.post(url, json=payload)
        if response.status_code == 201:
            print('El servidor Splash se inició correctamente.')
        else:
            print('Hubo un error al iniciar el servidor Splash.') 
            

    def handle(self, *args, **options):
        print('Inicializando scraping...')
        self.start_splash()
        settings = get_project_settings()
        # settings.set('LOG_ENABLED', False ,priority='cmdline')
        process = CrawlerProcess(settings)

        # process.crawl('BookingSpider')
        # process.crawl('KayakSpider')
        # process.crawl('SkyscannerSpider')
        process.crawl('TripadvisorSpider') 
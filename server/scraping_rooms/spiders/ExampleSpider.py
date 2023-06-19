
import scrapy
from scrapy.http import HtmlResponse
from scrapy.linkextractors import LinkExtractor
from scrapy.spiders import CrawlSpider, Rule
from scrapy_splash import SplashRequest, SplashTextResponse, SplashJsonResponse



class ExampleSpider(CrawlSpider):
    _WAIT = 0.1

    name = "ExampleSpider"
    allowed_domains = ['books.toscrape.com']
    start_urls = ["https://books.toscrape.com/catalogue/category/books_1/index.html"]

    le_book_details = LinkExtractor(restrict_css=("h3 > a",))
    rule_book_details = Rule(le_book_details, callback='parse_request', follow=False, process_request='use_splash')

    le_next_page = LinkExtractor(restrict_css='.next > a')
    rule_next_page = Rule(le_next_page, follow=True, process_request='use_splash')

    rules = (
        rule_book_details,
        rule_next_page,
    )

    def start_requests(self):
        for url in self.start_urls:
            yield SplashRequest(url, args={'wait': self._WAIT}, meta={'real_url': url})

    def use_splash(self, request, response): #!
        request.meta['splash'] = {
            'endpoint': 'render.html',
            'args': {
                'wait': self._WAIT
            }
        }
        return request

    def _requests_to_follow(self, response): #!
        if not isinstance(response, (HtmlResponse, SplashTextResponse, SplashJsonResponse)):
            return
        seen = set()
        for rule_index, rule in enumerate(self._rules):
            links = [
                lnk
                for lnk in rule.link_extractor.extract_links(response)
                    if lnk not in seen
            ]
            for link in rule.process_links(links):
                seen.add(link)
                request = self._build_request(rule_index, link)
                yield rule.process_request(request, response)

    def parse_request(self, response: scrapy.http.Response):
        self.logger.info(f'Page status code = {response.status}, url= {response.url}')

        yield {
             'Title': response.css('h1 ::text').get(),
             'Link': response.url,
             'Description': response.xpath('//*[@id="content_inner"]/article/p/text()').get()
         }


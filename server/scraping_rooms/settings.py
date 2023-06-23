import sys
import platform
from shutil import which
import os

# Obtain the geckodriver absolute path
base_dir = os.path.dirname(os.path.abspath(__file__)) 
driver_path = os.path.join(base_dir, 'spiders', 'chromedriver')
print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", driver_path)
# Scrapy settings for scraping_rooms project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = "scraping_rooms"

SPIDER_MODULES = ["scraping_rooms.spiders"]
NEWSPIDER_MODULE = "scraping_rooms.spiders"


# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = "scraping_rooms (+http://www.yourdomain.com)"

# Obey robots.txt rules
ROBOTSTXT_OBEY = False #! More freedom to scrapy

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# See https://docs.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
DOWNLOAD_DELAY = 0.5 #! 0.5 seconds per search
# The download delay setting will honor only one of:
#CONCURRENT_REQUESTS_PER_DOMAIN = 16
#CONCURRENT_REQUESTS_PER_IP = 16

# Disable cookies (enabled by default)
#COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
#DEFAULT_REQUEST_HEADERS = {
#    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
#    "Accept-Language": "en",
#}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    "scraping_rooms.middlewares.ScrapingRoomsSpiderMiddleware": 543,
#}





### SELENIUM

def get_geckodriver_path():
    os = platform.system().lower()
    
    if os == 'windows':
        return './web_drivers/geckodriver.exe'
    elif os == 'linux':
        return './web_drivers/geckodriver_linux'
    else:
        raise Exception('Sistema operativo no compatible')
     
# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
   # "scraping_rooms.middlewares.ScrapingRoomsDownloaderMiddleware": 543,
   'scrapy_selenium.SeleniumMiddleware': 800,
}
SELENIUM_DRIVER_NAME = 'chrome'
# SELENIUM_DRIVER_EXECUTABLE_PATH = get_geckodriver_path()
SELENIUM_DRIVER_EXECUTABLE_PATH = which('chromedriver') 
# SELENIUM_DRIVER_EXECUTABLE_PATH = driver_path
SELENIUM_DRIVER_ARGUMENTS=['--headless'] 
SELENIUM_COMMAND_EXECUTOR='http://localhost:4444/wd/hub' 

# MOZILLA_DRIVER_PATH = driver_path
# SELENIUM_BROWSER_EXECUTABLE_PATH = which('firefox')
# SELENIUM_COMMAND_EXECUTOR = 'http://localhost:4444/wd/hub'

# Enable or disable extensions
# See https://docs.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    "scrapy.extensions.telnet.TelnetConsole": None,
#}

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
   "scraping_rooms.pipelines.ScrapingRoomsPipeline": 300,
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = "httpcache"
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = "scrapy.extensions.httpcache.FilesystemCacheStorage"

# Set settings whose default value is deprecated to a future-proof value
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"

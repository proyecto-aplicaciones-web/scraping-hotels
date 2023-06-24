# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html
 
from scrapy.item import Item, Field

 
class HotelRoomItem(Item):
    name = Field()
    description = Field()
    price = Field()
    score = Field()
    geolocation = Field()
    link = Field()
    discount = Field()
    
    # To model with service
    services = Field()
    
    # To model with images
    images = Field() 
    
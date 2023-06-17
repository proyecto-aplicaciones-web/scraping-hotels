# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import traceback
from asgiref.sync import sync_to_async
from hotel_room.models import HotelRoom


class ScrapingRoomsPipeline:
    async def process_item(self, item, spider):
        await self.save_item(item, spider)
        return item
    
    @sync_to_async
    def save_item(self, item, spider):
        try:
            hotel_room_data = {}
            hotel_room_data['name'] = item.get('name', ['Without name'])[0]
            hotel_room_data['description'] = item.get('description', ['Without description'])[0]
            hotel_room_data['price'] = item.get('price', [-1])
            hotel_room_data['score'] = item.get('score', [-1])[0]
            hotel_room_data['geolocation'] = item.get('geolocation', ['Without geolocation'])[0]
            hotel_room_data['link'] = item.get('link', ['Without link'])[0]
            hotel_room_data['discount'] = item.get('discount', [False])[0]
            print('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
            if hotel_room_data['name'] != 'Without name':
                print(hotel_room_data)
                HotelRoom.objects.create(
                    name = hotel_room_data['name'],
                    description = hotel_room_data['description'],
                    price = min(hotel_room_data['price']),
                    score = hotel_room_data['score'],
                    geolocation = hotel_room_data['geolocation'],
                    link = hotel_room_data['link'],
                    discount = hotel_room_data['discount'],
                )    
            
        except Exception as e:
            print('Error strange detected:', e)
            traceback.print_exc()
            
        return item

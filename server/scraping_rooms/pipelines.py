# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import traceback
from asgiref.sync import sync_to_async
from hotel_room.models import HotelRoom
from hotel_room_service.models import HotelRoomService
from typing import List

class ScrapingRoomsPipeline:
    
    def bind_description(self, words:List[str]):
        final_words = words.pop(0)
        for word in words:
            final_words = final_words + "\n" + word
        return final_words.strip()
    
    async def process_item(self, item, spider):
        await self.save_item(item, spider)
        return item
    
    @sync_to_async
    def save_item(self, item, spider):
        try:
            hotel_room_data = {}
            hotel_room_data['name'] = item.get('name', ['Without name'])[0]
            hotel_room_data['description'] = item.get('description', ['Without description'])
            hotel_room_data['price'] = item.get('price', [-1])
            hotel_room_data['score'] = item.get('score', [-1])[0]
            hotel_room_data['geolocation'] = item.get('geolocation', ['Without geolocation'])[0]
            hotel_room_data['link'] = item.get('link', ['Without link'])[0]
            hotel_room_data['discount'] = item.get('discount', ['False'])[0]
            
            hotel_room_data['services'] = item.get('services', ['Without additional services'])
            
            if hotel_room_data['name'] != 'Without name':
                print(hotel_room_data)
                if hotel_room_data['discount'] != 'False':
                    hotel_room_data['discount'] = True 
                else:
                    hotel_room_data['discount'] = False
                    
                
                try:
                    hotel_room = HotelRoom.objects.get(name=hotel_room_data['name'])
                    hotel_room.price = min(hotel_room_data['price'])
                    hotel_room.discount = hotel_room_data['discount']
                    hotel_room.score = hotel_room_data['score']
                except HotelRoom.DoesNotExist:
                    print('REGISTERING NEW HOTELROOM!!!!!!!!!!!!!!!!!!!!!')
                    hotel_room = HotelRoom.objects.create(
                        name = hotel_room_data['name'],
                        description = self.bind_description(hotel_room_data['description']), 
                        price = min(hotel_room_data['price']),
                        score = hotel_room_data['score'],
                        geolocation = hotel_room_data['geolocation'],
                        link = hotel_room_data['link'],
                        discount = hotel_room_data['discount'],
                    )   
                    
                    for service in hotel_room_data['services']:
                        HotelRoomService.objects.create(hotel_room_id=hotel_room, service=service)
            
        except Exception as e:
            print('Error strange detected:', e)
            traceback.print_exc()
            
        return item

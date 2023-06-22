from django.db import models

from hotel_room.models import HotelRoom

# Create your models here.
class HotelRoomService(models.Model):
    id = models.AutoField(primary_key=True)
    hotel_room_id = models.ForeignKey(HotelRoom, on_delete=models.CASCADE,related_name='services')
    service = models.TextField()

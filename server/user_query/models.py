from django.db import models

from hotel_room.models import HotelRoom
from user.models import User

# Create your models here.
class UserQuery(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, to_field='id')
    hotel_room_id = models.ForeignKey(HotelRoom, on_delete=models.CASCADE, to_field='id')
    createdAt = models.DateTimeField(auto_now_add=True, blank=True)

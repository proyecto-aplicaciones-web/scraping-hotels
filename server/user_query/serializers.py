from rest_framework import serializers
from hotel_room.serializers import HotelRoomSerializer
from .models import UserQuery

class UserQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserQuery
        fields = '__all__'
        
    # hotel_room_id = HotelRoomSerializer()

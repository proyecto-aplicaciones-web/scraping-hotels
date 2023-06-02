from rest_framework import serializers
from .models import HotelRoomService

class HotelRoomServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoomService
        fields = '__all__'

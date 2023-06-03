from rest_framework import serializers
from .models import HotelRoom
from hotel_room_image.serializers import HotelRoomImageSerializer
from hotel_room_service.serializers import HotelRoomServiceSerializer

class HotelRoomSerializer(serializers.ModelSerializer):
    images = HotelRoomImageSerializer(many=True)
    services = HotelRoomServiceSerializer(many=True)

    class Meta:
        model = HotelRoom
        fields = ('id', 'name', 'description', 'price', 'score', 'geolocation', 'link', 'discount', 'images', 'services')

class HotelRoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoom
        fields = '__all__'


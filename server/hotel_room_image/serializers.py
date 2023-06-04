from rest_framework import serializers
from .models import HotelRoomImage

class HotelRoomImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoomImage
        fields = '__all__'

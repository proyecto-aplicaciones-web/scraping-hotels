from rest_framework import serializers
from .models import HotelRoom

class HotelRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelRoom
        fields = '__all__'

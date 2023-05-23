from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ['user_id','first_name', 'last_name', 'password', 'role', 'state', 'email']

#SERIALIZER

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields= ['news_id','news_date', 'news_title', 'news_description', 'news_image']
    
    def create(self, validated_data):
        return News.objects.create(**validated_data)




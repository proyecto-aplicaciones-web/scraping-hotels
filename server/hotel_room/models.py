from django.db import models

# Create your models here.
class HotelRoom(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField()
    description = models.TextField()
    price = models.FloatField()
    score = models.FloatField()
    geolocation = models.TextField()
    link = models.URLField(max_length=1000)
    discount = models.BooleanField()
    
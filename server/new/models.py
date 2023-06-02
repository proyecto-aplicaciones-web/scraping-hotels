from django.db import models

# Create your models here
class New(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField()
    image = models.URLField()
    createdAt = models.DateTimeField(auto_now_add=True, blank=True)
    updatedAt = models.DateTimeField(auto_now=True, blank=True)
    
from django.db import models

ROLES = [
    ('user', 'User'),
    ('admin', 'Admin'),
]

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10, choices=ROLES, default="user", blank=True)
    state = models.BooleanField(default=True, blank=True)

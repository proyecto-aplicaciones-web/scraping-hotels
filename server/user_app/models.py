from django.db import models

# Create your models here.


class User(models.Model):
    class Meta:
       db_table="User"
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    password = models.CharField(max_length=50)  #! Remember change this field, should be encrypted
    role = models.CharField(max_length=20, default="user")
    state = models.BooleanField(default=True)
    email = models.EmailField(max_length=200)

    
    

class News(models.Model):
    class Meta:
        db_table = "News"
    news_id = models.AutoField(primary_key=True)
    news_date = models.DateField(auto_now_add=True)
    news_title = models.CharField(max_length=50)
    news_description = models.CharField(max_length=300)
    news_image = models.URLField()

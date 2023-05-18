from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    password = models.CharField(max_length=50) #! Remember change this field, should be encrypted
    role = models.CharField(max_length=20, default="user")
    state = models.BooleanField(default=True)
    email = models.EmailField(max_length=200)

    @staticmethod
    def create_user(first_name:str, 
                    last_name:str, 
                    password:str, 
                    role:str, 
                    email: str):
        user = User(first_name = first_name, 
                    last_name = last_name, 
                    password = password, 
                    role = role, 
                    email = email)
        user.save()
        return user
 
    def delete_user(self):
        self.state = False
        self.save()
        return self

    def modify_user(self, 
                    first_name:str, 
                    last_name:str, 
                    password:str, 
                    role:str):
        if first_name != None:
            self.first_name = first_name
        if last_name != None:
            self.last_name = last_name
        if password != None:
            self.password = password
        if role != None:
            self.role = role
        self.save()
        return self
        
    @staticmethod    
    def get_user(user_id:int):
        user = User.objects.get(user_id=user_id)
        return user
    
    @staticmethod    
    def get_users():
        users = User.objects.all()
        return users
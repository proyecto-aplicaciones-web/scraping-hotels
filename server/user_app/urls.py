from django.contrib import admin
from django.urls import path
from user_app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # User
    path('user/create', views.create_user, name='create_user'),
    path('users/get/all', views.get_users, name='get_users'),
    path('users/get/<int:user_id>', views.get_user, name='get_user'),
    path('users/modify/<int:user_id>', views.modify_user, name='modify_user'),
    path('users/delete/<int:user_id>', views.delete_user, name='delete_user'),
]
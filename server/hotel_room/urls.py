from django.urls import path
from hotel_room import views


urlpatterns = [
    path('', views.get_hotel_rooms, name='get_hotel_rooms'),
    path('<int:room_id>/', views.get_hotel_room, name='get_hotel_room'),
    path('create/', views.create_hotel_room, name='create_hotel_room'),
    path('modify/<int:room_id>/', views.modify_hotel_room, name='modify_hotel_room'),
    path('delete/<int:room_id>/', views.delete_hotel_room, name='delete_hotel_room'),
]
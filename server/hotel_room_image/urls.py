from django.urls import path
from hotel_room_image import views

urlpatterns = [
    path('<int:room_id>/', views.get_images_by_room_id, name='get_images_by_room_id'),
    path('create/', views.create_hotel_room_image, name='create_hotel_room_image'),
    path('delete/<int:image_id>/', views.delete_hotel_room_image, name='delete_hotel_room_image'),
]
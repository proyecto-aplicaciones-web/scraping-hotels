from django.urls import path
from hotel_room_service import views

urlpatterns = [
    path('<int:room_id>/', views.get_services_by_room_id, name='get_services_by_room_id'),
    path('create/', views.create_hotel_room_service, name='create_hotel_room_service'),
    path('delete/<int:service_id>/', views.delete_hotel_room_service, name='delete_hotel_room_service'),
]
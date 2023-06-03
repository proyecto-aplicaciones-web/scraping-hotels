from django.urls import path
from user_query import views

urlpatterns = [
    path('', views.get_all_user_query, name='get_all_user_query'),
    path('most_visited_rooms/', views.get_most_visited_rooms, name='get_most_visited_rooms'),
    path('user_visited_rooms/<int:user_id>/', views.get_visited_rooms_by_user_id, name='get_visited_rooms_by_user_id'),
    path('create/', views.create_user_query, name='create_user_query'),
]
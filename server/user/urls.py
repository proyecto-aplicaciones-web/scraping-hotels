from django.urls import path
from user import views


urlpatterns = [
    path('', views.get_users, name='get_users'),
    path('<int:user_id>/', views.get_user, name='get_user'),
    path('create/', views.create_user, name='create_user'),
    path('modify/<int:user_id>/', views.modify_user, name='modify_user'),
    path('delete/<int:user_id>/', views.delete_user, name='delete_user'),
]
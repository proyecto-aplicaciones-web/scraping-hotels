from django.urls import path
from new import views

urlpatterns = [
    path('', views.get_news, name='get_news'),
    path('<int:new_id>/', views.get_new, name='get_new'),
    path('create/', views.create_new, name='create_new'),
    path('modify/<int:new_id>/', views.modify_new, name='modify_new'),
    path('delete/<int:new_id>/', views.delete_new, name='delete_new'),
]
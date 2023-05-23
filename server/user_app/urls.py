from django.contrib import admin
from django.urls import path
from user_app import views


urlpatterns = [
    path('admin/', admin.site.urls),
    # User
    path('users/', views.get_users, name='get_users'),
    path('users/<int:user_id>', views.get_user, name='get_user'),
    path('users/create', views.create_user, name='create_user'),
    path('users/modify/<int:user_id>', views.modify_user, name='modify_user'),
    path('users/delete/<int:user_id>', views.delete_user, name='delete_user'),
    #News
    path('news/', views.NewsList.as_view(), name='NewsList'),
    path('news/<int:news_id>', views.NewsId.as_view(), name='NewsId'),
    path('news/create', views.NewsCreate.as_view(), name='NewsCreate'),
    path('news/delete/<int:news_id>', views.NewsDelete.as_view(), name='NewsDelete'),
]
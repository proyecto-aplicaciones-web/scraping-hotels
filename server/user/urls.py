from django.urls import path,re_path
from user import views

urlpatterns = [
    path('', views.get_users, name='get_users'),
    path('login/', views.login, name='login'),
		path('google-auth/', views.register_by_access_token),
    # path('api/auth/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('count/', views.get_users_count, name='get_users_count'),
    path('<int:user_id>/', views.get_user, name='get_user'),
    path('create/', views.create_user, name='create_user'),
    path('modify/<int:user_id>/', views.modify_user, name='modify_user'),
    path('delete/<int:user_id>/', views.delete_user, name='delete_user'),
]
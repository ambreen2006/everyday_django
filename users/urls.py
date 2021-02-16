from django.urls import path
# from rest_framework import routers
# from django.conf.urls import url, include
from rest_framework_simplejwt.views import TokenRefreshView
from users.views import dashboard
from users.views import CreateUserView, LoginView

urlpatterns = [
    path('dashboard/', dashboard, name="dashboard"),
    path('', CreateUserView.as_view(), name='create_user'),
    path('login/', LoginView.as_view(), name='user_login'),
    path('token/refresh', TokenRefreshView, name='token_refresh'),
    # path('api-auth/', include('rest_framework.urls')),
    # path('register/', UserCreate.as_view(), name="user_create")
]
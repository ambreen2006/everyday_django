from django.urls import path
from users.views import dashboard
from users.views import CreateUserView, LoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('dashboard/', dashboard, name="dashboard"),
    path('', CreateUserView.as_view(), name='create_user'),
    path('login/', LoginView.as_view(), name='user_login'),
    path('token/refresh', TokenRefreshView, name='token_refresh'),
]
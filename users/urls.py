from django.conf.urls import url, include
from users.views import dashboard

urlpatterns = [
    url('', dashboard, name="dashboard"),
    url('^accounts/', include("django.contrib.auth.urls"))
]
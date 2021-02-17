from django.urls import path
from rest_framework import routers
from django.conf.urls import include

from .views import EDNoteView

app_name = "everyday_notes"

router = routers.SimpleRouter()
router.register(r'notes', EDNoteView)

urlpatterns = [
    path('', include(router.urls)),
]
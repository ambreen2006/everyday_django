from rest_framework import viewsets, permissions

from .models import EDNote
from .serializers import EDNoteSerializer


class EDNoteView(viewsets.ModelViewSet):
    queryset = EDNote.objects.all()
    serializer_class = EDNoteSerializer
    permission_classes = (permissions.IsAuthenticated, )
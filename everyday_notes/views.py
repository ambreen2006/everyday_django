from rest_framework import viewsets, permissions

from .models import EDNote
from .serializers import EDNoteSerializer


class EDNoteView(viewsets.ModelViewSet):
    lookup_field = 'id'
    lookup_url_kwarg = 'notes_id'
    queryset = EDNote.objects.all()
    serializer_class = EDNoteSerializer
    permission_classes = (permissions.IsAuthenticated, )
import uuid
from django.db import models
from django.shortcuts import reverse


class EDNote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    body = models.TextField()

    def __str__(self):
        return f"{self.id}"

    def get_absolute_url(self):
        return reverse('notes:notes_detail', kwargs={'notes_id': self.id})
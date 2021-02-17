import uuid
from django.db import models
from django.conf import settings
from django.shortcuts import reverse


class EDNote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.DO_NOTHING,
        related_name="notes_by_user"
    )

    def __str__(self):
        return f"{self.id}"

    def get_absolute_url(self):
        return reverse('notes:ednote-detail', kwargs={'notes_id': self.id})
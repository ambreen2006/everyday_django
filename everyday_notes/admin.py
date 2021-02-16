from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from .models import EDNote


@admin.register(EDNote)
class EDNoteAdmin(admin.ModelAdmin):
    fields = (
        'id', 'title', 'body', 'created', 'modified'
    )
    list_display = (
        'id', 'title', 'body', 'created', 'modified'
    )
    readonly_fields = (
        'id', 'created', 'modified'
    )
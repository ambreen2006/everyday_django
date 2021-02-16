from rest_framework import serializers
from .models import EDNote


class EDNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = EDNote
        fields = '__all__'
        read_only_fields = ('id', 'created', 'modified')
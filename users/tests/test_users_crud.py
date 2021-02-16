from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

from everyday_notes.models import EDNote

import base64
import json

PASSWORD = 'pAssw0rd123!'


def create_user(username="test_user1@everydayapps.com", password=PASSWORD):
    return get_user_model().objects.create_user(
        username=username,
        first_name='Test',
        last_name='User',
        password=password
    )


class AuthenticationTest(APITestCase):
    def test_user_creation(self):
        response = self.client.post(reverse('create_user'), data={
            'username': 'test_user@everydayapsp.com',
            'first_name': 'Test',
            'last_name': 'User',
            'password1': PASSWORD,
            'password2': PASSWORD,
        })

        user = get_user_model().objects.last()
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertEqual(response.data['id'], user.id)
        self.assertEqual(response.data['username'], user.username)
        self.assertEqual(response.data['first_name'], user.first_name)
        self.assertEqual(response.data['last_name'], user.last_name)

    def test_user_login(self):
        user = create_user()
        response = self.client.post(reverse('user_login'), data={
            'username': user.username,
            'password': PASSWORD
        })

        access = response.data['access']
        header, payload, signature = access.split('.')
        decoded_payload = base64.b64decode(f'{payload}==')
        payload_data = json.loads(decoded_payload)

        self.assertEqual(status.HTTP_200_OK, response.status_code)
        self.assertIsNotNone(response.data['refresh'])
        self.assertEqual(payload_data['id'], user.id)
        self.assertEqual(payload_data['username'], user.username)
        self.assertEqual(payload_data['first_name'], user.first_name)
        self.assertEqual(payload_data['last_name'], user.last_name)


class NotesTest(APITestCase):

    def setUp(self):
        self.user = create_user()
        self.client.login(username=self.user.username, password=PASSWORD)

    def test_list_notes(self):
        notes = [
            EDNote.objects.create(title="note 1", body="body note 1"),
            EDNote.objects.create(title="note 2", body="body note 2"),
        ]

        response = self.client.get(reverse('notes:ednote-list'))

        self.assertEqual(status.HTTP_200_OK, response.status_code)

    def test_post_create(self):
        response = self.client.post(reverse('notes:ednote-list'), data={
            'title': 'title 1',
            'body': 'body 1'
        })

        self.assertEqual(status.HTTP_201_CREATED, response.status_code)

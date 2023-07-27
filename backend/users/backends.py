# backends.py

from django.contrib.auth.backends import BaseBackend
from .models import CustomUser

class CustomUserBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):
        try:
            # Get the user based on the provided username or email
            user = CustomUser.objects.get(username=username)

            # Check if the password is valid for the user
            if password == user.password:
                return user  # Authentication successful, return the user object

        except CustomUser.DoesNotExist:
            pass  # User with the provided username does not exist

        return None  # Authentication failed, return None

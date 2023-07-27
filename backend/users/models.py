from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # No additional fields needed for this simplified example
    class Meta:
        db_table = 'CustomUser'

class Book(models.Model):
    class Meta:
        db_table = 'book'
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    summary = models.TextField()
    rating = models.IntegerField(default=0)
    reviews = models.JSONField(default=list)
    cover = models.URLField(default="https://alexmonaco.net/wp-content/uploads/2022/02/Atomic-Habits-265x400.jpg")
    pdf = models.FileField(upload_to='')

    def __str__(self):
        return self.title

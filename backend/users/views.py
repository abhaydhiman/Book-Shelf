from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser, Book
from .serializers import CustomUserSerializer, BookSerializer
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, HttpResponseNotFound
from django.conf import settings
import os


def debugger(*args):
    print('-------------------------');
    print('')
    for i in args:
        print(i)
        print('******')
    
    print('________________')

class SignUpAPI(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            # Create the user
            user = serializer.save()

            # You can also log the user in after successful signup if needed
            # login(request, user)

            return Response({'success': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            # User is authenticated, log the user in
            # login(request, user)
            return Response({'success': 'Login successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class BookUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BookListView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


class SubmitReviewView(APIView):
    def post(self, request):
        book_id = request.data.get('bookId')
        review = request.data.get('review')
        # debugger(book_id);
        try:
            book = Book.objects.get(id=book_id)
            book.reviews.append(review)
            book.save()
            return Response({"message": "Review submitted successfully."}, status=status.HTTP_201_CREATED)
        except Book.DoesNotExist:
            return Response({"message": "Book not found."}, status=status.HTTP_404_NOT_FOUND)


class DownloadFileView(APIView):
    def get(self, request, file_name):
        file_path = os.path.join(settings.MEDIA_ROOT, file_name)
        debugger(file_name, file_path)
        if os.path.exists(file_path):
            with open(file_path, 'rb') as file:
                response = HttpResponse(file.read(), content_type="application/octet-stream")
                response['Content-Disposition'] = f"attachment; filename={file_name}"
                return response
        else:
            return HttpResponseNotFound("File not found")
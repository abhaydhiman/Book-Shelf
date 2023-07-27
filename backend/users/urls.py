from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginAPI.as_view(), name='login'),
    path('signup/', views.SignUpAPI.as_view(), name='signup'),
    path('upload_book/', views.BookUploadView.as_view(), name='upload-book'),
    path('book_list/', views.BookListView.as_view(), name='book-list'),
    path('submit_review/', views.SubmitReviewView.as_view(), name='submit-review'),
    path('download/<str:file_name>/', views.DownloadFileView.as_view(), name='download_file'),
]

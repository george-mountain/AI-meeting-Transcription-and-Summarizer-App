from django.urls import path
from .import views

urlpatterns = [
    path('',views.transcription, name='transcription'),
    path('summarizer/',views.summarizer, name='summarizer'),

    
]

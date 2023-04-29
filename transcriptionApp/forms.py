from django import forms
from .validation import allow_only_images_validator

class ImageUploadForm(forms.Form):
    input_file = forms.FileField(widget=forms.FileInput(attrs={'class':'form-control form-control-lg'}),validators=[allow_only_images_validator])
    meeting_title  = forms.CharField(widget=forms.TextInput(attrs={'required':'required','class': 'form-control form-control-lg','placeholder':'Meeting Subject'}))

   

class SummarizerForm(forms.Form):
    input_file = forms.FileField(widget=forms.FileInput(attrs={'class':'form-control form-control-lg'}),validators=[allow_only_images_validator])
    meeting_title  = forms.CharField(widget=forms.TextInput(attrs={'required':'required','class': 'form-control form-control-lg','placeholder':'Meeting Subject'}))

    user_prompt = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Enter a prompt on how to summarize your meeting','required':'required','class':'form-control form-control-lg','row':3,'col':30}))
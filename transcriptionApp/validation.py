from django.core.exceptions import ValidationError

import os

def allow_only_images_validator(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = ['.mp4','.avi','.mp3','.mpeg','.wav']
    
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file format. Supported files are: ' + str(valid_extensions))
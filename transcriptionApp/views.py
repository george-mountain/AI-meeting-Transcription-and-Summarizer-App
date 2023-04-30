from django.shortcuts import render

from .forms import ImageUploadForm, SummarizerForm

from .utils import convert_video_to_audio, transcribe_audio_to_text, generate_mom_from_transcript

from tempfile import NamedTemporaryFile


# def transcription(request):
    
    
#     return render(request,'transcription/result.html')

# Create your views here.

def transcription(request):
    result = {}
    filename = ''
    meeting_title = ''
    
    if request.method == 'POST':
        
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            cd = form.cleaned_data
            upload_file = cd['input_file']
            meeting_title = cd['meeting_title']
            filename = str(upload_file.name)
            print(filename)
            print('wait... processing about to start')
            with NamedTemporaryFile(suffix='.mp4') as video_file:
                video_file.write(upload_file.read())
                video_file.flush()
                audio_file = convert_video_to_audio(upload_file)
                result = transcribe_audio_to_text(audio_file)
            
        else:
            print("Invalid form field")
            print(form.errors)
        
    else:
        form = ImageUploadForm()
       
        # print('It did not enter request loop')
       
    
    
    context = {
        'form': form,
        'result':result,
        'filename':filename,
        'meeting_title':meeting_title,
    }
    
    
    return render(request,'transcription/result.html',context)


def summarizer(request):
    result = {}
    filename = ''
    meeting_title = ''
    user_prompt = ''
    
    if request.method == 'POST':
        form = SummarizerForm(request.POST, request.FILES)
        if form.is_valid():
            cd = form.cleaned_data
            upload_file = cd['input_file']
            meeting_title = cd['meeting_title']
            user_prompt = str(cd['user_prompt'])
            filename = str(upload_file.name)
            print(filename)
            print('wait... processing about to start')
            
            try:
                with NamedTemporaryFile(suffix='.mp4') as video_file:
                    video_file.write(upload_file.read())
                    video_file.flush()
                    audio_file = convert_video_to_audio(upload_file)
                    result_text = transcribe_audio_to_text(audio_file)
                    result = generate_mom_from_transcript(result_text, user_prompt)
            
            except Exception as e:
                print(f"Error occurred: {str(e)}")
                result = "An error occurred while summarizing the file. Try again or alternatively, try transcribing the file instead."
            
        else:
            print("Invalid form field")
            print(form.errors)
        
    else:
        form = SummarizerForm()
       
    context = {
        'form': form,
        'result':result,
        'filename':filename,
        'meeting_title':meeting_title,
        'user_prompt':user_prompt,
    }
    
    return render(request,'transcription/summarizer.html',context)

import subprocess
import whisper
import openai
import os
import sys

import aiofiles
from django.conf import settings
from decouple import config

openai.api_key = config("API_KEY")

model = whisper.load_model("base")


# def convert_video_to_audio(input_video):
#     output_audio = os.path.join(settings.MEDIA_ROOT, 'audio.wav')
#     subprocess.call(["ffmpeg", "-y", "-i", input_video.temporary_file_path(), output_audio])
#     return output_audio

# def transcribe_audio_to_text(input_audio):
#     result = model.transcribe(input_audio)
#     text = result["text"]
#     return text


def convert_video_to_audio(input_video):
    output_audio = os.path.join(settings.MEDIA_ROOT, "audio.wav")

    # Ensure the directory exists
    os.makedirs(os.path.dirname(output_audio), exist_ok=True)

    subprocess.call(
        ["ffmpeg", "-y", "-i", input_video.temporary_file_path(), output_audio]
    )

    # Verify the file exists after conversion
    if not os.path.exists(output_audio):
        raise FileNotFoundError(f"Output audio file not found: {output_audio}")

    return output_audio


def transcribe_audio_to_text(input_audio):
    # Verify the input audio file exists before transcribing
    if not os.path.exists(input_audio):
        raise FileNotFoundError(f"Input audio file not found: {input_audio}")

    result = model.transcribe(input_audio)
    text = result["text"]
    return text


def generate_mom_from_transcript(transcript, prompt_word):
    prompt = prompt_word + " : \n" + transcript
    response = openai.Completion.create(
        model="text-davinci-003", prompt=prompt[:4096], temperature=0.7, max_tokens=256
    )
    return response.choices[0].text

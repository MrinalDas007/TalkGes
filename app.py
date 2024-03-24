from flask import Flask, render_template, request, jsonify
import os
import speech_recognition as sr
from moviepy.editor import VideoFileClip, concatenate_videoclips

app = Flask(__name__)


# Function to listen to audio through the microphone and convert it to text
def listen_to_microphone():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio_data = recognizer.listen(source)
        print("Processing...")
        try:
            text = recognizer.recognize_google(audio_data)
            return text
        except sr.UnknownValueError:
            return ""
        except sr.RequestError as e:
            return ""


# Function to get the corresponding video file based on the recognized text
def get_video_filename(text):
    videos_dir = os.path.join(app.root_path, "static/video_db/")
    video_files = []
    words = text.split()
    print(words)
    # Create a list to store the VideoClip objects
    video_clips = []

    for word in words:
        video_file = os.path.join(videos_dir, word.lower() + ".mp4")
        if os.path.isfile(video_file):
            video_clip = VideoFileClip(video_file)
            video_clips.append(video_clip)
        else:
            video_file = os.path.join(videos_dir, "wordnotfound.mp4")
            video_clip = VideoFileClip(video_file)
            video_clips.append(video_clip)

    if video_clips:
        # Combine video clips using MoviePy
        combined_video_path = os.path.join(videos_dir, "combined_video.mp4")
        final_clip = concatenate_videoclips(video_clips)
        final_clip.write_videofile(combined_video_path, fps=24, codec="libx264")

        # Close all video clips to release resources
        for clip in video_clips:
            clip.close()

        return ["combined_video.mp4"]  # Return the combined video file path

    return ["wordnotfound.mp4"]


# Route for the home page with audio recording form
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        text = listen_to_microphone()
        video_files = get_video_filename(text)
        return render_template("index.html", text=text, video_files=video_files)
    return render_template("index.html", text="Ready To Listen")


if __name__ == "__main__":
    app.run()

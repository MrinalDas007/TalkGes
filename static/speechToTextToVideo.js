const recognition = new webkitSpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = true;
recognition.continuous = true;

let videoIndex = 0;
let videoClips = [];

const videoContainer = document.getElementById("videoContainer");
const outputText = document.getElementById("outputText");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

startButton.onclick = () => {
  recognition.start();
  startButton.disabled = true;
  stopButton.disabled = false;
};

stopButton.onclick = () => {
  recognition.stop();
  const videoFilenames = getVideoFilename(outputText.value);
  console.log("Video filename:", videoFilenames);
  videoClips = videoFilenames[0];
  playNextVideo();
  startButton.disabled = false;
  stopButton.disabled = true;
};

// The result of speech recognition is output
recognition.onresult = (event) => {
  outputText.value = event.results[event.results.length - 1][0].transcript;
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false });

function getVideoFilename(text) {
  const videosDir = "./static/video_db/";
  text = text.trim();
  const words = text.split(" ");
  console.log(words);
  const videoClips = [];

  words.forEach((word) => {
    if (word != "") {
      let videoFile = videosDir + word.toLowerCase() + ".mp4";
      if (!checkFileExists(videoFile)) {
        videoFile = videosDir + "wordnotfound.mp4";
      }
      videoClips.push(videoFile);
    }
  });

  if (videoClips.length > 0) {
    return [videoClips];
  }

  return [[videosDir + "wordnotfound.mp4"]];
}

function checkFileExists(fileUrl) {
  return true;
}

function playNextVideo() {
  if (videoIndex < videoClips.length) {
    const video = document.createElement("video");
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.style.width = "calc(100vw - 40px)";
    video.style.height = "auto";
    video.style.maxWidth = "640px";
    video.style.maxHeight = "640px";
    video.style.borderRadius = "0 0 10px 10px";
    video.style.marginTop = "10px";
    video.onended = () => {
      videoIndex++;
      playNextVideo();
    };
    videoContainer.innerHTML = "";
    videoContainer.appendChild(video);
    video.src = videoClips[videoIndex];
  } else {
    console.log("All videos played.");
    videoIndex = 0;
    const video = document.createElement("video");
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.style.width = "calc(100vw - 40px)";
    video.style.height = "auto";
    video.style.maxWidth = "640px";
    video.style.maxHeight = "640px";
    video.style.borderRadius = "0 0 10px 10px";
    video.style.marginTop = "10px";
    video.onended = () => {
      videoIndex++;
      playNextVideo();
    };
    videoContainer.innerHTML = "";
    videoContainer.appendChild(video);
    video.src = "";
    outputText.value = "";
  }
}

#!/bin/bash
apt-get install -y gcc portaudio19-dev
pip install pyAudio
pip install --no-cache-dir -r requirements.txt
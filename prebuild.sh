#!/bin/bash
apt-get install -y gcc portaudio19-dev
apt install python3-pyaudio
pip install --no-cache-dir -r requirements.txt
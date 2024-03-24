#!/bin/bash
apt-get update
apt-get install -y gcc portaudio19-dev
apt-get clean
pip install pyaudio
pip install --no-cache-dir -r requirements.txt
#!/bin/bash

# Gain root privileges
sudo su

# Remount the root file system as read-write
mount -o remount,rw /

# Update package lists and install system packages
sudo apt-get update
sudo apt-get install -y gcc portaudio19-dev

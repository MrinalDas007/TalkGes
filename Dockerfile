# Use the official Python image as the base image
FROM python:3.9-slim

# Install system-level dependencies for PyAudio
RUN apt-get update && \
    apt-get install -y gcc portaudio19-dev && \
    apt-get clean

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .


# Set the environment variables
ENV FLASK_APP=app.py

# Run the Flask application when the container starts
CMD ["flask", "run"]

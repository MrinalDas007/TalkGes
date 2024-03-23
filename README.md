#### TalkGes Web App

This is a simple Flask web application that helps hearing impaired users to record and convert speech to sentence. It uses Google's speech recognition API. Then, it displays corresponding video to the whole sentence.

#### Installation

Clone this repository to your local machine:

```
pip install -r requirements.txt
```

#### Usage

Start the Flask development server:

```
flask run
```

Open your web browser and go to http://127.0.0.1:5000/.

Enter the trip details in the provided form and submit.

The entered trip details will be displayed on the page.

#### Project Structure

- app.py: Contains the Flask application code.
- templates/: Directory for HTML templates.
- index.html: Main HTML file with the trip details form and display.
- static/: Directory for static files (e.g., CSS, JavaScript).

#### Dependencies

Flask: Web framework for Python.

#### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

#### License

This project is licensed under the MIT License - see the LICENSE file for details.

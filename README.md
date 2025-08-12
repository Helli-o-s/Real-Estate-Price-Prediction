Bengaluru Real Estate Price Prediction
An end-to-end machine learning project that predicts real estate prices in Bengaluru. This application is built with a React frontend that communicates with a Flask API to deliver real-time predictions from a trained regression model.

The complete data science workflow, from data cleaning and feature engineering to model training, is documented in the Untitled.ipynb notebook.

Architecture
This project follows a client-server architecture:

Frontend (Client): A responsive user interface built with React (Vite + TypeScript). It allows users to input property details and view the estimated price.

Backend (Server): A Flask API written in Python that serves the pre-trained Scikit-learn model. It exposes endpoints to get available locations, rank them by price, and predict house prices.

Model: A pre-trained LinearRegression model from Scikit-learn, saved in the bangalore_home_prices_model.pickle file.

Features
Interactive UI: A clean and modern interface for users to get price estimates.

RESTful API: A well-defined Flask backend with the following endpoints:

GET /get_location: Fetches a list of all available locations in Bengaluru.

POST /predict_home_price: Predicts the house price based on input features (sqft, BHK, bath, location).

Complete Data Science Notebook: The Jupyter Notebook (Untitled.ipynb) provides a detailed walkthrough of the entire model-building process.

Decoupled Frontend and Backend: Allows for independent development and scaling of the client and server.

Technologies Used
Frontend:
React
Vite
TypeScript

Backend:
Python
Flask
Scikit-learn
Pandas & NumPy

Model Development:
Jupyter Notebook

Setup and Installation
This project has two main parts: the backend server and the frontend client. You will need to run them in separate terminals.

1. Backend (Flask Server)
First, set up the Python environment and run the Flask server.

# Navigate to the project's root directory
cd your-project-folder

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run the Flask server
python server.py

The Flask server will start, typically on http://127.0.0.1:5000.

2. Frontend (React Client)
Next, set up the Node.js environment and run the React development server.

# Navigate to the project's root directory (or the client sub-directory if you have one)

# Install Node.js dependencies
npm install

# Start the React development server
npm run dev

The React app will start, and you can access it in your browser, typically at http://localhost:5173. The application is configured to make API calls to your local Flask backend.

Usage
Ensure both the Flask backend and the React frontend are running.

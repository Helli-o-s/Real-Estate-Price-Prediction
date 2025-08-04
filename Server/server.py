import os
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import util

app = Flask(__name__)

# Enable CORS for specific origin (Netlify app)
CORS(app, resources={r"/*": {"origins": "https://melodious-crisp-f69619.netlify.app"}})

@app.route('/get_location', methods=['GET'])
def get_location_names():
    try:
        locations = util.get_location_names()
        return jsonify({'locations': locations}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Internal server error

@app.route('/rank_locations', methods=['GET'])
def rank_locations():
    try:
        categorized_locations = util.rank_locations_by_expensiveness()
        return jsonify({'ranked_locations': categorized_locations}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Internal server error

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    try:
        # Parse JSON request body
        data = request.get_json()

        # Extract parameters from JSON
        total_sqft = float(data.get('total_sqft', 0))
        location = data.get('location', '').strip()
        bhk = int(data.get('bhk', 0))
        bath = int(data.get('bath', 0))

        # Validate inputs
        if not location or total_sqft <= 0 or bhk <= 0 or bath <= 0:
            return jsonify({'error': 'Invalid input parameters'}), 400

        # Get estimated price
        estimated_price = util.get_estimated_prices(location, total_sqft, bhk, bath)
        if isinstance(estimated_price, str):
            return jsonify({'error': estimated_price}), 400  # Handle location not found

        return jsonify({'estimated_price': estimated_price}), 200
    except Exception as e:
        # Catch all errors and return a detailed error message
        return jsonify({'error': f"Internal Server Error: {str(e)}"}), 500

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_location_names():
    return __locations

def rank_locations_by_expensiveness():
    if __locations is None or __model is None:
        load_saved_artifacts()

    location_prices = {}
    test_sqft = 1000  # Use a fixed size for comparison
    bhk = 2
    bath = 2

    for location in __locations:
        price = get_estimated_prices(location, test_sqft, bhk, bath)
        location_prices[location] = price

    # Rank locations by price in descending order
    ranked_locations = sorted(location_prices.items(), key=lambda x: x[1], reverse=True)
    return ranked_locations

def get_estimated_prices(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        return "Error: Location not found"

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

def load_saved_artifacts():
    print("Loading saved artifacts...start")
    global __data_columns
    global __locations
    global __model

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    with open("./artifacts/bangalore_home_prices_model.pickle", "rb") as f:
        __model = pickle.load(f)

    print("Loading saved artifacts...done")

if __name__ == "__main__":
    load_saved_artifacts()
    # Uncomment for testing
    # print(get_location_names())
    # print(get_estimated_prices('1st Phase JP Nagar', 1500, 3, 3))
    # print(get_estimated_prices('Kalhalli', 1000, 2, 2))

import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_location_names():
    return __locations

def get_estimated_prices(location,sqft,bhk,bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)

def load_saved_artifacts():
    print("loading saved artifacts....start")
    global __data_columns
    global __locations
    global __model

    with open("./artifacts/columns.json","r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]

    with open("./artifacts/bangalore_home_prices_model.pickle","rb") as f:
        __model = pickle.load(f)
    print("loading saved artifacts...done")

if __name__=="__main__":
    load_saved_artifacts()
    #print(get_location_names())
    #print(get_estimated_prices('1st Phase JP Nagar', 1500, 3, 3))
    #print(get_estimated_prices('Kalhalli', 1000, 2 , 2))
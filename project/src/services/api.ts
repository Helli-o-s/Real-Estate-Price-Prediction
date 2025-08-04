import axios from 'axios';

const BASE_URL = 'http://ec2-13-48-58-100.eu-north-1.compute.amazonaws.com/api';

export interface PredictionRequest {
  total_sqft: number;
  bhk: number;
  bath: number;
  location: string;
}

export interface PredictionResponse {
  estimated_price: number;
}

export interface LocationResponse {
  locations: string[];
}

export interface RankedLocation {
  location: string;
  rank: number;
}

export interface RankedLocationResponse {
  ranked_locations: RankedLocation[];
}

export const api = {
  // Fetch available locations
  async getLocations(): Promise<string[]> {
    try {
      const response = await axios.get<LocationResponse>(`${BASE_URL}/get_location`);
      return response.data.locations;
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  },

  // Fetch ranked locations
  async getRankedLocations(): Promise<RankedLocation[]> {
    try {
      const response = await axios.get<RankedLocationResponse>(`${BASE_URL}/rank_locations`);
      console.log('Raw response:', response.data);
      return response.data.ranked_locations;
    } catch (error) {
      console.error('Error fetching ranked locations:', error);
      return [];
    }
  },

  // Predict home price
  async predictPrice(data: PredictionRequest): Promise<number> {
    try {
      const response = await axios.post<PredictionResponse>(
        `${BASE_URL}/predict_home_price`,
        data
      );
      return response.data.estimated_price;
    } catch (error) {
      console.error('Error predicting price:', error);
      throw new Error('Failed to predict price');
    }
  },
};

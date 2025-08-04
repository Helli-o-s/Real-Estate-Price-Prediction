import { useState, useEffect } from 'react';
import { Home, Building2, Bath, MapPin, Calculator, IndianRupee, AlertCircle } from 'lucide-react';
import { api } from './services/api';

function App() {
  const [sqft, setSqft] = useState('1000');
  const [bhk, setBhk] = useState('2');
  const [bathrooms, setBathrooms] = useState('2');
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState<string[]>([]);

  const [estimatedPrice, setEstimatedPrice] = useState<string | null>(null);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoadingLocations(true);
      try {
        const data = await api.getLocations();
        setLocations(data);
      } catch {
        setError('Failed to load locations');
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  const handleEstimatePrice = async () => {
    if (!location) {
      setError('Please select a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const price = await api.predictPrice({
        total_sqft: parseFloat(sqft),
        bhk: parseInt(bhk),
        bath: parseInt(bathrooms),
        location,
      });
      setEstimatedPrice(price.toFixed(2));
    } catch (err) {
      setError('Failed to estimate price. Please try again.');
      setEstimatedPrice(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bangalore Home</h1>
          <h2 className="text-2xl text-gray-600 mb-8">Price Prediction</h2>

          <div className="space-y-8">
            {/* Area Input */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Home className="w-5 h-5 text-blue-500" />
                Area (Square Feet)
              </label>
              <input
                type="number"
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                placeholder="Enter area in sq ft"
              />
            </div>

            {/* BHK Selection */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                BHK Configuration
              </label>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBhk(num.toString())}
                    className={`p-4 rounded-xl ${
                      bhk === num.toString()
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms Selection */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <Bath className="w-5 h-5 text-blue-500" />
                Bathrooms
              </label>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setBathrooms(num.toString())}
                    className={`p-4 rounded-xl ${
                      bathrooms === num.toString()
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Dropdown */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <MapPin className="w-5 h-5 text-blue-500" />
                Select Location
              </label>
              {loadingLocations ? (
                <div className="text-blue-500 text-sm">Loading locations...</div>
              ) : (
                <select
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">-- Select a location --</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Estimate Button */}
            <button
              onClick={handleEstimatePrice}
              className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? <div className="loader"></div> : <Calculator className="w-5 h-5" />}
              {loading ? 'Calculating...' : 'Calculate Estimate'}
            </button>

            {/* Error State */}
            {error && (
              <div className="text-red-500 mt-4">
                <AlertCircle className="w-5 h-5 inline-block mr-2" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Visualization */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 p-12">
        <div className="h-full flex flex-col items-center justify-center">
          {estimatedPrice ? (
            <div className="text-center">
              <IndianRupee className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-5xl font-bold text-gray-900 mb-2">₹ {estimatedPrice}</h2>
              <p className="text-2xl text-gray-600">Lakhs</p>
            </div>
          ) : (
            <div className="text-center text-3xl text-gray-600">Awaiting Price Estimate</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
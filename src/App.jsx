import React, { useEffect, useState } from "react";
import DiamondGrid from "./components/DiamondGrid";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Surat");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Solid Background Color */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black to-gray-900 z-0" />

      {/* Background Grid */}
      <DiamondGrid />

      {/* Weather Report Box */}
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-2xl flex items-center justify-center z-10">
        <div className=" backdrop-blur-lg p-6 rounded-lg max-w-4xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold">Weather Report</h1>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-4 p-2 rounded-lg border border-white text-white bg-transparent placeholder-white"
              placeholder="Enter city name"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex-1  backdrop-blur-lg p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">Temperature</h2>
              <p className="text-lg">Temp: {weatherData.main.temp}°C</p>
              <p className="text-lg">Feels like: {weatherData.main.feels_like}°C</p>
              <p className="text-lg">Min Temp: {weatherData.main.temp_min}°C</p>
              <p className="text-lg">Max Temp: {weatherData.main.temp_max}°C</p>
            </div>

            <div className="flex-1  backdrop-blur-lg p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">Wind & Humidity</h2>
              <p className="text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
              <p className="text-lg">Wind Direction: {weatherData.wind.deg}°</p>
              <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

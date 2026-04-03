import React from 'react'
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { useState } from 'react';
import { Toaster } from 'sonner';
const weatherCodes = {
  0: "Sunny",
  1: "Mostly Sunny",
  2: "Partly Cloudy",
  3: "Cloudy",
  45: "Foggy",
  61: "Rainy",
  71: "Snowy",
  80: "Rain Showers",
  95: "Thunderstorm",
};
function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <>
    <Toaster 
    position="top-right" 
    richColors 
    duration={1500}
    toastOptions={
      {
        style:{
          width: '250px',
          padding: '10px 14px', 
          fontSize: '14px'
        }
      }
    }
      />
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-400 flex  justify-center p-4 overflow-y-auto min-w-full">
      <div className={`w-full max-w-3xl rounded-3xl bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30 p-4 sm:p-6 sm:px-14`}>
        <SearchBar 
        data={setWeatherData} 
        loading={loading} 
        setLoading={setLoading}
        />
       <div className={`${loading ? 'hidden' : 'block'}`}>
        <WeatherCard 
        weatherData={weatherData} 
        weatherCodes={weatherCodes} 
        />
       </div>
      </div>
    </div>
    </>
  );
}

export default App;
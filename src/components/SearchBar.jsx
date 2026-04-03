import React from 'react'
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from 'react';
import { fetchCoordinates, getCityFromCoords } from '../services/weatherApi';
import { fetchWeatherData } from '../services/weatherApi';
import { toast } from 'sonner';

const SearchBar = ({data, loading, setLoading}) => {
  const [city, setCity] = useState('');
  useEffect(()=>{
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position)=>{
        const {latitude, longitude} = position.coords;
        try {
          const weatherData = await fetchWeatherData(latitude, longitude);
          const cityDetails = await getCityFromCoords(latitude, longitude);
          console.log('i am from navigator', cityDetails, weatherData);
          data({
           cityName: cityDetails.name,
           latitude: latitude,
           longitude: longitude,
           hourly: weatherData.hourly,
           daily: weatherData.daily,
           current: weatherData.current,
         });
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
        finally{
          setLoading(false);
        }
      },
      async (error)=>{
        console.error("Error getting geolocation:", error);
        toast.error("Location denied! fetching Delhi weather data...");
        const defaultCity = "New Delhi";
        try {
          const coordinatesData = await fetchCoordinates(defaultCity);
          const weatherData = await fetchWeatherData(coordinatesData.latitude, coordinatesData.longitude);
          data({
            cityName: coordinatesData.cityName,
            latitude: coordinatesData.latitude,
            longitude: coordinatesData.longitude,
            hourly: weatherData.hourly,
            daily: weatherData.daily,
            current: weatherData.current,
          });
          
        } catch (error) {
          console.error("Error fetching default city weather data:", error);
        }
        finally{
          setLoading(false);
        }
      }
    )
  }, [])


  const handleWeatherData = async (lat, lon, cityName) => {
    if (!lat || !lon) {
      alert("Invalid coordinates");
      return;
    }
    try {
      const weatherData = await fetchWeatherData(lat, lon);
      data({
           cityName,
           latitude: lat,
           longitude: lon,
           hourly: weatherData.hourly,
           daily: weatherData.daily,
           current: weatherData.current,
     });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
      finally{
        setLoading(false);
      }
  }
  const fetchCityCoordinates = async ()=>{
    if(city.trim() === ''){
      toast.error("Please enter a city name");
      return;
    }
    try {
      setLoading(true);
      const coordinatesData = await fetchCoordinates(city);
      handleWeatherData(coordinatesData.latitude, coordinatesData.longitude, coordinatesData.cityName);
    } catch (error) {
      console.error("Error fetching city coordinates:", error);
      toast.error("City not found. Please try again.");
    }
  }
  return (
    <section className="p-2 sm:p-4 relative">
      <input
        type="text"
        placeholder={`${loading ? 'Fetching weather...' : 'Enter city name'}`}
        value={city}
        disabled={loading}
        onChange={(event) => setCity(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            fetchCityCoordinates();
          }
        }}
        className="w-full rounded-xl bg-secondary px-2 py-1 sm:px-4 sm:py-2 pr-13 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-sm focus:scale-105 transition-all duration-300"
      />

      <button 
      onClick={fetchCityCoordinates}
      className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer hover:scale-120 transition-transform duration-300"
      disabled={loading}
      >
        {loading ? 
        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div> 
        :
        <FiSearch />
        }
        
      </button>
    </section>
  );
};

export default SearchBar
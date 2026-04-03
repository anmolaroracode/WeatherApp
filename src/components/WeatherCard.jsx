import React from 'react'
import {
  Sun,
  CloudSun,
  Cloud,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudRain,
  Wind,
  Droplets,
  Gauge,
  Thermometer,
  Calendar
} from "lucide-react";

import OtherDetailsCard from './OtherDetailsCard';
import TimeCard from './TimeCard';
import DayCard from './DayCard';

const weatherIcons = {
  0: Sun,
  1: CloudSun,
  2: CloudSun,
  3: Cloud,
  45: CloudFog,
  61: CloudRain,
  71: CloudSnow,
  80: CloudRain,
  95: CloudLightning,
};

const WeatherCard = ({ weatherData, weatherCodes }) => {
  const currentHourIndex = weatherData?.hourly?.time
    ? weatherData.hourly.time.findIndex(
        (time) => new Date(time).getHours() === new Date().getHours()
      )
    : -1;

  const nextHourIndex =
    currentHourIndex !== -1
      ? weatherData.hourly.time.slice(currentHourIndex, currentHourIndex + 24)
      : [];

  const WeatherIcon =
    weatherIcons[weatherData?.current?.weather_code] || CloudSun;

  return (
    <section className="p-2 sm:p-4 font-semibold">
      <div className="text-white">
        <div className="flex flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl mb-1">
                {weatherData?.cityName}
              </h2>

              <p className="text-xs sm:text-sm text-white/80">
                {weatherData?.daily?.time?.[0]
                  ? new Date(weatherData.daily.time[0]).toLocaleDateString(
                      'en-US',
                      {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'long',
                      }
                    )
                  : ''}
              </p>
            </div>

            <div className="flex items-end gap-3 flex-wrap">
              <p className="text-3xl sm:text-4xl md:text-5xl font-semibold">
                {Math.ceil(weatherData?.current?.temperature_2m)}°C
              </p>

              <p className="text-sm sm:text-base md:text-lg text-white/90 pb-1">
                {weatherCodes[weatherData?.current?.weather_code]}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 self-start md:self-auto hover:scale-105 transition-transform duration-300">
            <WeatherIcon className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-200" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <OtherDetailsCard
            icon={Droplets}
            label="Humidity"
            value={`${weatherData?.current?.relative_humidity_2m}%`}
            iconClassName="text-cyan-200"
          />

          <OtherDetailsCard
            icon={Wind}
            label="Wind"
            value={`${Math.ceil(weatherData?.current?.wind_speed_10m)} km/h`}
            iconClassName="text-cyan-100"
          />

          <OtherDetailsCard
            icon={Gauge}
            label="Pressure"
            value={`${weatherData?.current?.surface_pressure} hPa`}
            iconClassName="text-blue-100"
          />

          <OtherDetailsCard
            icon={Thermometer}
            label="Feels Like"
            value={`${Math.ceil(weatherData?.current?.apparent_temperature)}°C`}
            iconClassName="text-orange-200"
          />
        </div>

        <div className="flex items-center mt-5 overflow-x-auto py-1 sm:py-2 rounded-2xl bg-white/10">
          {nextHourIndex.length > 0 ? (
            nextHourIndex.map((time, index) => (
              <TimeCard
                key={index}
                time={new Date(time).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  hour12: true,
                })}
                Condition={
                  weatherIcons[
                    weatherData.hourly.weather_code[currentHourIndex + index]
                  ] || CloudSun
                }
                temperature={`${Math.ceil(
                  weatherData.hourly.temperature_2m[currentHourIndex + index]
                )}°C`}
              />
            ))
          ) : (
            <p className="text-sm text-white/80 px-2">
              No hourly data available
            </p>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center border-b border-white/20 mb-4 gap-1 pb-2">
            <Calendar className="h-5 w-5" />

            <h3 className="text-sm sm:text-lg text-white/90 font-medium">
              Weekly Forecast
            </h3>
          </div>

          {weatherData?.daily?.time?.map((day, index) => (
            <DayCard
              key={index}
              day={new Date(day).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
              high={`${Math.ceil(weatherData.daily.temperature_2m_max[index])}°C`}
              low={`${Math.ceil(weatherData.daily.temperature_2m_min[index])}°C`}
              WeatherIcon={
                weatherIcons[weatherData.daily.weather_code[index]] || CloudSun
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
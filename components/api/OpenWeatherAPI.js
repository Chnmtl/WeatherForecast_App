import { API_KEY } from '../../config.js';

// Function to fetch current weather data
export const fetchCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(JSON.stringify(data))  
    if (response.ok) {
      return {
        city: data.name,
        temperature: parseInt(data.main.temp),
        weatherCondition: data.weather[0].main, 
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const fetchLocationWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location
      )}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log("api response: " + JSON.stringify(response))
    console.log("api daata: " + JSON.stringify(data))
    if (response.ok) {
      return {
        city: data.name,
        temperature: parseInt(data.main.temp),
        weatherCondition: data.weather[0].main,
      };
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error fetching location weather:", error);
    throw error;
  }
};

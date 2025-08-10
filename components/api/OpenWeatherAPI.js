import { API_KEY_OW, API_KEY_ACCU } from "../../config.js";

// OPENWEATHER API
// Function to fetch current weather data
export const fetchCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_OW}&units=metric`
    );
    const data = await response.json();
    console.log(JSON.stringify(data));
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
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

// Function to fetch current location's weather data
export const fetchLocationWeather = async (location) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        location
      )}&appid=${API_KEY_OW}&units=metric`
    );
    const data = await response.json();
    console.log("api response: " + JSON.stringify(response));
    console.log("api daata: " + JSON.stringify(data));
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

// ACCUWEATHER API

export const fetchLocationAutocomplete = async (searchTerm) => {
  try {
    const response = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY_ACCU}&q=${encodeURIComponent(
        searchTerm
      )}`
    );
    const data = await response.json();

    if (response.ok) {
      return data.map((location) => ({
        id: location.Key,
        name: location.LocalizedName,
        country: location.Country.LocalizedName,
      }));
    } else {
      throw new Error(data.Message);
    }
  } catch (error) {
    console.error("Error fetching location autocomplete:", error);
    throw error;
  }
};

export const fetchHourlyWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,daily,alerts&appid=${API_KEY_OW}&units=metric`
    );
    const data = await response.json();
    console.log("responseData:", data);

    if (response.ok) {
      const hourlyData = data.hourly.map((hour) => ({
        time: new Date(hour.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temperature: Math.round(hour.temp),
        weatherCondition: hour.weather[0].main,
        icon: hour.weather[0].icon,
      }));
      console.log("Hourly Data:", hourlyData);
      return hourlyData;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Error fetching hourly weather:", error);
    throw error;
  }
};

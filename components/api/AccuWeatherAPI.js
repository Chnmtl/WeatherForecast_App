const API_KEY = '79ac8a8306899ad3e8e9d7e8aa40a528';

// Function to fetch current weather data
export const fetchCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log(data)  
    if (response.ok) {
      return {
        city: data.name,
        temperature: data.main.temp,
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
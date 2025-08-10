import {
  View,
  ImageBackground,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

import BottomWeatherCard from "../components/ui/BottomWeatherCard";
import TopWeatherCard from "../components/ui/TopWeatherCard";
import Colors from "../constants/Colors";

import {
  fetchCurrentWeather,
  fetchLocationWeather,
  fetchLocationAutocomplete,
  fetchHourlyWeather,
} from "../components/api/OpenWeatherAPI";
import * as Location from "expo-location";

let debounceTimeout;

function HomePageScreen() {
  const [searchLocation, setSearchLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Location permission denied");
        }

        await fetchCurrentLocationWeather(); // Fetch current location's weather data
      } catch (error) {
        console.error("Error requesting location permission:", error);
        setWeatherData(null); // Set a default value for weatherData when there's an error
      }
    };

    requestLocationPermission();
  }, []);

  // useEffect(() => {
  //   const getWeatherData = async () => {
  //     try {
  //       const data = await fetchHourlyWeather(37.4221, -122.0839); // Example coordinates
  //       setHourlyWeather(data);
  //     } catch (error) {
  //       console.error("Error fetching hourly weather:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getWeatherData();
  // }, []);

  const fetchCurrentLocationWeather = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetchCurrentWeather(latitude, longitude);
      console.log("response: " + response);
      setWeatherData(response);
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  };

  const handleLocationSearch = (text) => {
    setSearchLocation(text);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      if (text.length > 2) {
        try {
          const response = await fetchLocationAutocomplete(text);
          setSuggestions(response);
        } catch (error) {
          console.error("Error fetching location suggestions:", error);
          setSuggestions([]);
        }
      }
    }, 2000); // 2-second debounce delay
  };
  // const handleLocationSearch = async (text) => {
  //   try {
  //     setSearchLocation(text);
  //     if (text.trim() === "") {
  //       await fetchCurrentLocationWeather();
  //     } else {
  //       const response = await fetchLocationAutocomplete(text);
  //       setSuggestions(response);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching location suggestions:", error);
  //     setSuggestions([]);
  //   }
  // };

  const handleSelectLocation = async (location) => {
    try {
      const weatherData = await fetchLocationWeather(location.name);
      setWeatherData(weatherData);
      setSearchLocation(location.name);
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching location weather:", error);
      setWeatherData(null);
    }
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require("../assets/BackgroundImages/Cloudy.png")}
          // style={styles.bgStyle}
          // resizeMode="contain"
          style={styles.backgroundImage}
          resizeMode="cover"
          // imageStyle={styles.bgImage}
        />
      </View>
      <View style={styles.overlay}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={styles.searchContainer}
            activeOpacity={1}
            onPress={() => setSuggestions([])}
          >
            <TextInput
              style={styles.search}
              value={searchLocation}
              onChangeText={handleLocationSearch}
              placeholder="Search location..."
              autoCompleteType="off"
              autoCorrect={false}
              onFocus={() => setSuggestions([])}
            />
            {suggestions.length > 0 && (
              <ScrollView
                style={styles.suggestionsList}
                contentContainerStyle={styles.suggestionsContent}
              >
                {suggestions.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.suggestionItem}
                    onPress={() => handleSelectLocation(item)}
                  >
                    <Text style={styles.suggestionText}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </TouchableOpacity>

          <TopWeatherCard weatherData={weatherData} />

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.bottomScroll}
          >
            <View style={styles.test}>
              {/* <BottomWeatherCard />
              <BottomWeatherCard />
              <BottomWeatherCard />
              <BottomWeatherCard />
              <BottomWeatherCard />
              <BottomWeatherCard />
              <BottomWeatherCard /> */}
              {hourlyWeather.map((hour, index) => (
                <BottomWeatherCard
                  key={index}
                  time={hour.time}
                  statusImage={{
                    uri: `http://openweathermap.org/img/wn/${hour.icon}.png`,
                  }}
                  degree={hour.temperature}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

export default HomePageScreen;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Ensure it stays behind the main content
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: "50%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)", // Optional: Add a semi-transparent overlay
  },
  mainView: {
    flex: 1,
    padding: 16,
    zIndex: 1,
  },
  searchContainer: {
    // Add your styles here
  },
  search: {
    backgroundColor: Colors.secondary,
    borderRadius: 24,
    padding: 6,
  },
  suggestionsList: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    marginTop: 16,
    padding: 8,
    maxHeight: 200,
  },
  suggestionsContent: {
    // Add your styles here
  },
  suggestionItem: {
    paddingVertical: 8,
  },
  suggestionText: {
    color: "white",
  },
  bottomScroll: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flex: 1,
    // Delete scroll bar
  },
  test: {
    flexDirection: "row",
    alignItems: "center",
    //padding: 12,
    margin: 12,
  },
  // mainView: {
  //   flex: 1,
  //   padding: 16,
  // },

  // bgImage: {
  //   marginTop: 200,
  // },
  // bgStyle: {
  //   flex: 1,
  // },
});

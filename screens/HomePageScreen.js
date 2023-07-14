import { View, ImageBackground, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import BottomWeatherCard from "../components/ui/BottomWeatherCard";
import TopWeatherCard from "../components/ui/TopWeatherCard";
import Colors from "../constants/Colors";

import { fetchCurrentWeather, fetchLocationWeather } from "../components/api/OpenWeatherAPI";
import * as Location from "expo-location";

function HomePageScreen() {

  const [searchLocation, setSearchLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  // const handleLocationSearch = async () => {
  //   try {
  //     // Call the fetchLocationWeather function to get weather data for the searched location
  //     const response = await fetchLocationWeather(searchLocation);
  //     console.log("response: " + response)
  //     setWeatherData(response);
  //   } catch (error) {
  //     console.error("Error fetching location weather:", error);
  //   }
  // };

  const handleLocationSearch = async () => {
    try {
      if (searchLocation.trim() === "") {
        // If the input is empty, fetch the current location's weather data again
        await fetchLocationWeather();
      } else {
        // Call the fetchLocationWeather function to get weather data for the searched location
        const response = await fetchLocationWeather(searchLocation);
        console.log("response: " + response);
        setWeatherData(response);
      }
    } catch (error) {
      console.error("Error fetching location weather:", error);
    }
  };  

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          throw new Error("Location permission denied");
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetchCurrentWeather(latitude, longitude);

        setWeatherData(response);
      } catch (error) {
        console.error("Error fetching current weather:", error);
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/BackgroundImages/Sunny2.png")}
      style={styles.bgStyle}
      resizeMode="contain"
      imageStyle={styles.bgImage}
    >
      <View style={styles.mainView}>
        <TextInput
          style={styles.search}
          value={searchLocation}
          onChangeText={setSearchLocation}
          placeholder="Search location..."
          onSubmitEditing={handleLocationSearch}
        />

        <TopWeatherCard weatherData={weatherData} onLocationSearch={handleLocationSearch} />

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.bottomScroll}
        >
          <View style={styles.test}>
            <BottomWeatherCard />
            <BottomWeatherCard />
            <BottomWeatherCard />
            <BottomWeatherCard />
            <BottomWeatherCard />
            <BottomWeatherCard />
            <BottomWeatherCard />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

export default HomePageScreen;

const styles = StyleSheet.create({
  bottomScroll: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flex: 1,
    // Delete scroll bar
  },
  test: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainView: {
    flex: 1,
    padding: 16,
  },
  search: {
    backgroundColor: Colors.secondary,
    borderRadius: 24,
    padding: 6,
  },
  bgImage: {
    marginTop: 200,
  },
  bgStyle: {
    flex: 1,
  },

});

{
  /* <ImageBackground
      source={require("../assets/BackgroundImages/Rainy.png")}
      style={styles.rootScreen}
      resizeMode="contain"
      imageStyle={styles.bgImage}
    ></ImageBackground> */
}

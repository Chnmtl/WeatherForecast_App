import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';

import { fetchCurrentWeather } from "../api/OpenWeatherAPI";
import * as Location from "expo-location";

import Colors from "../../constants/Colors";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function TopWeatherCard({ weatherData, onLocationSearch }) {

  const [date, setDate] = useState("");
  // const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    setInterval(() => {
      const curDate = new Date();
      const dayName = curDate.getDay();
      const day = curDate.getDate();
      const month = curDate.getMonth();

      setDate(dayNames[dayName] + ", " + months[month] + " " + day);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   const fetchCurrentWeatherData = async () => {
  //     try {
  //       // Request permission to access location
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         throw new Error("Location permission denied");
  //       }

  //       // Get the user's current location
  //       let location = await Location.getCurrentPositionAsync({});
  //       // console.log(Location)
  //       const { latitude, longitude } = location.coords;
  //       // Make the API call to fetch the current weather using the obtained location
  //       const response = await fetchCurrentWeather(latitude, longitude);

  //       // Process the response and update the state with the weather data
  //       setWeatherData(response);
  //     } catch (error) {
  //       console.error("Error fetching current weather:", error);
  //     }
  //   };

  //   fetchCurrentWeatherData();
  // }, []);

  return (
    <View style={styles.topCardView}>
      <View style={styles.topCard}>
        <View style={styles.city}>
          <Text style={styles.cityText}>{weatherData?.city || "N/A"}</Text>
        </View>
        <Text style={styles.dateText}>{date}</Text>
        <View style={styles.weatherCard}>
          <Text style={styles.weatherText}>{weatherData?.temperature ? weatherData.temperature + "°C" : "N/A"}</Text>
          <Text style={styles.weatherText}>{weatherData?.weatherCondition || "N/A"}</Text>
        </View>
      </View>
      {/* <TouchableOpacity onPress={onLocationSearch}>
        <Text>Search Location</Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default TopWeatherCard;

const styles = StyleSheet.create({
  topCardView: {
    alignItems: "center",
    flex: 5,
  },
  topCard: {
    height: 150,
    width: 200,
    backgroundColor: Colors.secondary,
    padding: 8,
    marginTop: 16,
    borderRadius: 24,
    //alignItems: "center",

    // Android Shadow
    elevation: 8,
    // IOS Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, width: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  city: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    padding: 4,
  },
  cityText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  dateText: {
    textAlign: "center",
    paddingBottom: 8,
  },
  weatherCard: {
    backgroundColor: Colors.thirdary,
    borderRadius: 32,
    padding: 4,
  },
  weatherText: {
    textAlign: "center",
    fontSize: 24,
  },
});

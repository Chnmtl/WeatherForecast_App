import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from 'react';

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

function TopWeatherCard({ weatherData }) {

  const [date, setDate] = useState("");

  useEffect(() => {
    setInterval(() => {
      const curDate = new Date();
      const dayName = curDate.getDay();
      const day = curDate.getDate();
      const month = curDate.getMonth();

      setDate(dayNames[dayName] + ", " + months[month] + " " + day);
    }, 1000);
  }, []);

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

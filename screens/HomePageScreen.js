import { View, ImageBackground, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';

import BottomWeatherCard from "../components/ui/BottomWeatherCard";
import TopWeatherCard from "../components/ui/TopWeatherCard";
import Colors from "../constants/Colors";

import { fetchCurrentWeather } from "../components/api/AccuWeatherAPI";

function HomePageScreen() {

  return (
    <ImageBackground
      source={require("../assets/BackgroundImages/Sunny2.png")}
      style={styles.bgStyle}
      resizeMode="contain"
      imageStyle={styles.bgImage}
    >  
      <View style={styles.mainView}>
        <TextInput style={styles.search} />

        <TopWeatherCard />

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

  searchContainer: {
    position: "relative",
    marginTop: 16,
  },
  search: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    padding: 8,
  },
  suggestionText: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
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

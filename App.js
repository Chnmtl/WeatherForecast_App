import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Colors from "./constants/Colors";
import HomePageScreen from "./screens/HomePageScreen";
import WeeklyScreen from "./screens/WeeklyScreen";

const TopNav = createMaterialTopTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

function TopNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <TopNav.Navigator>
        <TopNav.Screen name="HomeScreen" component={HomePageScreen} />
        <TopNav.Screen name="WeeklyScreen" component={WeeklyScreen} />
      </TopNav.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <TopNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
});


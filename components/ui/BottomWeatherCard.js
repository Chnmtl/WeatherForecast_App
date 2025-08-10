import { Text, StyleSheet, View, Image } from "react-native";

import Colors from "../../constants/Colors";

// function BottomWeatherCard() {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.time}>{time}</Text>
//       {/* <Image source={require("../../assets/Icons/sunny.png")} /> */}
//       <Image
//         source={require("../../assets/Icons/sunny.png")}
//         style={styles.image}
//       />
//       <Text style={styles.degree}>{degree}&#176;C</Text>
//     </View>
//   );
// }

const BottomWeatherCard = ({ hourlyWeather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hourly Forecast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {hourlyWeather.map((hour, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.time}>{hour.time}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${hour.icon}@2x.png`,
              }}
              style={styles.image}
            />
            <Text style={styles.degree}>{hour.temperature}°C</Text>
            <Text style={styles.condition}>{hour.weatherCondition}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BottomWeatherCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.thirdary,
    borderRadius: 10,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: "row",
  },
  card: {
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.secondary,
    width: 80,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 3, // For Android shadow
  },
  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
  },
  image: {
    width: 40,
    height: 40,
    marginVertical: 5,
  },
  degree: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.accent,
  },
  condition: {
    fontSize: 12,
    color: Colors.primary,
  },
});

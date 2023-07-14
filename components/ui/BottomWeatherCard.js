import { Text, StyleSheet, View, Image } from "react-native";

import Colors from "../../constants/Colors";

function BottomWeatherCard() {
  return (
    
    <View style={styles.card}>
      
      <Text>14.00</Text>
      <Image source={require("../../assets/Icons/sunny.png")} />
      <Text>27&#176;C</Text>
    </View>
  );
}

export default BottomWeatherCard;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    padding: 10,
    backgroundColor: Colors.thirdary,
    width: 60,
    height: 80,
    marginHorizontal: 8,
    justifyContent:"center",

    borderRadius: 20,
    // Android Shadow
    elevation: 2,
    // IOS Shadow
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

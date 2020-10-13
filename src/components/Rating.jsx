import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { times } from "lodash";
const Rating = ({ rate }) => {
  return (
    <View style={styles.container}>
      {times(5, (idx) => (
        <Icons
          key={idx.toString()}
          name={idx < rate ? "star" : "star-outline"}
          color="orange"
        />
      ))}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

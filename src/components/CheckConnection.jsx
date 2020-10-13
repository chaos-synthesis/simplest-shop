import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HelperText, Colors } from "react-native-paper";
import NetInfo from "@react-native-community/netinfo";

const CheckConnection = () => {
  const [isConnected, setConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) =>
      setConnected(state.isConnected)
    );

    return () => {
      // Clean up the subscription
      unsubscribe();
    };
  });
  return (
    <HelperText type="info" visible={!isConnected} style={styles.container}>
      Network error - check your connection!
    </HelperText>
  );
};

export default CheckConnection;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    backgroundColor: Colors.red200,
  },
});

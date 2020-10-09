import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, Portal, Text, useTheme } from "react-native-paper";
import { BlurView } from "expo-blur";
import { useGlobals } from "../contexts/Global";
import CatalogScreen from "../screens/CatalogScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";
import SignupScreen from "../screens/SignupScreen";
import ProductDetails from "../screens/ProductDetails";

const BaseStackNav = createStackNavigator();

const MainStackNavigation = () => {
  const [{ showLoader }] = useGlobals();
  const { colors } = useTheme();

  return (
    <React.Fragment>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        animated
      />
      <BaseStackNav.Navigator
        screenOptions={{ headerShown: false }}
        mode="modal"
      >
        <BaseStackNav.Screen name="Home" component={CatalogScreen} />
        <BaseStackNav.Screen
          name="Product Details"
          component={ProductDetails}
        />
        <BaseStackNav.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ cardStyle }}
        />
        <BaseStackNav.Screen
          name="Auth"
          component={AuthScreen}
          options={{ cardStyle }}
        />
        <BaseStackNav.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ cardStyle }}
        />
      </BaseStackNav.Navigator>
      {showLoader && (
        <Portal>
          <BlurView intensity={70} style={blurContainer}>
            <View
              style={[
                styles.spinContainer,
                { backgroundColor: colors.background },
              ]}
            >
              <ActivityIndicator size={50} />
            </View>
          </BlurView>
        </Portal>
      )}
    </React.Fragment>
  );
};

const cardStyle = {
  backgroundColor: "transparent",
  marginTop: 50,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
};

const styles = StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },
  spinContainer: {
    padding: 20,
    borderRadius: 15,
  },
});

export default MainStackNavigation;

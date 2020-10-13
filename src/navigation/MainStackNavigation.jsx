import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Colors,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import { BlurView } from "expo-blur";
import { useGlobals } from "../contexts/Global";
import CatalogScreen from "../screens/CatalogScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AuthScreen from "../screens/AuthScreen";
import SignupScreen from "../screens/SignupScreen";
import ProductDetails from "../screens/ProductDetails";

const AuthStackNav = createStackNavigator();
const AuthStackNavigation = () => {
  return (
    <AuthStackNav.Navigator
      headerMode="none"
      screenOptions={{ cardStyle: { backgroundColor: "transparent" } }}
    >
      <AuthStackNav.Screen name="Auth" component={AuthScreen} />
      <AuthStackNav.Screen name="SignUp" component={SignupScreen} />
    </AuthStackNav.Navigator>
  );
};

const BaseStackNav = createStackNavigator();
const MainStackNavigation = () => {
  const [{ showLoader }] = useGlobals();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
        animated
      />
      <BaseStackNav.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: [styles.cardStyle, { paddingBottom: insets.bottom }],
        }}
        mode="modal"
      >
        <BaseStackNav.Screen
          name="Home"
          component={CatalogScreen}
          options={{
            headerShown: true,
            cardStyle: { paddingBottom: insets.bottom },
            headerTitle: "Online Shop",
          }}
        />
        <BaseStackNav.Screen
          name="Product Details"
          component={ProductDetails}
        />
        <BaseStackNav.Screen name="Profile" component={ProfileScreen} />
        <BaseStackNav.Screen name="Auth" component={AuthStackNavigation} />
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
    </>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 50,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    elevation: 10,
  },
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

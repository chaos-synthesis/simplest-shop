import React from "react";
import { enableScreens } from "react-native-screens";
import Main from "./src/Main";
import { initialState, reducer, StateProvider } from "./src/contexts/Global";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

// Before rendering any navigation stack
enableScreens();

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Main />
      </SafeAreaProvider>
    </StateProvider>
  );
}

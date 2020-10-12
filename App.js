import React from "react";
import { enableScreens } from "react-native-screens";
import Main from "./src/Main";
import { initialState, reducer, StateProvider } from "./src/contexts/Global";

// Before rendering any navigation stack
enableScreens();

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Main />
    </StateProvider>
  );
}

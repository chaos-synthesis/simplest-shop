// import { StatusBar } from 'expo-status-bar';
import React from "react";
import Main from "./src/Main";
import { initialState, reducer, StateProvider } from "./src/contexts/Global";

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Main />
    </StateProvider>
  );
}

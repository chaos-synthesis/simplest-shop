import React from "react";
import { AppState } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { useGlobals } from "./contexts/Global";
import { AppLoading } from "expo";

function Main() {
  const [{ session, theme, day }, dispatch] = useGlobals();
  const [isReady, setIsReady] = React.useState(false);
  const [appState, setAppState] = React.useState(AppState.currentState);
  const _theme = themes[theme];

  // Handles screen focus and case when user reopens app
  const _handleAppStateChange = (nextAppState) => {
    if (appState.match(/active/) && nextAppState === "active") {
      const nDate = DateUtils.toAmerican(new Date());
      if (nDate !== day) {
        dispatch({
          type: "setDay",
          day: nDate,
        });
      }
    }
    setAppState(nextAppState);
  };

  // Deal with background/active app
  React.useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  // Backbones
  React.useEffect(() => {
    (async () => {
      try {
        if (__DEV__) {
          // await setTestDeviceIDAsync("EMULATOR");
          // const state = await Storer.get(PERSISTENCE_KEY);
          // setInitialState(state);
        }

        const session = await Storer.get(SESSION_KEY);
        if (session) {
          dispatch({
            type: "setSession",
            fields: { ...session },
          });
        }
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Main;

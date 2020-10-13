import React from "react";
import { Linking, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { useGlobals, setSessionAction } from "./contexts/Global";
import Storage from "./utils/Storage";
import MainStackNavigation from "./navigation/MainStackNavigation";
import theme from "./theme";
import API from "./api";

function Main() {
  const [{ session }, dispatch] = useGlobals();
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  // update persisted state
  React.useEffect(() => {
    if (isReady) {
      console.log("persist session", session);
      Storage.setSessionState(session);
      API.setToken(session.token || null);
    }
  }, [session, isReady]);

  // restore persisted state
  React.useEffect(() => {
    const restoreState = async () => {
      try {
        // restore session
        const savedSession = await Storage.getSessionState();
        if (savedSession) {
          dispatch(setSessionAction(savedSession));
          API.setToken(savedSession.token || null);
        }

        // restore navigation state
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== "web" && initialUrl == null) {
          // only restore state if there's no deep link and we're not on web
          const state = await Storage.getNavigationState();
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        initialState={initialState}
        onStateChange={Storage.setNavigationState}
      >
        <MainStackNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default Main;

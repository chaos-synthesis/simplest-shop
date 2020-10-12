import AsyncStorage from "@react-native-community/async-storage";

const NAVIGATION_KEY = "@navigation";
const SESSION_KEY = "session";

const Storage = {
  async getNavigationState() {
    return Storage._getState(NAVIGATION_KEY);
  },
  async getSessionState() {
    return Storage._getState(SESSION_KEY);
  },

  async setNavigationState(state) {
    return Storage._setState(NAVIGATION_KEY, state);
  },
  async setSessionState(state) {
    return Storage._setState(SESSION_KEY, state);
  },

  async _getState(key) {
    try {
      const savedStateString = await AsyncStorage.getItem(key);
      return savedStateString ? JSON.parse(savedStateString) : undefined;
    } catch (error) {
      return undefined;
    }
  },
  async _setState(key, state) {
    try {
      AsyncStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Storage Error: ", error);
    }
  },
};

export default Storage;

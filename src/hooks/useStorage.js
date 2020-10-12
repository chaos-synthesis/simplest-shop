import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const useAsyncStorage = (key, defaultValue) => {
  const [state, setState] = useState({
    hydrated: false,
    storageValue: defaultValue,
  });
  const { hydrated, storageValue } = state;

  async function pullFromStorage() {
    const fromStorage = await AsyncStorage.getItem(key);
    let value = defaultValue;
    if (fromStorage) {
      value = JSON.parse(fromStorage);
    }
    setState({ hydrated: true, storageValue: value });
  }

  async function updateStorage(newValue) {
    setState({ hydrated: true, storageValue: newValue });
    const stringifiedValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, stringifiedValue);
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, hydrated];
};

export default useAsyncStorage;

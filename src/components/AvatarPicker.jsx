import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import PlatformUtils from "../utils/Platform";

const AvatarPicker = ({ image, onChange }) => {
  useEffect(() => {
    (async () => {
      if (PlatformUtils.isAndroid || PlatformUtils.isIos) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      base64: true,
    });

    if (!result.cancelled) {
      const imageBase64 = `data:image/jpeg;base64,${result.base64}`;
      onChange && onChange(imageBase64);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={pickImage}>
      {image ? (
        <Avatar.Image source={{ uri: image }} onPress={pickImage} />
      ) : (
        <Avatar.Icon icon="account-circle-outline" />
      )}
    </TouchableWithoutFeedback>
  );
};

export default AvatarPicker;

const styles = StyleSheet.create({});

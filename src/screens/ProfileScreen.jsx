import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Divider, Switch, Text, Title, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { debounce } from "lodash";
import PlatformUtils from "../utils/Platform";
import Close from "../components/Close";
import { TextInput } from "../components/paper";
import { useGlobals, setSessionAction, logoutAction } from "../contexts/Global";
import LogoutButton from "../components/LogoutButton";
import AvatarPicker from "../components/AvatarPicker";
import { set } from "react-native-reanimated";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [{ session }, dispatch] = useGlobals();
  const [image, setImage] = useState(session.avatar);
  const [name, setName] = useState(session.profile?.name || "");
  const [surname, setSurname] = useState(session.profile?.surname || "");

  const debouncedUpdateSession = debounce(
    () => dispatch(setSessionAction({ profile: { name, surname } })),
    1000
  );
  useEffect(debouncedUpdateSession, [name, surname]);

  const onLogout = () => {
    debouncedUpdateSession.cancel();
    dispatch(logoutAction());
    navigation.popToTop();
  };

  const handleAvatarChange = (imageBase64) => {
    setImage(imageBase64);
    dispatch(setSessionAction({ avatar: imageBase64 }));
  };

  return (
    <BlurView
      style={[StyleSheet.absoluteFill]}
      tint="light"
      intensity={PlatformUtils.isAndroid ? 100 : 50}
    >
      <Close position="right" />
      <View style={styles.headerContainer}>
        <AvatarPicker image={image} onChange={handleAvatarChange} />
        <View style={{ marginLeft: 25, flex: 1 }}>
          <Title>{session.username || "Username"}</Title>
          <LogoutButton onConfirm={onLogout} />
        </View>
      </View>
      <Divider style={{ marginTop: 25 }} />
      <View style={styles.detailsContainer}>
        <TextInput label="Name" value={name} onChangeText={setName} />
        <TextInput label="Surname" value={surname} onChangeText={setSurname} />
      </View>

      <Divider style={{ marginTop: 10 }} />
      <View style={{ marginTop: 20 }}></View>
    </BlurView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  detailsContainer: {
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
});

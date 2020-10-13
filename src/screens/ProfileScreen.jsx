import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Switch, Button, Title, useTheme } from "react-native-paper";
import { BlurView } from "expo-blur";
import PlatformUtils from "../utils/Platform";
import Close from "../components/Close";
import { TextInput } from "../components/paper";
import { useGlobals, setSessionAction, logoutAction } from "../contexts/Global";
import LogoutButton from "../components/LogoutButton";
import AvatarPicker from "../components/AvatarPicker";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [{ session }, dispatch] = useGlobals();
  const [image, setImage] = useState(session.avatar);
  const [name, setName] = useState(session.profile?.name || "");
  const [surname, setSurname] = useState(session.profile?.surname || "");
  const [allowOffline, setAllowOffline] = useState(
    session.profile?.allowOffline
  );

  const toggleOfflineMode = () => setAllowOffline(!allowOffline);

  let unsubscribe;
  useEffect(() => {
    unsubscribe = navigation.addListener("blur", () => {
      dispatch(setSessionAction({ profile: { name, surname, allowOffline } }));
    });
    return () => unsubscribe();
  }, [name, surname, allowOffline]);

  const onLogout = () => {
    unsubscribe();
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
      <View style={styles.optionsContainer}>
        <View style={styles.optionsOption}>
          <Button
            icon="brightness-6"
            style={styles.optionsButton}
            labelStyle={styles.optionsLabel}
            uppercase={false}
            theme={{ colors: { primary: colors.text } }}
          >
            Offline mode
          </Button>
          <Switch onChange={toggleOfflineMode} value={allowOffline} />
        </View>
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
  optionsContainer: {
    marginHorizontal: 20,
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 10,
  },
  optionsOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionsButton: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  optionsLabel: {
    marginLeft: 23,
    fontSize: 18,
  },
});

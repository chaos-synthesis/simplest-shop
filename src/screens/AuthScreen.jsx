import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import Platform from "../utils/Platform";
import theme from "../theme";
import Close from "../components/Close";
import { TextInput, Button, Header } from "../components/paper";
import useApi from "../hooks/useApi";
import API from "../api";
import { nameValidator, passwordValidator } from "../utils/validators";
import { useGlobals, setSessionAction } from "../contexts/Global";

const AuthScreen = ({ navigation }) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { data, loading, setLoading, error } = useApi(
    () => API.login(username, password),
    false
  );
  const [_, dispatch] = useGlobals();

  React.useEffect(() => {
    if (data?.success) {
      dispatch(setSessionAction({ token: data.token }));
      navigation.popToTop();
    }
  }, [data]);

  const onLoginPressed = () => {
    const usernameError = nameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading();
  };

  return (
    <BlurView
      style={[StyleSheet.absoluteFill, styles.container]}
      tint={"light"}
      intensity={Platform.isAndroid ? 150 : 100}
    >
      <Close position="right" />
      <Header>Welcome back.</Header>

      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={onLoginPressed}
        style={styles.button}
      >
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          hitSlop={{
            bottom: 30,
            left: 10,
            right: 10,
            top: 0,
          }}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // width: "100%",
    // maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

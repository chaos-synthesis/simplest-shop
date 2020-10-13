import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { trim } from "lodash";
import Platform from "../utils/Platform";
import theme from "../theme";
import Close from "../components/Close";
import { TextInput, Button, Header } from "../components/paper";
import useApi from "../hooks/useApi";
import API from "../api";
import { useGlobals, setSessionAction } from "../contexts/Global";
import { nameValidator, passwordValidator } from "../utils/validators";
import DefaultScrollView from "../components/containers/DefaultScrollView";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [apiError, setApiError] = useState({ visible: false, message: "" });
  const { data, loading, setLoading, error } = useApi(
    () => API.register(username.value, password.value),
    false
  );
  const [_, dispatch] = useGlobals();
  const passwordInput = useRef(null);
  const focusPasswordInput = () => passwordInput.current?.focus();

  let timeoutHandle;
  React.useEffect(() => {
    clearTimeout(timeoutHandle);
    if (data?.success) {
      dispatch(
        setSessionAction({ token: data.token, username: username.value })
      );
      navigation.navigate("Home");
      return;
    }
    setApiError({ visible: true, message: data?.message });
    timeoutHandle = setTimeout(
      () => setApiError({ ...apiError, visible: false }),
      5000
    );
    return () => clearTimeout(timeoutHandle);
  }, [data]);

  const onSignupPressed = () => {
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
      <Header>Create Account</Header>
      <Text style={{ color: "red", opacity: apiError.visible ? 1 : 0 }}>
        {apiError.message}
      </Text>

      <DefaultScrollView showsVerticalScrollIndicator={false}>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={username.value}
          onSubmitEditing={focusPasswordInput}
          onChangeText={(text) => setUsername({ value: trim(text), error: "" })}
          error={!!username.error}
          errorText={username.error}
          autoCapitalize="none"
        />

        <TextInput
          ref={passwordInput}
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: trim(text), error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          onPress={onSignupPressed}
          style={styles.button}
        >
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Auth")}
            hitSlop={{
              bottom: 30,
              left: 10,
              right: 10,
              top: 0,
            }}
          >
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </DefaultScrollView>
    </BlurView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

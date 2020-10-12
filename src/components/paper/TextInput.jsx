import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput as Input } from "react-native-paper";
import theme from "../../theme";

const TextInput = ({ errorText, ...props }, ref) => {
  return (
    <View style={styles.container}>
      <Input
        ref={ref}
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default React.forwardRef(TextInput);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

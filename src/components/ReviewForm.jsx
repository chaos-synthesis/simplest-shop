import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, TextInput, Colors } from "react-native-paper";
import { times, isEmpty } from "lodash";
import useApi from "../hooks/useApi";
import API from "../api";

const ReviewForm = ({ productId }) => {
  const [rate, setRate] = useState(0);
  const [text, setText] = useState("");
  const { setLoading } = useApi(() => API.postReview(productId, rate, text));
  return (
    <View style={styles.container}>
      <View style={styles.iconsRow}>
        {times(5, (idx) => (
          <IconButton
            key={idx.toString()}
            icon={rate > idx ? "star" : "star-outline"}
            color={Colors.red500}
            size={20}
            onPress={() => setRate(idx + 1)}
          />
        ))}
      </View>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline={true}
        maxLength={250}
        mode="outlined"
        right={
          <TextInput.Icon
            name="arrow-right"
            color={Colors.green500}
            size={30}
            disabled={isEmpty(text) || rate === 0}
            onPress={setLoading}
            forceTextInputFocus={false}
          />
        }
      />
    </View>
  );
};

export default ReviewForm;

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "stretch" },
  iconsRow: { flexDirection: "row" },
});

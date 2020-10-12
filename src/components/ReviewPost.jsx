import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Paragraph } from "react-native-paper";
import Rating from "./Rating";

const ReviewPost = ({ rate, text, created_by = {} }) => {
  return (
    <Card>
      <Card.Title
        left={() => <Rating rate={rate} />}
        right={() => <Text style={styles.username}>{created_by.username}</Text>}
      />
      <Card.Content>
        <Paragraph>{text}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default ReviewPost;

const styles = StyleSheet.create({
  username: {
    paddingHorizontal: 12,
  },
});

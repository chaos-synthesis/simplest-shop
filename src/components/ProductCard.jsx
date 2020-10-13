import React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";

const ProductCard = ({ id, image, text, title, onPress }) => {
  return (
    <Card onPress={onPress} style={styles.container}>
      <Card.Cover source={{ uri: image }} />
      <Card.Title
        title={title}
        style={styles.cardTitle}
        titleStyle={styles.titleText}
      />
      <Card.Content>
        <Paragraph numberOfLines={1}>{text}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    borderRadius: 0,
  },
  cardTitle: { position: "absolute" },
  titleText: {
    textShadowColor: "white",
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
  },
});

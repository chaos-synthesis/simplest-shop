import React from "react";
import { Image, StyleSheet } from "react-native";
import { Card, Text, Paragraph, IconButton, Colors } from "react-native-paper";

const ProductCard = ({ item: { id, image, text, title, ...rest } = {}}) => {
  return (
    <Card>
      <Card.Cover source={{ uri: image }}/>
      <Card.Title
        title={title}
        style={{ position: "absolute" }}
        titleStyle={{
          textShadowColor: "white",
          textShadowRadius: 1,
          textShadowOffset: { width: 1, height: 1 },
        }}
      />
      <Card.Content>
        <Paragraph>{text}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton
          icon="star"
          color={Colors.red500}
          size={20}
          onPress={() => console.log("Pressed")}
        />
      </Card.Actions>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({});

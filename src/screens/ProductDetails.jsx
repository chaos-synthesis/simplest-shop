import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  Card,
  Paragraph,
  TextInput,
  IconButton,
  Colors,
} from "react-native-paper";
import { times } from "lodash";
import Close from "../components/Close";
import Platform from "../utils/Platform";
import useApi from "../hooks/useApi";
import API from "../api";
import { ScrollView } from "react-native-gesture-handler";
import ReviewPost from "../components/ReviewPost";
import ReviewForm from "../components/ReviewForm";

const ProductDetails = ({
  route: { params: { id, image, text, title } } = {},
}) => {
  const { data, loading, error } = useApi(() => API.reviews(id));

  return (
    <BlurView
      style={[StyleSheet.absoluteFill, { flex: 1 }]}
      tint={"light"}
      intensity={Platform.isAndroid ? 150 : 100}
    >
      <ScrollView>
        <Close position="right" />
        <Card style={{ marginTop: 50 }}>
          <Card.Cover source={{ uri: image }} />
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
          <Card.Actions
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <ReviewForm productId={post.id} />
          </Card.Actions>
        </Card>
        {data.map((post) => (
          <ReviewPost key={post.id.toString()} {...post} />
        ))}
      </ScrollView>
    </BlurView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});

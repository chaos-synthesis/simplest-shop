import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
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
import { useGlobals } from "../contexts/Global";

const ProductDetails = ({
  route: { params: { id, image, text, title } } = {},
}) => {
  const { data, loading, error } = useApi(() => API.reviews(id));
  const [{ session }] = useGlobals();

  return (
    <BlurView
      style={[StyleSheet.absoluteFill, styles.container]}
      tint={"light"}
      intensity={Platform.isAndroid ? 150 : 100}
    >
      <Close position="right" />
      <ScrollView>
        <Card style={{ marginTop: 50 }}>
          <Card.Title
            title={title}
            titleStyle={{
              textShadowColor: "white",
              textShadowRadius: 1,
              textShadowOffset: { width: 1, height: 1 },
            }}
          />
          <Card.Cover source={{ uri: image }} />
          <Card.Content>
            <Paragraph>{text}</Paragraph>
          </Card.Content>
          <Card.Actions
            style={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            {!!session.token && <ReviewForm productId={id} />}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});

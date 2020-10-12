import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, FAB } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import useApi from "../hooks/useApi";
import API from "../api";

onst CatalogScreen = ({ navigation }) => {
  const { data, loading, error } = useApi(API.products);

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            onPress={() => navigation.navigate("Product Details", item)}
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        icon="login-variant"
        style={styles.fab}
        color={Colors.red500}
        onPress={() => navigation.navigate("Auth")}
      />
    </>
  );
};

export default CatalogScreen;

const styles = StyleSheet.create({
  listContainer: {},
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

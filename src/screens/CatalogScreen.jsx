import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ProductCard from "../components/ProductCard";
import useApi from "../hooks/useApi";
import API from "../api";

const CatalogScreen = ({ navigation }) => {
  const { data, loading, error } = useApi(API.products);
  return (
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
  );
};

export default CatalogScreen;

const styles = StyleSheet.create({
  listContainer: {},
});

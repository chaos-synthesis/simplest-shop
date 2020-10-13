import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import { useGlobals } from "../contexts/Global";
import ProductCard from "../components/ProductCard";
import useApi from "../hooks/useApi";
import API from "../api";
import CheckConnection from "../components/CheckConnection";

const EmptyListMessage = () => (
  <Text style={styles.emptyListStyle}>oops! There's nothing to sell!</Text>
);

const CatalogScreen = ({ navigation }) => {
  const { data, loading, setLoading } = useApi(API.products);
  const [{ session }, dispatch] = useGlobals();

  const onLogin = () => navigation.navigate("Auth");
  const gotoProfile = () => navigation.navigate("Profile");

  return (
    <>
      <CheckConnection />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            onPress={() => navigation.navigate("Product Details", item)}
          />
        )}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        refreshing={loading}
        onRefresh={setLoading}
        ListEmptyComponent={EmptyListMessage}
        contentContainerStyle={styles.listContainer}
      />
      {!session.token ? (
        <FAB icon="login-variant" style={styles.fab} onPress={onLogin} />
      ) : (
        <FAB
          icon="account-circle-outline"
          style={styles.fab}
          onPress={gotoProfile}
        />
      )}
    </>
  );
};

export default CatalogScreen;

const styles = StyleSheet.create({
  emptyListStyle: {
    marginTop: 70,
    padding: 10,
    fontSize: 18,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

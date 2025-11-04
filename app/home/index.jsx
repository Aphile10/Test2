import React, { useState } from "react";
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Dimensions,} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("none");

  const [hotels, setHotels] = useState([
    {
      id: "1",
      name: "Ocean View Resort",
      location: "Cape Town, South Africa",
      rating: 4.9,
      price: 2500,
      image: require("../../assets/Materials/06-Explore Page/image-1.png"),
    },
    {
      id: "2",
      name: "Safari Lodge",
      location: "Kruger National Park",
      rating: 4.3,
      price: 1750,
      image: require("../../assets/Materials/06-Explore Page/image-4.png"),
    },
    {
      id: "3",
      name: "Urban Chic Hotel",
      location: "Johannesburg",
      rating: 4.0,
      price: 1500,
      image: require("../../assets/Materials/06-Explore Page/image-13.png"),
    },
  ]);

  const handleFilter = (type) => {
    setFilter(type);
    if (type === "price") {
      setHotels((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (type === "rating") {
      setHotels((prev) => [...prev].sort((a, b) => b.rating - a.rating));
    } else {
      setHotels([
            {
        id: "1",
        name: "Ocean View Resort",
        location: "Cape Town, South Africa",
        rating: 4.9,
        price: 2500,
        image: require("../../assets/Materials/06-Explore Page/image-1.png"),
        },
        {
        id: "2",
        name: "Safari Lodge",
        location: "Kruger National Park",
        rating: 4.3,
        price: 1750,
        image: require("../../assets/Materials/06-Explore Page/image-4.png"),
        },
        {
        id: "3",
        name: "Urban Chic Hotel",
        location: "Johannesburg",
        rating: 4.0,
        price: 1500,
        image: require("../../assets/Materials/06-Explore Page/image-14.png"),
        },
      ]);
    }
  };

  const renderHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: "/hotelDetails", params: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={14} color="#777" /> {item.location}
        </Text>
        <View style={styles.row}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.price}>R{item.price}/night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Explore Hotels</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === "none" && styles.activeBtn]}
          onPress={() => handleFilter("none")}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === "price" && styles.activeBtn]}
          onPress={() => handleFilter("price")}
        >
          <Text style={styles.filterText}>Sort by Price</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === "rating" && styles.activeBtn]}
          onPress={() => handleFilter("rating")}
        >
          <Text style={styles.filterText}>Sort by Rating</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00a86b" />
      ) : (
        <FlatList
          data={hotels}
          renderItem={renderHotel}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#006400",
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterBtn: {
    backgroundColor: "#e8f5e9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  activeBtn: {
    backgroundColor: "#00a86b",
  },
  filterText: {
    color: "#006400",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: width * 0.5,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    color: "#f5a623",
    fontWeight: "600",
  },
  price: {
    color: "#00a86b",
    fontWeight: "700",
  },
});

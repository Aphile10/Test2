import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function HotelDetails() {
  const hotel = useLocalSearchParams();
  const router = useRouter();

  const handleBookNow = () => {
    router.push({
      pathname: '/bookings',
      params: hotel,
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: hotel.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.location}>{hotel.location}</Text>
        <Text style={styles.rating}>⭐ {hotel.rating}</Text>
        <Text style={styles.price}>R{hotel.price}/night</Text>

        <TouchableOpacity style={styles.bookBtn} onPress={handleBookNow}>
          <Text style={styles.bookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backBtn: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#00a86b",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 300,
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#006400",
  },
  location: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  rating: {
    color: "#f5a623",
    marginVertical: 5,
    fontSize: 16,
  },
  price: {
    color: "#00a86b",
    fontWeight: "700",
    fontSize: 18,
    marginVertical: 10,
  },
  bookBtn: {
    backgroundColor: "#00a86b",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  bookText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Booking() {
  const hotel = useLocalSearchParams();
  const router = useRouter();

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(new Date().getTime() + 86400000)); 
  const [rooms, setRooms] = useState(1);
  const [total, setTotal] = useState(hotel.price);

  useEffect(() => {
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setTotal(days * hotel.price * rooms);
  }, [checkIn, checkOut, rooms]);

  const handleBooking = () => {
    if (checkOut <= checkIn) {
      Alert.alert("Invalid Dates", "Check-out date must be after check-in date.");
      return;
    }

    Alert.alert(
      "Booking Confirmed!",
      `Hotel: ${hotel.name}\nCheck-in: ${checkIn.toDateString()}\nCheck-out: ${checkOut.toDateString()}\nRooms: ${rooms}\nTotal: R${total}`
    );
    router.back(); 
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{hotel.name}</Text>

      <Text style={styles.label}>Check-in:</Text>
      <DateTimePicker
        value={checkIn}
        mode="date"
        display="default"
        onChange={(event, date) => date && setCheckIn(date)}
        style={styles.picker}
      />

      <Text style={styles.label}>Check-out:</Text>
      <DateTimePicker
        value={checkOut}
        mode="date"
        display="default"
        onChange={(event, date) => date && setCheckOut(date)}
        style={styles.picker}
      />

      <Text style={styles.label}>Rooms:</Text>
      <TextInput
        keyboardType="numeric"
        value={rooms.toString()}
        onChangeText={(text) => setRooms(Number(text))}
        style={styles.input}
      />

      <Text style={styles.total}>Total: R{total}</Text>

      <TouchableOpacity style={styles.bookBtn} onPress={handleBooking}>
        <Text style={styles.bookText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#006400",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
  },
  picker: {
    width: "100%",
    marginVertical: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    color: "#00a86b",
    marginVertical: 20,
  },
  bookBtn: {
    backgroundColor: "#00a86b",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  bookText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: 'one',
    title: 'Luxury and Classy Hotels',
    text: 'The best quality hotels and staycationwith international standards are curated.',
    image: require('../../assets/Materials/01-Onboarding Page/Onboarding 1.png'),
  },
  {
    key: 'two',
    title: 'Find The Best Place to',
    text: 'The largest platform to find staycations and hotels in Indonesia.',
    image: require('../../assets/Materials/01-Onboarding Page/Onboarding 2.png'),
  },
  {
    key: 'three',
    title: 'Book in Seconds',
    text: 'We guarantee that you will not be disapointed with our features in this app.',
    image: require('../../assets/Materials/01-Onboarding Page/Onboarding 3.png'),
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();
  const auth = getAuth(app);

  const handleNext = async () => {
    if (currentSlide < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentSlide + 1 });
      setCurrentSlide(currentSlide + 1);
    } else {
      await AsyncStorage.setItem("hasOnboarded", "true");

      const user = auth?.currentUser;
      if (user) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    }
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentSlide(index);
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentSlide === index && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    width,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#017601ff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
  dotsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#00a86b",
  },
  nextBtn: {
    backgroundColor: "#00a86b",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});



import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { Link } from "expo-router";

const { width } = Dimensions.get("window");
const slideWidth = width * 0.9;

const styles = StyleSheet.create({
  gallery: {
    height: 200,
    width: "100%",
    borderWidth: 1,
    borderColor: "#113768",
    borderRadius: 25,
  },
  slide: {
    width: width - 72,
    justifyContent: "center",
    alignItems: "center",
  },
  facebook: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
  },
  facebookOne: {
    fontFamily: "Montserrat-Black",
    color: "#113768",
    fontSize: 20,
  },
  facebookTwo: {
    fontFamily: "Montserrat-SemiBold",
    color: "#113768",
    fontSize: 13,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#113768",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
  textView: {
    width: "60%",
  },
  logoView: {
    width: "40%",
    justifyContent: "flex-end",
  },
});

const views = [
  {
    id: "1",
    content: (
      <Link href="https://www.facebook.com/share/g/15jdqESvWV/?mibextid=wwXIfr">
        <View style={[styles.facebook, { width: slideWidth }]}>
          <View style={styles.textView}>
            <Text style={styles.facebookOne}>Meet, Share, and Learn!</Text>
            <Text style={styles.facebookTwo}>Join Facebook Community</Text>
          </View>
          <View style={styles.logoView}>
            <Image
              source={require("@/assets/images/icons/facebook-logo.png")}
              style={{ width: 120, height: 120 }}
            />
          </View>
        </View>
      </Link>
    ),
  },
];

const SlidingGallery = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIdx(index);
  };

  return (
    <View style={styles.gallery}>
      <FlatList
        data={views}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>{item.content}</View>
        )}
        pagingEnabled
      />
      <View style={styles.pagination}>
        {views.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIdx === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SlidingGallery;

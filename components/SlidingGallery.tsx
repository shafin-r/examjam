import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useState } from "react";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  gallery: {
    height: 200,
    width: "100%",
    borderWidth: 1,
    borderColor: "#113768",
    borderRadius: 25,
  },
  slide: {
    width: width - 80,
    justifyContent: "center",
    alignItems: "center",
  },
  facebook: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  facebookOne: {
    fontFamily: "Montserrat-Black",
    color: "#113768",
    fontSize: 20,
  },
  facebookTwo: {
    fontFamily: "Montserrat-SemiBold",
    color: "#113768",
    fontSize: 14,
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
});

const views = [
  {
    id: "1",
    content: (
      <View style={styles.facebook}>
        <View>
          <Text style={styles.facebookOne}>Meet, Share, and Learn!</Text>
          <Text style={styles.facebookTwo}>Join Facebook Community</Text>
        </View>
        <View></View>
      </View>
    ),
  },
  {
    id: "2",
    content: (
      <View>
        <Text>View 2</Text>
      </View>
    ),
  },
  {
    id: "3",
    content: (
      <View>
        <Text>View 3</Text>
      </View>
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

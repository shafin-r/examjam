import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";

const Profile = () => {
  return (
    <View>
      <Header
        displaySubject={null}
        displayTabTitle="My Profile"
        displayUser={false}
      />
      <View className="mx-10">
        <DestructibleAlert extraStyles="mt-10" text="Page under work." />
      </View>
    </View>
  );
};

export default Profile;

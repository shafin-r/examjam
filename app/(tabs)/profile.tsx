import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  return (
    <View>
      <Header
        displaySubject={null}
        displayTabTitle="My Profile"
        displayUser={false}
      />
      <View className="mx-10"></View>
    </View>
  );
};

export default Profile;

import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/lib/auth";
import { getToken } from "@/lib/secure-store";

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

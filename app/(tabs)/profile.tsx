import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/Header";
import DestructibleAlert from "@/components/DestructibleAlert";
import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/lib/auth";
import { getToken } from "@/lib/secure-store";
import BackgroundWrapper from "@/components/BackgroundWrapper";

const Profile = () => {
  return (
    <View>
      <Header
        displaySubject={null}
        displayTabTitle="My Profile"
        displayUser={false}
      />
      <BackgroundWrapper>
        <View className="mx-10">
          <DestructibleAlert text="Work in progress" extraStyles={"mt-10"} />
        </View>
      </BackgroundWrapper>
    </View>
  );
};

export default Profile;

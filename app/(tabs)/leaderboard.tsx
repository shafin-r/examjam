import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Image } from "expo-image";
import DestructibleAlert from "@/components/DestructibleAlert";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { API_URL } from "@/lib/auth";
import { getToken } from "@/lib/secure-store";

const LeaderboardPage = () => {
  const [boardError, setBoardError] = useState<string | null>(null);
  const [boardData, setBoardData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);

  async function fetchBoardData() {
    try {
      const boardResponse = await fetch(`${API_URL}/leaderboard`, {
        method: "GET",
      });

      if (!boardResponse.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }

      const fetchedBoardData = await boardResponse.json();
      if (Array.isArray(fetchedBoardData) && fetchedBoardData.length > 0) {
        setBoardData(fetchedBoardData);
      } else {
        setBoardError("No leaderboard data available.");
        setBoardData([]);
      }
    } catch (error) {
      console.error(error);
      setBoardError("Something went wrong. Please try again.");
      setBoardData([]);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = await getToken();
        if (!token) throw new Error("User is not authenticated");

        const response = await fetch(`${API_URL}/me`, {
          method: "get",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const fetchedUserData = await response.json();
        setLoading(false);
        setUserData(fetchedUserData);
      } catch (error) {
        console.error(error);
        setUserData(null);
      }
    }

    fetchUser();
    fetchBoardData();
  }, []);

  // For Rafeed
  // fetch function for leaderboard data.
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBoardData();
    setRefreshing(false);
  };

  // if (boardError) {
  //   return (
  //     <View className="h-screen">
  //       <Header
  //         displaySubject={"Leaderboard"}
  //         displayTabTitle={null}
  //         displayUser={false}
  //       />
  //       <ScrollView
  //         refreshControl={
  //           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  //         }
  //       >
  //         <View className="mt-5 px-5">
  //           <DestructibleAlert text={boardError} />
  //         </View>
  //       </ScrollView>
  //     </View>
  //   );
  // }

  const getTopThree = (boardData) => {
    if (!boardData || !Array.isArray(boardData)) return [];
    const sortedData = boardData
      .filter((player) => player?.points !== undefined) // Ensure `points` exists
      .sort((a, b) => b.points - a.points);

    const topThree = sortedData.slice(0, 3).map((player, index) => ({
      ...player,
      rank: index + 1,
      height: index === 0 ? 250 : index === 1 ? 200 : 170,
    }));

    return [topThree[1], topThree[0], topThree[2]].filter(Boolean); // Handle missing players
  };

  const getLeaderboard = (boardData) => {
    return boardData.slice().sort((a, b) => b.points - a.points);
  };

  const getUserData = (boardData, name) => {
    if (!boardData || !Array.isArray(boardData)) return [];
    const sortedData = boardData
      .filter((player) => player?.name && player?.points !== undefined)
      .sort((a, b) => b.points - a.points);

    const result = sortedData.find((player) => player.name === name);
    return result ? [{ ...result, rank: sortedData.indexOf(result) + 1 }] : [];
  };

  return (
    <SafeAreaProvider>
      <Header displaySubject={"Leaderboard"} displayTabTitle={null} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className=""
      >
        {boardData ? (
          <View className="gap-4 mx-10 my-10">
            <View>
              <View className="flex-row justify-evenly items-end">
                {getTopThree(boardData).map((student, idx) =>
                  student ? (
                    <View
                      key={idx}
                      className="w-[85] bg-[#113768] rounded-t-xl items-center border-2 border-white/0 gap-2 py-4"
                      style={{ height: student.height }}
                    >
                      <Text className="font-montBold text-3xl text-white">
                        {student.rank}
                      </Text>
                      <Image
                        source={require("@/assets/images/static/avatar.jpg")}
                        style={{ width: 30, height: 30, borderRadius: 20 }}
                      />
                      <Text className="font-montBold text-md text-center text-white">
                        {student.name}
                      </Text>
                      <Text className="font-montRegular text-sm text-white">
                        ({student.points}pt)
                      </Text>
                    </View>
                  ) : null
                )}
              </View>
              <View
                className="w-full border-[#c5dbf8] bg-[#c5dbf8]"
                style={{ borderWidth: 2 }}
              ></View>
            </View>
            <View className="border-[1px] border-[#c0dafc] gap-4 h-fit w-full rounded-[25] p-6">
              <View>
                {getUserData(boardData, userData?.name).map((user, idx) => (
                  <View
                    key={idx}
                    className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center"
                  >
                    <View className="flex-row gap-3 items-center">
                      <Text className="font-montMedium text-lg">
                        {user.rank}
                      </Text>
                      <Image
                        source={require("@/assets/images/static/avatar.jpg")}
                        style={{ width: 20, height: 20, borderRadius: 25 }}
                      />
                      <Text className="font-montMedium text-sm">
                        {user.name}
                      </Text>
                    </View>
                    <Text className="font-montMedium text-[#000]/40">
                      {user.points}pt
                    </Text>
                  </View>
                ))}
              </View>
              <View
                className="w-full border-[#c5dbf8] bg-[#c5dbf8]"
                style={{ borderWidth: 1 }}
              ></View>
              {getLeaderboard(boardData).map((user, idx) => (
                <View
                  key={idx}
                  className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center"
                >
                  <View className="flex-row gap-3 items-center">
                    <Text className="font-montMedium text-lg">{idx + 1}</Text>
                    <Image
                      source={require("@/assets/images/static/avatar.jpg")}
                      style={{ width: 20, height: 20, borderRadius: 25 }}
                    />
                    <Text className="font-montMedium text-sm">{user.name}</Text>
                  </View>
                  <Text className="font-montMedium text-[#000]/40">
                    {user.points}pt
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <SafeAreaProvider>
            <Header displaySubject={"Leaderboard"} displayTabTitle={null} />
            <ActivityIndicator size={"large"} />
          </SafeAreaProvider>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default LeaderboardPage;

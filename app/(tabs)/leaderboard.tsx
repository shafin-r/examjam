import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Image } from "expo-image";
import DestructibleAlert from "@/components/DestructibleAlert";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { API_URL } from "@/lib/auth";

const LeaderboardPage = () => {
  const [boardError, setBoardError] = useState<string | null>(null);
  const [boardData, setBoardData] = useState([{}]);

  const [refreshing, setRefreshing] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  async function fetchBoardData() {
    try {
      const boardResponse = await fetch(`${API_URL}/leaderboard`, {
        method: "GET",
      });
      const fetchedBoardData = await boardResponse.json();
      console.log(fetchedBoardData);
      setBoardData(fetchedBoardData);
    } catch (error) {
      setBoardError("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    fetchBoardData();
  }, []);

  // For Rafeed
  // fetch function for leaderboard data.
  const onRefresh = async () => {
    setRefreshing(true);

    fetchBoardData();
    setComponentKey((prevKey) => prevKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
    const sortedData = boardData.slice().sort((a, b) => b.points - a.points);

    const topThree = sortedData.slice(0, 3).map((player, index) => ({
      ...player,
      rank: index + 1,
      height: index === 0 ? 250 : index === 1 ? 200 : 170,
    }));

    return [topThree[1], topThree[0], topThree[2]];
  };

  const getLeaderboard = (boardData) => {
    return boardData.slice().sort((a, b) => b.points - a.points);
  };

  const getUserData = (boardData, name) => {
    // Step 1: Sort the data by points in descending order
    const sortedData = boardData.slice().sort((a, b) => b.points - a.points);

    // Step 2: Find the player's rank and points
    const rankAndPoints = sortedData.map((player, index) => ({
      name: player.name,
      points: player.points,
      rank: index + 1, // Assign rank based on sorted order
    }));

    // Step 3: Find the player by name
    const result = rankAndPoints.find((player) => player.name === name);

    return [result] || null; // Return rank and points or null if not found
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
        <View className="gap-4 mx-10 my-10">
          <View>
            <View className="flex-row justify-evenly items-end">
              {getTopThree(boardData).map((student, idx) => (
                <View
                  key={idx}
                  className="w-[85] bg-[#113768] rounded-t-xl items-center border-2 border-white/0 gap-2 py-4"
                  style={{ height: student.height }}
                >
                  <Text className="font-montBold text-3xl text-white">
                    {student.rank}
                  </Text>

                  <Text className="font-montBold text-xl text-white">
                    {student.name}
                  </Text>
                  <Text className="font-montRegular text-sm text-white">
                    ({student.points}pt)
                  </Text>
                </View>
              ))}
            </View>
            <View
              className="w-full border-[#c5dbf8] bg-[#c5dbf8]"
              style={{ borderWidth: 2 }}
            ></View>
          </View>
          <View className="border-[1px] border-[#c0dafc] gap-4 h-fit w-full rounded-[25] p-6">
            <View>
              {getUserData(boardData, "Shafin").map((user, idx) => (
                <View
                  key={idx}
                  className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center"
                >
                  <View className="flex-row gap-3 items-center">
                    <Text className="font-montMedium text-lg">{user.rank}</Text>
                    <Image
                      source={require("@/assets/images/static/pfp.jpg")}
                      style={{ width: 20, height: 20, borderRadius: 25 }}
                    />
                    <Text className="font-montMedium text-lg">{user.name}</Text>
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
              <>
                <View
                  key={idx}
                  className="flex-row border-2 border-[#c5dbf8] rounded-[8] py-2 px-4 justify-between items-center"
                >
                  <View className="flex-row gap-3 items-center">
                    <Text className="font-montMedium text-lg">{idx + 1}</Text>
                    <Image
                      source={require("@/assets/images/static/pfp.jpg")}
                      style={{ width: 20, height: 20, borderRadius: 25 }}
                    />
                    <Text className="font-montMedium text-lg">{user.name}</Text>
                  </View>
                  <Text className="font-montMedium text-[#000]/40">
                    {user.points}pt
                  </Text>
                </View>
              </>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default LeaderboardPage;

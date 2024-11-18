import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";

import Banner from "../../../components/Home/Banner.jsx";
import EstimationCard from "../../../components/Home/EstimationCard.jsx";
import Footer from "../../../components/Home/Footer.jsx";
import IntroducerCode from "../../../components/Home/IntroducerCode.jsx";
import TopBar from "../../../components/Home/TopBar.jsx";

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [totalBalance, setTotalBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [PIN, setPIN] = useState(0);
  const [membercount, setMembercount] = useState(0);
  const [ml_coin_rate, setMl_coin_rate] = useState(0);
  const [referral_bonus, setReferral_bonus] = useState(0);
  const [levelCommission, setLevelCommission] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [growth_percentage, setGrowth_percentage] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchUserDetails = async () => {
        try {
          const storedUsername = await AsyncStorage.getItem("username");
          console.log("Retrieved Username:", storedUsername);

          if (storedUsername) {
            const response = await fetch(
              `https://dawn.zetspring.com/dawn/super_market/home_api.php`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: storedUsername }),
              },
            );

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("API Response:", data);
            const Details = data.data;
            console.log("Details:", Details);

            if (data && data.status === "success") {
              setUsername(username);
              setTotalBalance(data.data.total_balance);
              console.log("total balance:", totalBalance);
              setPIN(data.data.PIN);
              console.log("PIN:", data.data.PIN);
              setReferral_bonus(data.data.referral_bonus || 0);
              console.log("Referral Bonus:", data.data.referral_bonus);
              setDeposit(data.data.deposit);
              console.log("Deposit:", data.data.deposit);
              setTotalWithdrawals(data.data.total_withdrawals || 0);
              console.log("Total Withdrawals:", data.data.total_withdrawals);
              setMembercount(data.data.member_count);
              console.log("Member Count:", data.data.member_count);
              setLevelCommission(data.data.level_commission || "0");
              console.log("Level Commission:", data.data.level_commission);
            } else if (data && data.status === "error") {
              console.error("API Error:", data.message);
            } else {
              console.error("Error: Invalid response structure", data);
            }
          } else {
            console.warn("No username found in AsyncStorage");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      // Fetch data when component is focused
      fetchUserDetails();

      // Optionally clean up any resource if needed
      return () => {
        console.log("Cleanup if necessary");
      };
    }, []), // Add dependencies if any state changes should trigger a re-fetch
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TopBar />
      <ScrollView>
        <Banner username={username} />
        <EstimationCard
          walletBalance={totalBalance}
          ml_coin_rate={ml_coin_rate}
          growth_percentage={growth_percentage}
        />
        <IntroducerCode membercount={membercount} PIN={PIN} />
        <Footer
          totalBalance={totalBalance}
          totalDeposit={deposit}
          referral={referral_bonus}
          growth={growth_percentage}
          levelCommission={levelCommission}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

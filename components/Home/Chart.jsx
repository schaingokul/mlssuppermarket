import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { colors, width, height } from "../../const/colors";

// Get the width of the screen
const screenWidth = Dimensions.get("window").width;
// Define a height for the chart (you can adjust this as needed)
const chartHeight = 220; // Height of the chart

// Sample data for the chart
const data = {
  datasets: [
    {
      data: [4, 3, 5, 4.5, 6, 7, 5, 5.5, 6, 12, 11, 11.5, 15, 11, 15, 17, 21],
    },
  ],
};

//1,4,3,5,4.5,6,7,5,5.5,6,
export default function MyChart() {
  return (
    <View>
      <LineChart
        data={data}
        width={100}
        height={50}
        chartConfig={{
          backgroundGradientFrom: colors.background,
          backgroundGradientTo: colors.background,
          fillShadowGradientTo: colors.primaryHighOpacity,
          fillShadowGradientTo: colors.primaryLowOpacity,
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`,
          strokeWidth: 3,
          barPercentage: 1,
          useShadowColorFromDataset: false,
        }}
        style={{ overflow: "visible" }}
        withDots={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        withInnerLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
      />
    </View>
  );
}

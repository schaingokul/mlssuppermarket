import React from "react";
import { View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { colors, width, height } from "../../const/colors";

// Sample data for the progress chart
const data = {
  data: [0.8],
};

export default function MyChart1() {
  return (
    <View style={{ alignItems: "center", marginVertical: 16 }}>
      <ProgressChart
        data={data}
        width={100} // Set the width of the chart
        height={100} // Set the height of the chart
        strokeWidth={20} // Thickness of the chart line
        radius={42} // Radius of the chart
        chartConfig={{
          transparent: true,
          backgroundGradientFrom: colors.lowOpacity,
          backgroundGradientTo: { lightgreen: 0.5, red: 0.5 },
          fillShadowGradientTo: colors.primaryHighOpacity,
          fillShadowGradientFrom: colors.primaryLowOpacity,
          color: (opacity = 1) => `rgba(255, 99, 71, ${opacity})`, // Custom color for the chart
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color for the labels
        }}
        hideLegend={true} // Show/hide the legend
        style={{}}
      />
    </View>
  );
}

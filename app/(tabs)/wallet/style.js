import { StyleSheet, Dimensions } from "react-native";
import { colors, width, height } from "../../../const/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  acontainer: {
    backgroundColor: colors.primaryDark,
    width: width,
    paddingBottom: 10,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  balanceSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  balanceCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6dc7b8", // Placeholder color for the chart circle
  },
  totalBalance: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  balanceInBTC: {
    color: "#4ecdc4",
    fontSize: 16,
  },
  balanceDetails: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around",
  },
  balanceBox: {
    backgroundColor: "#003366",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    width: "45%",
    alignItems: "center",
  },
  balanceLabel: {
    color: "#ccc",
  },
  balanceAmount: {
    color: "#fff",
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#4a90e2",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    width: "30%",
  },
  buttonText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },
  conversionSection: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  conversionText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  cryptoList: {
    marginTop: 20,
    width: "100%",
  },
  cryptoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff10",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  cryptoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  cryptoInfo: {
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
  },
  cryptoName: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "left",
  },
  cryptoEarnings: {},
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
});

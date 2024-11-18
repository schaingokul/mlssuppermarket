import { StyleSheet } from "react-native";
import { colors, width, height } from "../../../const/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
    marginTop: 50,
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ColoredButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginHorizontal: 40, // Combined margin
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary,
    textAlign: "center",
    paddingBottom: 20,
  },
  usernameText: {
    fontSize: 18,
    color: colors.text,
  },
  profilePictureContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 50,
    height: 50,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 10,
    marginBottom: 20,
  },
  introducercode: {
    marginBottom: 20,
    width: width - 10,
    backgroundColor: colors.white, // Use defined color
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  signupCard: {
    height: "50%", // Changed to relative height
    width: width - 10,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: "scroll",
  },
  card: {
    width: width - 10,
    backgroundColor: colors.primary, // Use defined color
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  cardTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: 24,
    color: colors.white,
    marginTop: 10,
  },
  portfolioScroll: {
    padding: 20,
    width: width,
  },
  portfolioCard: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 2,
    width: 150,
  },
  portfolioCardName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  portfolioCardBalance: {
    fontSize: 20,
    marginTop: 5,
  },
  popularCurrenciesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seeMoreText: {
    color: "#007BFF",
    marginBottom: 10,
  },
  currencyCard: {
    backgroundColor: colors.white,
    width: "100%",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },
});

export default styles;

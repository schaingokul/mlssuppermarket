import { StyleSheet, Dimensions } from "react-native";
import { colors, width, height } from "./../const/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 50,
    marginBottom: 50,
  },
  logoText: {
    fontSize: 50,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 40,
  },
  section: {
    alignItems: "center",
  },
  AuthContainer: {
    marginTop: 20,
  },
  AuthText: {
    fontSize: 37,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  AuthSubText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 40,
    alignSelf: "center",
  },

  SignupLogo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    justifyContent: "center",
  },
  getStartdButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    color: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    height: 5,
    width: "80%", // Adjust the width as needed
  },

  label: {
    color: colors.primary,
    alignSelf: "flex-start",
    marginBottom: 2,
  },

  forgot: {
    color: colors.primary,
    alignSelf: "flex-end",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  TextStyle: {
    marginBottom: 10,
    alignSelf: "center",
  },
  TextLink: {
    color: colors.primary,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    height: 39,
    marginTop: 4,
  },
  logout: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  termsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    textAlign: "center",
  },
  welcomeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ColoredButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginRight: width / 3,
    marginLeft: width / 3,

    marginBottom: 10,
  },
  WelcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    paddingBottom: 20,
  },
  usernameText: {
    fontSize: 18,
    color: "#888",
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
    width: width - 20,
    marginBottom: 20,
  },
  introducercode: {
    width: "110%",
    marginBottom: 20,
    backgroundColor: "#fff", // Orange with transparency
    padding: 20,
    borderRadius: 10,

    flex: 1,
    marginHorizontal: 5,
  },
  signupCard: {
    width: width - 20,
    height: height / 1.5,
    marginHorizontal: 10, // Add some space between cards
    padding: 20,
    backgroundColor: "#fff", // Card background color
    borderRadius: 10,
    elevation: 5, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
    overflow: "scroll",
  },
  card: {
    width: "110%",

    backgroundColor: "#4169E1", // Orange with transparency
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  cardTitleBlack: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardValueBlack: {
    fontSize: 24,
    marginTop: 10,
  },
  cardTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: 24,
    color: "white",
    marginTop: 10,
  },
  portfolioScroll: {
    padding: 20,
    width: "120%",
  },
  portfolioCard: {
    backgroundColor: "#fff",
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
    backgroundColor: "#fff",
    width: "110%",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 2,
  },
});

export default styles;

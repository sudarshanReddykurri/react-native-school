import { StyleSheet } from "react-native";
import colors from "../../config/colors";

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 0
  },
  labelText: {
    color: colors.subtle,
    fontSize: 18
  },
  border: {
    borderBottomColor: colors.subtle,
    borderBottomWidth: 1
  },
  validationContainer: {
    minHeight: 25,
    marginTop: 5
  },
  errorMessage: {
    color: "#ba5361",
    fontWeight: "500"
  },
  successMessage: {
    color: "#4bc350",
    fontWeight: "500"
  },
  input: {
    fontSize: 16,
    lineHeight: 18,
    paddingVertical: 10,
    fontWeight: "500",
    color: colors.primary
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    height: 18,
    marginVertical: 10,
    tintColor: colors.primary
  },
  selectRow: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  selectListContainer: {
    marginTop: 20,
    flex: 1,
    borderColor: colors.subtle,
    borderBottomWidth: 1,
    borderTopWidth: 1
  }
});

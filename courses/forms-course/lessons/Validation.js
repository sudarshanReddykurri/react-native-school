import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { H1, H2 } from "../components/Text";
import { TextInput } from "../components/Form";
import { Button } from "../components/Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 15,
    paddingHorizontal: 20
  }
});

const initialFormValues = { email: "", password: "" };

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("That doesn't look like an email address.")
    .required("We need this!"),
  password: Yup.string()
    .required("Need this one too.")
    .min(2, "Seems a bit short...")
    .max(10, "Ah, a password manager user. You're breaking my example.")
});

const getValidationType = (field, { touched, errors }, override) => {
  if (override) return override;

  if (touched[field]) {
    return errors[field] ? "error" : "success";
  }

  return undefined;
};

const getValidationText = (field, { touched, errors }, message) => {
  if (message) return message;

  if (touched[field]) {
    return errors[field] ? errors[field] : "Looks good!";
  }

  return undefined;
};

class Lesson extends React.Component {
  handleSubmit = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      setSubmitting(false);

      if (Math.random() >= 0.5) {
        setErrors({ general: "Your password doesn't match your email" });
      }
    }, 1000);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <H1>Hello!</H1>
          <H2>Welcome back. Please enter your login details.</H2>
          <Formik
            initialValues={initialFormValues}
            validationSchema={SignInSchema}
            onSubmit={this.handleSubmit}
          >
            {props => {
              const {
                handleChange,
                handleSubmit,
                handleBlur,
                isSubmitting,
                errors
              } = props;
              return (
                <React.Fragment>
                  <TextInput
                    label="Email"
                    validationType={getValidationType("email", props)}
                    validationText={getValidationText("email", props)}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                  />
                  <TextInput
                    label="Password"
                    secureTextEntry
                    validationType={getValidationType(
                      "password",
                      props,
                      errors.general && "error"
                    )}
                    validationText={getValidationText(
                      "password",
                      props,
                      errors.general
                    )}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Button
                    onPress={handleSubmit}
                    text="Login"
                    disabled={isSubmitting}
                  />
                </React.Fragment>
              );
            }}
          </Formik>
        </View>
      </View>
    );
  }
}

export default Lesson;

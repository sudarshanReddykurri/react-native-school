import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { register } from "../api/auth";
import { TextInput, Select } from "../components/Form";
import { Button } from "../components/Button";
import { AuthFormWrapper } from "../components/AuthFormWrapper";
import {
  getValidationType,
  getValidationText,
  validationSchemaDefaults
} from "../util/forms";

const initialFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  experienceLevel: "",
  interests: []
};

const FormSchema = Yup.object().shape({
  email: validationSchemaDefaults.email,
  password: validationSchemaDefaults.password,
  confirmPassword: validationSchemaDefaults.password.test(
    "password-match",
    "Passwords do not match",
    function(value) {
      return this.parent.password === value;
    }
  ),
  experienceLevel: validationSchemaDefaults.requiredString,
  interests: validationSchemaDefaults.arrayOfStrings.min(
    1,
    "Please choose at least one interest."
  )
});

class Lesson extends React.Component {
  handleSubmit = (values, { setSubmitting, setErrors, setFieldTouched }) => {
    setFieldTouched("email", false);
    setFieldTouched("password", false);
    setFieldTouched("confirmPassword", false);
    register(values.email, values.password)
      .then(() => {
        setSubmitting(false);
        alert("Success! Welcome to the club.");
      })
      .catch(error => {
        setSubmitting(false);
        setErrors({ general: error.message });
      });
  };

  renderFields = formData => {
    const {
      handleChange,
      handleSubmit,
      handleBlur,
      isSubmitting,
      errors,
      values
    } = formData;
    return (
      <React.Fragment>
        <TextInput
          label="Email"
          validationType={getValidationType("email", formData)}
          validationText={getValidationText("email", formData)}
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
            formData,
            errors.general && "error"
          )}
          validationText={getValidationText("password", formData)}
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          label="Confirm Password"
          secureTextEntry
          validationType={getValidationType(
            "confirmPassword",
            formData,
            errors.general && "error"
          )}
          validationText={getValidationText("confirmPassword", formData)}
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Select
          label="Experience Level"
          validationType={getValidationType(
            "experienceLevel",
            formData,
            errors.general && "error"
          )}
          validationText={getValidationText("experienceLevel", formData)}
          value={values.experienceLevel}
          onPress={() => {
            this.props.navigation.navigate("SelectList", {
              options: ["Beginner", "Intermediate", "Advanced"],
              selected: [values.experienceLevel],
              onSelect: () => alert("selected things!"),
              multi: false,
              title: "Experience Level"
            });
          }}
        />
        <Select
          label="Interests"
          validationType={getValidationType(
            "interests",
            formData,
            errors.general && "error"
          )}
          validationText={getValidationText(
            "interests",
            formData,
            errors.general
          )}
          value={values.interests}
          onPress={() => {
            this.props.navigation.navigate("SelectList", {
              options: [
                "React",
                "React Native",
                "Native iOS Development",
                "Native Android Development",
                "Hybrid App Development"
              ],
              selected: [values.interests],
              onSelect: () => alert("selected things!"),
              multi: true,
              title: "Interests"
            });
          }}
        />
        <Button onPress={handleSubmit} text="Login" disabled={isSubmitting} />
      </React.Fragment>
    );
  };

  render() {
    return (
      <AuthFormWrapper
        header="Welcome!"
        subHeader="Thanks for joining us. We just need a few details to get started."
      >
        <Formik
          initialValues={initialFormValues}
          validationSchema={FormSchema}
          onSubmit={this.handleSubmit}
          render={this.renderFields}
        />
      </AuthFormWrapper>
    );
  }
}

export default Lesson;

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { login } from "../api/auth";
import { TextInput } from "../components/Form";
import { Button } from "../components/Button";
import { AuthFormWrapper } from "../components/AuthFormWrapper";

import {
  getValidationType,
  getValidationText,
  validationSchemaDefaults
} from "../util/forms";

const initialFormValues = { email: "", password: "", confirmPassword: "" };

const FormSchema = Yup.object().shape({
  email: validationSchemaDefaults.email,
  password: validationSchemaDefaults.password,
  confirmPassword: validationSchemaDefaults.password.test(
    "password-match",
    "Passwords do not match",
    function(value) {
      return this.parent.password === value;
    }
  )
});

class Lesson extends React.Component {
  handleSubmit = (values, { setSubmitting, setErrors, setFieldTouched }) => {
    setFieldTouched("email", false);
    setFieldTouched("password", false);
    setFieldTouched("confirmPassword", false);
    login(values.email, values.password)
      .then(() => {
        setSubmitting(false);
        alert("Success! Welcome to the club.");
      })
      .catch(error => {
        setSubmitting(false);
        setErrors({ general: error.message });
      });
  };

  renderFields = props => {
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
          validationText={getValidationText("password", props, errors.general)}
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
            props,
            errors.general && "error"
          )}
          validationText={getValidationText(
            "confirmPassword",
            props,
            errors.general
          )}
          onChangeText={handleChange("confirmPassword")}
          onBlur={handleBlur("confirmPassword")}
          autoCapitalize="none"
          autoCorrect={false}
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

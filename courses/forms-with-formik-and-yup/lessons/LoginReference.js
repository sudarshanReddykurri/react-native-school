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

const initialFormValues = { email: "", password: "" };

const FormSchema = Yup.object().shape({
  email: validationSchemaDefaults.email,
  password: validationSchemaDefaults.password
});

class Lesson extends React.Component {
  handleSubmit = (values, { setSubmitting, setErrors, setFieldTouched }) => {
    setFieldTouched("email", false);
    setFieldTouched("password", false);
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
        <Button onPress={handleSubmit} text="Login" disabled={isSubmitting} />
      </React.Fragment>
    );
  };

  render() {
    return (
      <AuthFormWrapper
        header="Hello!"
        subHeader="Welcome back. Please enter your login details."
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

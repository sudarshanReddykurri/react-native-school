import * as Yup from "yup";

export const getValidationType = (field, { touched, errors }, override) => {
  if (override) return override;

  if (touched[field]) {
    return errors[field] ? "error" : "success";
  }

  return undefined;
};

export const getValidationText = (field, { touched, errors }, message) => {
  if (message) return message;

  if (touched[field]) {
    return errors[field] ? errors[field] : "Looks good!";
  }

  return undefined;
};

export const validationSchemaDefaults = {
  email: Yup.string()
    .email("That doesn't look like an email address.")
    .required("We need this!"),
  password: Yup.string()
    .required("Need this one too.")
    .min(2, "Seems a bit short...")
    .max(10, "Ah, a password manager user. You're breaking my example.")
};

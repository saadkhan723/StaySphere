export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

export function isValidPhone(phone) {
  return /^[0-9+\-\s()]{7,20}$/.test(phone);
}

export function isValidNumber(value) {
  return value !== "" && !Number.isNaN(Number(value));
}

export function isPositiveNumber(value) {
  return isValidNumber(value) && Number(value) > 0;
}

export function validateRegisterForm(formData) {
  const errors = {};

  if (!isRequired(formData.name)) {
    errors.name = "Name is required.";
  }

  if (!isRequired(formData.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!isRequired(formData.password)) {
    errors.password = "Password is required.";
  } else if (!isValidPassword(formData.password)) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

export function validateLoginForm(formData) {
  const errors = {};

  if (!isRequired(formData.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email.";
  }

  if (!isRequired(formData.password)) {
    errors.password = "Password is required.";
  }

  return errors;
}
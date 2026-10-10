export function getErrorMessage(error) {
  if (typeof error === "string" && error.trim()) {
    return error;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function handleApiError(error) {
  const message = getErrorMessage(error);

  console.error("API Error:", message);

  return message;
}

export function isNetworkError(error) {
  return (
    error instanceof TypeError &&
    error.message.toLowerCase().includes("fetch")
  );
}

export function getFriendlyErrorMessage(error) {
  if (isNetworkError(error)) {
    return "Unable to connect to the server. Please try again later.";
  }

  return getErrorMessage(error);
}
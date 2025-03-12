import axios from "axios"

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data

    return {
      type: "error",
      error: (errorData?.error || errorData?.message || "Unknown Axios error"),
      details: errorData?.details || "",
    };
  }

  if (error instanceof Error) {
    return {
      type: "error",
      error: error.message || "Unknown error",
      details: "",
    };
  }

  return {
    type: "error",
    error: "Unknown error type",
    details: "",
  };
}

export default handleError
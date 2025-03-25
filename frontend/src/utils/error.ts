import axios from "axios";

/**
 * Gestionează obiecte de eroare necunoscute și le transformă într-un format uniform.
 *
 * - Dacă eroarea provine din Axios, extrage mesajul și detaliile din răspunsul API.
 * - Dacă este o instanță `Error`, returnează mesajul.
 * - Altfel, returnează un mesaj generic.
 *
 * @param error - Orice tip de eroare (Axios, Error, sau altceva necunoscut)
 * @returns Un obiect cu `{ type, error, details }` pentru afișare sau logging.
 */
const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data;

    return {
      type: "error",
      error: errorData?.error || errorData?.message || "Unknown Axios error",
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
};

export default handleError;

import axios from "axios";

interface ApiError {
  title: string;
  message: string;
}

export const getApiError = (error: any) => {
  let title;
  let message;
  let code = "";

  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with an error
      title = error.response.data.error.title;
      message = error.response.data.error.message;
      code = error.response.data.error.code;
    } else if (error.request) {
      // Request made, but no response
      title = "Server conection failed";
      message = "Cherck your internet connection or try again later";
    } else {
      // Request setup error
      title = "Client conection failed";
      message = "Try again later";
    }
  } else {
    console.log({ error });
    title = "Oops!";
    message = "Something went wrong. Try again later";
  }
  return { title, message, code };
};

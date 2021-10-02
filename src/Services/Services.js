import { BASE_URL } from "./Constants";

export const getMovies = async () => {
  return await fetch(BASE_URL)
    .then((res) => res.json())
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error;
      }
    );
};

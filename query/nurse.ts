import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserType } from "../types/user";

export const useCurrentNurseLogin = () => {
  const query = useQuery(["currentNurse"], async () => {
    try {
      const response = await axios.get<UserType>(
        "http://localhost:5001/api/auth/me"
      );
      return response.data;
    } catch (error) {
      throw error; // Re-throw the error to be caught by the caller
    }
  });

  return query.data;
};

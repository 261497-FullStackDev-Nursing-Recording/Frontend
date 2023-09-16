import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserType } from "../types/user";

export const useCurrentNurseLogin = () => {
  const query = useQuery(["currentNurse"], async () => {
    const response = await axios.get<UserType>(
      "http://localhost:5001/api/auth/me"
    );
    return response.data;
  });
  return query.data;
};

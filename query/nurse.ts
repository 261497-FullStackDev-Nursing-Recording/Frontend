import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/user";

export const useCurrentNurseLogin = () => {
  const query = useQuery(["currentNurse"], async () => {
    const response = await axios.get<User>("http://localhost:5001/api/auth/me");
    return response.data;
  });
  return query.data;
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/user";
import { axiosCustom } from "../services/axiosCustom";

export const useCurrentNurseLogin = () => {
  const query = useQuery(["currentNurse"], async () => {
    try {
      const response = await axiosCustom.get<User>("/api/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  });

  return query.data;
};

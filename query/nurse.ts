import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentNurseLogin = () => {
  const query = useQuery(["currentNurse"], async () => {
    const response = await axios.get("http://localhost:5001/api/auth/me");
    return response.data;
  });
  return query;
};

export const useNursesQuery = () => {
  const query = useQuery(["nurses"], async () => {
    const response = await axios.get("http://localhost:5001/api/users");
    return response.data;
  });
  return query;
};

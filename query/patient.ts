import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryPatients = () => {
  const query = useQuery(["patients"], async (data) => {
    const response = await axios.post(
      "http://localhost:5001/api/patient/search",
      data
    );
    return response.data;
  });
  return query;
};

export const useQueryLinkedPatients = () => {
  const query = useQuery(["linkedPatient"], async (data) => {
    const response = await axios.post(
      "http://localhost:5001/api/patient/GetLinkedPatients",
      data
    );
    return response.data;
  });
  return query;
};

export const useMutationLinkPatient = () => {
  const mutation = useMutation(["linkPatient"], async (args) => {
    const response = await axios.post(
      "http://localhost:5001/api/patient/linkedPatients",
      args
    );
    return response.data;
  });
  return mutation;
};

export const useMutationUpdateLinkedPatients = () => {
  const mutation = useMutation(["removeLinkedPatients"], async (args) => {
    await axios.put("http://localhost:5001/api/patient", args);
  });

  return mutation;
};

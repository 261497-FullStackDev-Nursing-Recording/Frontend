import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useQueryRecords = () => {
  const query = useQuery(["records"], async (data) => {
    const response = await axios.post(
      "http://localhost:5001/api/records/search",
      data
    );
    return response.data;
  });
  return query;
};

export const useMutationUpdateRecord = (recordId: string) => {
  const mutation = useMutation(["updateRecord"], async (args) => {
    await axios.put(`http://localhost:5001/api/record/${recordId}`, args);
  });
  return mutation;
};

export const useMutationDeleteRecord = (recordId: string) => {
  const mutation = useMutation(["deleteRecord"], async (args) => {
    await axios.delete(`http://localhost:5001/api/record/${recordId}`);
  });
  return mutation;
};

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Record, UpdateRecord } from "../types/record";

export const useQueryRecords = (data: Record) => {
  const query = useQuery(["records"], async () => {
    const response = await axios.post<Record[]>(
      "http://localhost:5001/api/records/search",
      data
    );
    return response.data;
  });
  return query;
};

export const useMutationUpdateRecord = (recordId: string) => {
  const mutation = useMutation(["updateRecord"], async (args: UpdateRecord) => {
    await axios.put<null>(`http://localhost:5001/api/record/${recordId}`, args);
  });
  return mutation;
};

export const useMutationDeleteRecord = (recordId: string) => {
  const mutation = useMutation(["deleteRecord"], async () => {
    await axios.delete<null>(`http://localhost:5001/api/record/${recordId}`);
  });
  return mutation;
};

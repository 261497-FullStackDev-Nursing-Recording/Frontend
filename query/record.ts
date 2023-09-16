import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  RecordType,
  SearchRecordType,
  UpdateRecordType,
} from "../types/record";

export const useQueryRecords = (data: SearchRecordType) => {
  const query = useQuery(
    ["records"],
    async () => {
      const response = await axios.post<RecordType[]>(
        "http://localhost:5001/api/records/search",
        data
      );
      return response.data;
    },
    {
      refetchInterval: 20000,
    }
  );
  return query;
};

export const useMutationUpdateRecord = (recordId: string) => {
  const mutation = useMutation(
    ["updateRecord"],
    async (args: UpdateRecordType) => {
      await axios.put<null>(
        `http://localhost:5001/api/record/${recordId}`,
        args
      );
    }
  );
  return mutation;
};

export const useMutationDeleteRecord = (recordId: string) => {
  const mutation = useMutation(["deleteRecord"], async () => {
    await axios.delete<null>(`http://localhost:5001/api/record/${recordId}`);
  });
  return mutation;
};

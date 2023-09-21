import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateRecordType,
  RecordType,
  SearchRecordType,
  UpdateRecordType,
} from "../types/record";
import { useCurrentNurseLogin } from "./nurse";

export const useQueryRecords = (data: SearchRecordType) => {
  const query = useQuery(["records"], async () => {
    const response = await axios.post<RecordType[]>(
      "http://localhost:5001/api/records/search",
      data
    );
    return response.data;
  });
  return query;
};

export const useMuationCreateRecord = () => {
  const user = useCurrentNurseLogin();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["createRecord"],
    async (args: CreateRecordType) => {
      const response = await axios.post<RecordType>(
        "http://localhost:5001/api/records",
        args
      );
      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["records", user?.id],
        });
      },
    }
  );
  return mutation;
};
export const useMutationUpdateRecord = (recordId: string) => {
  const user = useCurrentNurseLogin();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["updateRecord"],
    async (args: UpdateRecordType) => {
      await axios.put<null>(
        `http://localhost:5001/api/record/${recordId}`,
        args
      );
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["records", user?.id],
        });
      },
    }
  );
  return mutation;
};

export const useMutationDeleteRecord = (recordId: string) => {
  const user = useCurrentNurseLogin();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["deleteRecord"],
    async () => {
      await axios.delete<null>(`http://localhost:5001/api/record/${recordId}`);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["records", user?.id],
        });
      },
    }
  );
  return mutation;
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useCurrentNurseLogin } from "./nurse";
import {
  CreateRecord,
  Record,
  SearchRecord,
  UpdateRecord,
} from "../types/record";
import { axiosCustom } from "../services/axiosCustom";

export const useQueryRecords = (data: SearchRecord) => {
  const query = useQuery(["records"], async () => {
    const response = await axiosCustom.post<Record[]>(
      "records/getAllRecord",
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
    async (args: CreateRecord) => {
      const response = await axiosCustom.post<Record>("/api/records", args);
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
    async (args: UpdateRecord) => {
      await axiosCustom.put<null>(`/api/records/${recordId}`, args);
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
      await axiosCustom.delete<null>(`/api/records/${recordId}`);
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

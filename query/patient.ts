import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCurrentNurseLogin } from "./nurse";
import {
  LinkPatient,
  Patient,
  RemoveLinkedPatients,
  SearchPatient,
} from "../types/patient";

export const useQueryPatients = (body: SearchPatient) => {
  const query = useQuery(
    ["patients"],
    async () => {
      const response = await axios.post<Patient[]>(
        "http://localhost:5001/api/patient/getAllPatient",
        body
      );
      return response.data;
    },
    {
      refetchInterval: 10000,
      retry: false,
    }
  );
  const isError = query.isError;
  return {
    ...query,
    isError,
  };
};
export const useQuerySearchPatients = (body: SearchPatient) => {
  const query = useQuery(
    ["patients"],
    async () => {
      const response = await axios.post<Patient[]>(
        "http://localhost:5001/api/patient/searchPatient",
        body
      );
      return response.data;
    },
    {
      refetchInterval: 10000,
      retry: false,
    }
  );
  const isError = query.isError;
  return {
    ...query,
    isError,
  };
};

export const useQueryLinkedPatients = (user_id: string) => {
  const query = useQuery(["linkedPatient"], async () => {
    const response = await axios.get<LinkPatient[]>(
      `http://localhost:5001/api/patient/${user_id}`
    );
    return response.data;
  });
  return query;
};

export const useMutationLinkPatient = () => {
  const user = useCurrentNurseLogin();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["linkPatient"],
    async (args: LinkPatient) => {
      const response = await axios.post<LinkPatient>(
        "http://localhost:5001/api/patient/linkedPatients",
        args
      );

      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["linkedPatient", user?.id],
        });
      },
    }
  );
  return mutation;
};

export const useMutationUpdateLinkedPatients = () => {
  const user = useCurrentNurseLogin();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ["removeLinkedPatients"],
    async (args: RemoveLinkedPatients) => {
      await axios.put<null>("http://localhost:5001/api/patient", args);
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["linkedPatient", user?.id],
        });
      },
    }
  );

  return mutation;
};

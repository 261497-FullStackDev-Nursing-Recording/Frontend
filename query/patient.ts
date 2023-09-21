import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCurrentNurseLogin } from "./nurse";
import {
  LinkPatientType,
  PatientType,
  SearchPatientType,
  RemoveLinkedPatientsType,
} from "../types/patient";

export const useQueryPatients = (body: SearchPatientType) => {
  const query = useQuery(
    ["patients"],
    async () => {
      const response = await axios.post<PatientType[]>(
        "http://localhost:5001/api/patient/search",
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
    const response = await axios.get<LinkPatientType[]>(
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
    async (args: LinkPatientType) => {
      const response = await axios.post<LinkPatientType>(
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
    async (args: RemoveLinkedPatientsType) => {
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

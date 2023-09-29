import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCurrentNurseLogin } from "./nurse";
import {
  GetAllPatient,
  GetPatientsByIds,
  LinkPatient,
  Patient,
  RemoveLinkedPatients,
  SearchPatient,
} from "../types/patient";
import { axiosCustom } from "../services/axiosCustom";

export const useQueryPatients = (body: GetAllPatient) => {
  const query = useQuery(
    ["getAllpatients"],
    async () => {
      const response = await axiosCustom.post<Patient[]>(
        "/api/patient/getAllPatient",
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
  const query = useQuery(["searchPatients"], async () => {
    const response = await axiosCustom.post<Patient[]>(
      "/api/patient/search",
      body
    );
    return response.data;
  });
  const isError = query.isError;
  return {
    ...query,
    isError,
  };
};

export const useQueryPatientsByIds = (body: GetPatientsByIds) => {
  const query = useQuery(["getPatientsByIds"], async () => {
    const response = await axiosCustom.post<Patient[]>(
      "/api/patient/getPatientsByIds",
      body
    );
    return response.data;
  });
  const isError = query.isError;
  return {
    ...query,
    isError,
  };
};

export const useQueryLinkedPatients = (user_id: string) => {
  const query = useQuery(["linkedPatient"], async () => {
    const response = await axiosCustom.get<LinkPatient[]>(
      `patient/getLinkedPatients/${user_id}`
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
      const response = await axiosCustom.post<LinkPatient>(
        "patient/linkPatients",
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
      await axiosCustom.put<null>("patient", args);
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

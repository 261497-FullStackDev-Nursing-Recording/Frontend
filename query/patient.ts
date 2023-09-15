import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCurrentNurseLogin } from "./nurse";
import { LinkPatient, Patient, removeLinkedPatients } from "../types/patient";
export const useQueryPatients = (body: Patient) => {
  const query = useQuery(["patients"], async () => {
    const response = await axios.post<Patient[]>(
      "http://localhost:5001/api/patient/search",
      body
    );
    return response.data;
  });
  return query;
};

export const useQueryLinkedPatients = (user_id: string) => {
  const query = useQuery(["linkedPatient", user_id], async () => {
    const response = await axios.post<LinkPatient[]>(
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
  const mutation = useMutation(
    ["removeLinkedPatients"],
    async (args: removeLinkedPatients) => {
      await axios.put<null>("http://localhost:5001/api/patient", args);
    }
  );

  return mutation;
};

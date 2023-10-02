import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateFields } from "../types/field";
export const useMutationCreateFields = () => {
  const mutation = useMutation(["createFields"], async (args: CreateFields) => {
    await axios.post<null>(`http://localhost:5001/api/fields`, args);
  });

  return mutation;
};

export const useMutationUpdateField = (fieldId: string) => {
  const mutation = useMutation(["updateField"], async (args) => {
    await axios.put<null>(`http://localhost:5001/api/fields/${fieldId}`, args);
  });

  return mutation;
};

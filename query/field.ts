import { useMutation } from "@tanstack/react-query";
import { axiosCustom } from "../services/axiosCustom";

export const useMutationUpdateField = (fieldId: string) => {
  const mutation = useMutation(["updateField"], async (args) => {
    await axiosCustom.put<null>(`/api/fields/${fieldId}`, args);
  });

  return mutation;
};

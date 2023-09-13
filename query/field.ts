import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useMutationUpdateField = (fieldId: string) => {
  const mutation = useMutation(["updateField"], async (args) => {
    await axios.put(`http://localhost:5001/api/fields/${fieldId}`, args);
  });

  return mutation;
};

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateFields } from "../types/field";
export const useMutationCreateFields = () => {
	const mutation = useMutation(["createFields"], async (args: CreateFields) => {
		await axios.post<null>(`/api/api/fields`, args);
	});

	return mutation;
};

export const useMutationUpdateField = (fieldId: string) => {
	const mutation = useMutation(["updateField"], async (args) => {
		await axios.put<null>(`/api/api/fields/${fieldId}`, args);
	});

	return mutation;
};

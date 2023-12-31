import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useCurrentNurseLogin } from "./nurse";
import {
	CreateRecord,
	Record,
	SearchRecord,
	UpdateRecord,
} from "../types/record";

export const useQueryRecords = (data: SearchRecord) => {
	const query = useQuery(["records"], async () => {
		const response = await axios.post<Record[]>(
			"/api/api/records/getAllRecord",
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
			const response = await axios.post<Record>("/api/api/records", args);
			return response.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ["records", user?.data?.id],
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
			await axios.put<null>(`/api/api/records/${recordId}`, args);
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ["records", user?.data?.id],
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
			await axios.delete<null>(`/api/api/records/${recordId}`);
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ["records", user?.data?.id],
				});
			},
		}
	);
	return mutation;
};

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCurrentNurseLogin } from "./nurse";
import {
	GetAllPatient,
	LinkPatient,
	Patient,
	RemoveLinkedPatients,
	SearchPatient,
} from "../types/patient";

export const useQueryPatients = (body: GetAllPatient) => {
	const query = useQuery(
		["getAllpatients"],
		async () => {
			const response = await axios.post<Patient[]>(
				"/api/api/patient/getAllPatient",
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
		["searchPatients"],
		async () => {
			const response = await axios.post<Patient[]>(
				"/api/api/patient/search",
				body
			);
			return response.data;
		},
		{ refetchInterval: 1000 }
	);
	const isError = query.isError;
	return query;
};

export const useQueryLinkedPatients = (user_id: string) => {
	const query = useQuery(
		["linkedPatient"],
		async () => {
			const response = await axios.get<Patient[]>(
				`/api/api/patient/getLinkedPatients/${user_id}`
			);
			return response.data;
		},
		{ enabled: !!user_id }
	);
	return query;
};

export const useMutationLinkPatient = () => {
	const user = useCurrentNurseLogin();
	const queryClient = useQueryClient();
	const mutation = useMutation(
		["linkPatient"],
		async (args: LinkPatient) => {
			const response = await axios.post<LinkPatient>(
				"/api/api/patient/linkPatients",
				args
			);

			return response.data;
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ["linkedPatient", user?.data?.id],
				});
			},
		}
	);
	return mutation;
};

export const useMutationUpdateLinkedPatients = (user_id: string) => {
	const user = useCurrentNurseLogin();
	const queryClient = useQueryClient();
	const mutation = useMutation(
		["removeLinkedPatients"],
		async (args: RemoveLinkedPatients) => {
			await axios.put<null>(
				`/api/api/patient/updateLikedPatient/${user_id}`,
				args
			);
		},
		{
			onSuccess: async () => {
				await queryClient.invalidateQueries({
					queryKey: ["linkedPatient", user?.data?.id],
				});
			},
		}
	);

	return mutation;
};

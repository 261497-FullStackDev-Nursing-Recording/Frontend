import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PatientCount: React.FC = () => {
	const [patientCount, setPatientCount] = useState<number>(0);

	const body = {}; // You may need to modify this if your API requires a specific request body

	const {
		data: patients,
		isLoading,
		error,
		isError,
	} = useQuery(["patients"], {
		queryFn: async () => {
			const response = await axios.post("/api/api/patient/getAllPatient", body);
			return response.data;
		},
		onError: (error: any) => {
			console.error("Error fetching data:", error);
		},
	});

	// Update the patient count when the 'patients' data changes
	useEffect(() => {
		if (patients !== undefined) {
			setPatientCount((state) => (state = patients.length));
		}
	}, [patients]);

	return <div>{patientCount}</div>;
};

export default PatientCount;

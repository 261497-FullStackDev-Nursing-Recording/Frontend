import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { axiosCustom } from "../../services/axiosCustom";

export default function PatientNurseRatio() {
    const [patientCount, setPatientCount] = useState<number>(0);

    const body = {}; // You may need to modify this if your API requires a specific request body

    const {
        data: patients,
        isLoading,
        error,
        isError,
    } = useQuery(["patients"], {
        queryFn: async () => {
            const response = await axiosCustom.post(
                "http://localhost:5001/api/patient/search",
                body
            );
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


    const [nurseCount, setNurseCount] = useState<number>(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/users/");
            const data = response.data;
            setNurseCount(data.length);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (parseFloat((patientCount / nurseCount).toFixed(2)).toString());

}
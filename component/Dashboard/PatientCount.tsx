import { useEffect, useState } from "react";
import { axiosCustom } from "../../services/axiosCustom";
import { useQuery } from "@tanstack/react-query";

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
      const response = await axiosCustom.post(
        "http://localhost:5001/api/patient/getAllPatient",
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

  return <div>{patientCount}</div>;
};

export default PatientCount;

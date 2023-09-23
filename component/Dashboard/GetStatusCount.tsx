import { useEffect, useState } from "react";
import { axiosCustom } from "../../services/axiosCustom";
import { useQuery } from "@tanstack/react-query";
import DonughnutChart from "../DonughnutChart";

type PatientStatus = "STATUS_1" | "STATUS_2" | "STATUS_3" | "STATUS_4";

const StatusCount: React.FC = () => {
  const [statusCounts, setStatusCounts] = useState<{
    [key in PatientStatus]: number;
  }>({
    STATUS_1: 0,
    STATUS_2: 0,
    STATUS_3: 0,
    STATUS_4: 0,
  });

  const {
    data: patients,
    isLoading,
    error,
    isError,
  } = useQuery(["patients"], {
    queryFn: async () => {
      const response = await axiosCustom.post(
        "http://localhost:5001/api/patient/getAllPatient",
        {}
      );
      return response.data;
    },
    onError: (error: any) => {
      console.error("Error fetching data:", error);
    },
  });

  // Update the status counts when the 'patients' data changes
  useEffect(() => {
    if (patients !== undefined) {
      const counts: { [key in PatientStatus]: number } = {
        STATUS_1: 0,
        STATUS_2: 0,
        STATUS_3: 0,
        STATUS_4: 0,
      };

      patients.forEach((patient: { status: PatientStatus }) => {
        counts[patient.status]++;
      });

      setStatusCounts(counts);
    }
  }, [patients]);

  return (
    <div>
      {/* <div>{statusCounts.STATUS_1}</div>
      <div>{statusCounts.STATUS_2}</div>
      <div>{statusCounts.STATUS_3}</div>
      <div>{statusCounts.STATUS_4}</div> */}
      <DonughnutChart statusCounts={statusCounts} />
    </div>
  );
};

export default StatusCount;

import { useEffect, useState } from "react";
import axios from "axios";

const NurseCount: React.FC = () => {
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

  return <div>{nurseCount}</div>;
};

export default NurseCount;

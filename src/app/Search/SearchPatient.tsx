import React from "react";
import { Card } from "@mantine/core";

interface SearchResult {
  f_name: string;
  l_name: string;
  identification_id: string;
  status: string;
}

interface SearchPatientProps {
  apiData: SearchResult[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "STATUS_1":
      return "#65EB89"; 
    case "STATUS_2":
      return "#949DEB"; 
    case "STATUS_3":
      return "#EBD071"; 
    case "STATUS_4":
      return "#EB6569"; 
    default:
      return "#000000"; // Default color for unknown statuses
  }
};

const SearchPatient: React.FC<SearchPatientProps> = ({ apiData }) => {
  return (
    <div>
      {apiData.map((item, index) => (
        <Card
          className="w-4/5 flex flex-row justify-between bg-[#BFDBFE] font-semibold mb-[15px] mx-[10%] pl-[30px] pr-[20px] rounded-[10px] text-[#2563EB]"
          key={index}
        >
          <div className="PText">
            <div className="mt-[8px]">
              {/* Circle with background color based on status */}
              <div
                style={{
                  backgroundColor: getStatusColor(item.status),
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "10px",
                }}
              />
              {item.f_name} {item.l_name}
              <div />
              {item.identification_id}
              {/* <div />
              {item.status} */}
            </div>
          </div>
          <div className="py-[10px]">
            {/* Add any additional content or buttons here */}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SearchPatient;

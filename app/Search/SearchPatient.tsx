import React, { useState } from "react";
import { Card } from "@mantine/core";
import { Modal, Button, Group, Text, Center } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import { Patient } from "../../types/patient";
import Link from "next/link";

interface SearchPatientProps {
  apiData: Patient[];
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
      return "#000000";
  }
};

const SearchPatient: React.FC<SearchPatientProps> = ({ apiData }) => {
  const [opened, setOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Patient | null>(null);
  // const navigate = useNavigate();

  const handleCardClick = (item: Patient) => {
    setSelectedCard(item);
    setOpened(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setOpened(false);
  };

  const goToPatientHistory = (identificationId: string) => {
    console.log("Navigating to PatientHistory with ID:", identificationId);
  };

  return (
    <div>
      {apiData.map((item, index) => (
        <Card
          className="w-4/5 min-h-[90px] flex flex-row justify-between bg-[#BFDBFE] font-semibold mb-[15px] mx-[10%] pl-[30px] pr-[0px] rounded-[10px] text-[#2563EB]"
          key={index}
        >
          <div className="my-auto" onClick={() => goToPatientHistory(item.id)}>
            <div>
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
              <Link
                href={{
                  pathname: `/PatientHistory`,
                  query: { id: item.id },
                }}
              >
                {item.f_name} {item.l_name}
                <div />
                {item.identification_id}
              </Link>
            </div>
          </div>
          <div className="my-auto">
            <Button onClick={() => handleCardClick(item)} variant="text">
              <AddIcon sx={{ fontSize: "45px" }} style={{ color: "#2563EB" }} />
            </Button>
          </div>
        </Card>
      ))}
      <Modal
        opened={opened}
        onClose={closeModal}
        size="sm"
        title="ข้อมูลผู้ป่วย"
        // yOffset="200px"

        // style={{
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   minHeight: '100vh', // Set the minimum height to 100% of the viewport height
        // }}
      >
        {selectedCard && (
          <div>
            <Text>
              Name: {selectedCard.f_name} {selectedCard.l_name}
            </Text>
            <Text>ID: {selectedCard.identification_id}</Text>
            <Group mt="xl">
              <Button variant="outline" color="red" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="outline"
                color="green"
                onClick={() => console.log("Add Patient")}
              >
                {/* onclick แล้วเพิ่มไปที่Favorite */}
                Add Patient
              </Button>
            </Group>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchPatient;

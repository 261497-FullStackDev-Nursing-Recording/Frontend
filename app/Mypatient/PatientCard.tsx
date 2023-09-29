import React, { useState } from "react";
import { Card } from "@mantine/core";
import { Modal, Button, Group, Text } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import { Patient } from "../../types/patient";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
// import { useNavigate } from "react-router-dom";

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

const PatientCard: React.FC<SearchPatientProps> = ({ apiData }) => {
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
    // You can navigate to the PatientHistory component with the identificationId
    // For now, let's just log it
    // navigate(`/patientHistory/${identificationId}`);
    console.log("Navigating to PatientHistory with ID:", identificationId);
  };

  return (
    <div>
      {apiData.map((item, index) => (
        <Card
          className="w-4/5 min-h-[90px] flex flex-row justify-between bg-[#b2f5ea] font-semibold mb-[15px] mx-[10%] py-[10px] pl-[30px] pr-[10px] rounded-[10px] text-[#319795]"
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
                  pathname: `/MypatientHistory`,
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
              <DeleteOutlineIcon
                sx={{ fontSize: "30px" }}
                style={{ color: "#319795" }}
              />
            </Button>
          </div>
        </Card>
      ))}
      <Modal
        opened={opened}
        onClose={closeModal}
        size="lg"
        title="ข้อมูลผู้ป่วย"
        className="items-center"
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
                Delete
              </Button>
            </Group>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientCard;

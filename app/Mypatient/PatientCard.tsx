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
    <div className="card_container">
      {apiData.map((item, index) => (
        <Card className="patient-card" key={index}>
          <div
            className="my-auto patient-info"
            onClick={() => goToPatientHistory(item.id)}
          >
            <div>
              <div
                className="status-dot"
                style={{ backgroundColor: getStatusColor(item.status) }}
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
                className="add-button"
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

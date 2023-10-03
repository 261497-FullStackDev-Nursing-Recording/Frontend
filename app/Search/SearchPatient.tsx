import React, { useState } from "react";
import { Card } from "@mantine/core";
import { Modal, Button, Group, Text, Center } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import { Patient } from "../../types/patient";
import Link from "next/link";
import "./styles.css";
import { useCurrentNurseLogin } from "../../query/nurse";
import Spinner from "../../component/spinner";

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

  const userQuery =  useCurrentNurseLogin();
  // console.log(userQuery.data);
  if(userQuery.isLoading) return <Spinner/>
  console.log(userQuery.data?.id);
  
  

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
                  pathname: `/PatientHistory`,
                  query: { id: item.id },
                }}
              >
                {item.f_name} {item.l_name}
                <div>AN: {item.an}</div>
                <div>Bed: {item.current_bed_number}</div>
              </Link>
            </div>
          </div>
          <div className="my-auto">
            <Button onClick={() => handleCardClick(item)} variant="text">
              <AddIcon sx={{ fontSize: "45px" }} className="add-button" />
            </Button>
          </div>
        </Card>
      ))}
      <Modal
        opened={opened}
        onClose={closeModal}
        size="sm"
        title="ข้อมูลผู้ป่วย"
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
                onClick={() => console.log("Add Patient") }
              >
               
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

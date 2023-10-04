import React, { useState } from "react";
import { Card } from "@mantine/core";
import { Modal, Button, Group, Text, Center } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { Patient } from "../../types/patient";
import Link from "next/link";
import "./styles.css";
import { useCurrentNurseLogin } from "../../query/nurse";
import { useQueryLinkedPatients } from "../../query/patient";
import Spinner from "../../component/spinner";
import axios from "axios";

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

function apiRequest(
  url: string,
  payload: object,
  callback: (response: any) => void
) {
  axios
    .post<any>(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(callback)
    .catch((error) => {
      console.error("API Error for ID:", error);
    });
}

const SearchPatient: React.FC<SearchPatientProps> = ({ apiData }) => {
  const [opened, setOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Patient | null>(null);

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

  const userQuery = useCurrentNurseLogin();
  console.log(userQuery.data?.id);

  const nurse_id: any = userQuery?.data?.id;

  const lp = useQueryLinkedPatients(nurse_id);
  if (userQuery.isLoading || lp.isLoading) return <Spinner />;

  const isPatientInLinkedPatients = (patient: Patient) => {
    return lp.data?.some((linkedPatient) => linkedPatient.id === patient.id);
  };

  const handleClickAddPatient = () => {
    if (!selectedCard) {
      console.error("No patient selected");
      closeModal();
      return;
    }
    console.log("Adding Patient...");
    apiRequest(
      "http://localhost:5001/api/patient/linkPatients",
      {
        user_id: userQuery.data?.id,
        patient_id: selectedCard.id,
      },
      (response) => {
        console.log("Response data:", response.data);
        closeModal();
      }
    );
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
            {isPatientInLinkedPatients(item) ? (
              <CheckIcon
                sx={{ fontSize: "40px", marginRight: "15px" }}
                className="add-button"
              />
            ) : (
              <Button onClick={() => handleCardClick(item)} variant="text">
                <AddIcon sx={{ fontSize: "45px" }} className="add-button" />
              </Button>
            )}
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
            <Text>PTID: {selectedCard.id}</Text>
            <Text>User: {userQuery.data?.id}</Text>
            <Group mt="xl">
              <Button variant="outline" color="red" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="outline"
                color="green"
                onClick={handleClickAddPatient}
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

import React, { useState } from "react";
import { Card } from "@mantine/core";
import { useCounter } from "@mantine/hooks";
import { Modal, Button, Group, Text, Badge } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import PatientHistory from "../PatientHistory/patientHistory";
import { Link } from "react-router-dom";

interface SearchResult {
    f_name: string;
    l_name: string;
    identification_id: string;
    id: string;
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
            return "#000000";
    }
};

const SearchPatient: React.FC<SearchPatientProps> = ({ apiData }) => {
    const [opened, setOpened] = useState(false);
    const [selectedCard, setSelectedCard] = useState<SearchResult | null>(null);

    const handleCardClick = (item: SearchResult) => {
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
        console.log("Navigating to PatientHistory with ID:", identificationId);
    };

    return (
        <div>
            {apiData.map((item, index) => (
                <Card
                    className="w-4/5 flex flex-row justify-between bg-[#BFDBFE] font-semibold mb-[15px] mx-[10%] pl-[30px] pr-[0px] rounded-[10px] text-[#2563EB]"
                    key={index}
                    onClick={() => goToPatientHistory(item.id)} //
                >
                    <div className="PText">
                        <div className="mt-[8px]">
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
                        </div>
                    </div>
                    <div className="py-[10px]">
                        <Button onClick={() => handleCardClick(item)}>
                            <AddIcon sx={{ fontSize: "45px" }} style={{ color: "#2563EB" }} />
                        </Button>
                    </div>
                </Card>
            ))}
            <Modal
                opened={opened}
                onClose={closeModal}
                size="lg"
                title="ข้อมูลผู้ป่วย"
            >
                {selectedCard && (
                    <div>
                        <Text>Name: {selectedCard.f_name} {selectedCard.l_name}</Text>
                        <Text>ID: {selectedCard.identification_id}</Text>
                        <Group mt="xl">
                            <Button variant="outline" color="red" onClick={closeModal}>
                                Cancel
                            </Button>
                            <Button variant="outline" color="green" onClick={() => console.log("Add Patient")}> 
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

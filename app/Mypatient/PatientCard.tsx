import React, { useState } from "react";
import { Card } from "@mantine/core";
import { Modal, Button, Group, Text } from "@mantine/core";
import AddIcon from "@mui/icons-material/Add";
import { Patient } from "../../types/patient";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
import axios from "axios";
import { useCurrentNurseLogin } from "../../query/nurse";
import { useMutationUpdateLinkedPatients } from "../../query/patient";
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

const PatientCard: React.FC<SearchPatientProps> = ({ apiData }) => {
	const [opened, setOpened] = useState(false);
	const [selectedCard, setSelectedCard] = useState<Patient | null>(null);
	const userQuery = useCurrentNurseLogin();
	const nurse_id: any = userQuery?.data?.id;
	const deleteP = useMutationUpdateLinkedPatients(nurse_id);
	const handleCardClick = (item: Patient) => {
		setSelectedCard(item);
		setOpened(true);
	};

	const closeModal = () => {
		setSelectedCard(null);
		setOpened(false);
	};

	// const goToPatientHistory = (identificationId: string) => {
	// 	console.log("Navigating to PatientHistory with ID:", identificationId);
	// };

	const handleClickDeletePatient = () => {
		if (!selectedCard || !userQuery.data?.id) {
			console.error("No patient or user selected");
			closeModal();
			return;
		}
		const patient_id = selectedCard.id;
		console.log("Deleting Patient...");
		try {
			deleteP.mutateAsync([patient_id]);
			window.location.reload();
		} catch (error) {
			console.error("Error deleting patients:", error);
			closeModal();
		}
	};
	if (userQuery.isLoading) return <Spinner />;

	return (
		<div className="flex flex-wrap justify-center">
			{apiData.map((item, index) => (
				<Card
					className="flex flex-row min-w-[331.2px] md:w-7/20 lg:w-1/4 min-h-[90px] justify-between bg-[#b2f5ea] font-[bold] text-[#319795] mx-[10px] mb-[15px] pl-[30px] pr-0 rounded-[10px]"
					key={index}
				>
					<div
						className="my-auto patient-info"
						// onClick={() => goToPatientHistory(item.id)}
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
								<div>AN: {item.an}</div>
								<div>Bed: {item.current_bed_number}</div>
							</Link>
						</div>
					</div>
					<div className="my-auto">
						<Button onClick={() => handleCardClick(item)} variant="text">
							<DeleteOutlineIcon sx={{ fontSize: "30px", color: "#319795" }} />
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
						<Text>AN: {selectedCard.an}</Text>
						<Text>Bed: {selectedCard.current_bed_number}</Text>
						<Group mt="xl">
							<Button variant="outline" color="red" onClick={closeModal}>
								Cancel
							</Button>
							<Button
								variant="outline"
								color="green"
								onClick={handleClickDeletePatient}
							>
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

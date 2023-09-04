"use client";
import Login from "./Login/LoginPage";
import Chart from "../Component/DonughnutChart";
import Dashboard from "./Dashboard/DashboardPage";
import Inform from "./Inform/InformPage";
import Add from "./Search/SearchPage";
import UserList from "./Dashboard/DataNurse";
// import spinner from "../Component/spinner";
import { Loader } from "@mantine/core";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default function Home() {
	const queryclient = new QueryClient();
	return (
		<div>
			<Login />
			{/* <Dashboard /> */}
			{/* <Inform/> */}
			{/* <Chart /> */}
			{/* <Dashboard /> */}
			{/* <Inform /> */}
			{/* <Add /> */}
			{/* <UserList/> */}
			{/* <Loader color="green" /> */}
			
		</div>
	);
}

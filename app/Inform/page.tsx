"use client";
import TabView from "../../component/Form/tabview";
import Navbar from "../../component/Navbarbottom";
import SForm from "../../component/Form/sForm";
import EForm from "../../component/Form/eForm";
import IForm from "../../component/Form/iForm";
import OForm from "../../component/Form/oForm";
import NDXForm from "../../component/Form/ndxForm";
import "./styles.css";
import { Tabs } from "@mantine/core";
import { useCurrentNurseLogin } from "../../query/nurse";
import Backbtn from "../../component/backBtn";
export default function Inform() {
	const user = useCurrentNurseLogin()?.id;
	console.log(user);

	return (
		<div className="inform-container">
			<Backbtn/>
			<div className="patientheaddata">
			
				<div className="top">Name</div>
				<div className="Name">Name</div>
				<div className="top">Identification ID</div>
				<div className="ID">ID</div>
			</div>
			<Tabs defaultValue="first" variant="pills" >
				<Tabs.List style={{ display: "flex", justifyContent: "space-between" }} className="tabs">
					<Tabs.Tab value="first" color="teal">
						NDX Field
					</Tabs.Tab>
					<Tabs.Tab value="second" color="pink">
						S Field
					</Tabs.Tab>
					<Tabs.Tab value="third">
						O Field
					</Tabs.Tab>
					<Tabs.Tab value="fourth" color="grape">I Field</Tabs.Tab>
					<Tabs.Tab value="fifth" color="lime">
						E Field
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="first" pt="xs">
					<NDXForm />
				</Tabs.Panel>

				<Tabs.Panel value="second" pt="xs">
					<SForm />
				</Tabs.Panel>

				<Tabs.Panel value="third" pt="xs">
					<OForm />
				</Tabs.Panel>

				<Tabs.Panel value="fourth" pt="xs">
					<IForm />
				</Tabs.Panel>

				<Tabs.Panel value="fifth" pt="xs">
					<EForm />
				</Tabs.Panel>
			</Tabs>

			<Navbar />
		</div>
	);
}

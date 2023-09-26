"use client";
import TabView from "../../component/Form/tabview";
import Navbar from "../../component/Navbarbottom";
import SForm from "../../component/Form/sForm";
import DynamicForm from "../../component/Form/sForm";
import EForm from "../../component/Form/eForm";
import IForm from "../../component/Form/iForm";
import OForm from "../../component/Form/oForm";
import NDXForm from "../../component/Form/ndxForm";
import { Tabs } from '@mantine/core';


import "./styles.css";
export default function Inform() {
  return (
  <div className="test">
  <Tabs variant="pills" defaultValue="NDX" inverted>
  <Tabs.List>
    <Tabs.Tab value="NDX">NDX</Tabs.Tab>
    <Tabs.Tab value="S">S Field</Tabs.Tab>
    <Tabs.Tab value="O">O Field</Tabs.Tab>
    <Tabs.Tab value="I">I Field</Tabs.Tab>
    <Tabs.Tab value="E">E Field</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel value="NDX" pb="xs"><NDXForm/></Tabs.Panel>
  <Tabs.Panel value="S" pb="xs"><DynamicForm/></Tabs.Panel>
  <Tabs.Panel value="O" pb="xs"><OForm/></Tabs.Panel>
  <Tabs.Panel value="I" pb="xs"><IForm/></Tabs.Panel>
  <Tabs.Panel value="E" pb="xs"><EForm/></Tabs.Panel>
</Tabs>
<Navbar/>
  </div>
  
  );
}

"use client";

import Form from "../../component/form2";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../component/Form/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../component/Form/ui/tabs"
import { FC } from "react";

const FormPage: FC = () => {
  return (
    <div className="container mx-auto mt-4">
      <Tabs defaultValue="o_type" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="ndx_type">กรอกข้อมูล NDx</TabsTrigger>
          <TabsTrigger value="I">กรอกข้อมูล I</TabsTrigger> 
          <TabsTrigger value="o_type">กรอกข้อมูล O</TabsTrigger>
          <TabsTrigger value="s_type">กรอกข้อมูล S</TabsTrigger>
          <TabsTrigger value="E">กรอกข้อมูล E</TabsTrigger>
        </TabsList>
        <TabsContent value="o_type">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>กรอกข้อมูล O</CardTitle>
            </CardHeader>
            <CardContent>
              <Form formType="O" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="s_type">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>กรอกข้อมูล S</CardTitle>
            </CardHeader>
            <CardContent>
              <Form formType="S" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ndx_type">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>กรอกข้อมูล NDx</CardTitle>
            </CardHeader>
            <CardContent>
              <Form formType="NDX" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="e_type">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>กรอกข้อมูล E</CardTitle>
            </CardHeader>
            <CardContent>
              <Form formType="E" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="i_type">
          <Card className="w-fit">
            <CardHeader>
              <CardTitle>กรอกข้อมูล I</CardTitle>
            </CardHeader>
            <CardContent>
              <Form formType="I" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormPage;

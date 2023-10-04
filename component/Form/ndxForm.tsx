import React, { useState } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import "./formlayout.css";
import "react-datepicker/dist/react-datepicker.css";
import { Select } from "@mantine/core";
import { useCurrentNurseLogin } from "../../query/nurse";
import Spinner from "../spinner";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Record } from "../../types/record";

type FormValues = {
  NDXdata: {
    type: string;
    // name: string;
    text: string;
  }[];
};

export default function NDXForm() {
  
  const searchParams = useSearchParams();
  const patientId = searchParams.get("id");

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      NDXdata: [{ type: "select" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "NDXdata",
    control,
  });

  const selectedTypes = useWatch({
    name: "NDXdata",
    control,
  });

  const handleTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedType = e.target.value;
    setValue(`NDXdata.${index}.type`, selectedType as any);
    setIsTypeSelected((prevIsTypeSelected) => {
      const updatedIsTypeSelected = [...prevIsTypeSelected];
      updatedIsTypeSelected[index] = selectedType !== "select";
      return updatedIsTypeSelected;
    });
  };

  const [isTypeSelected, setIsTypeSelected] = useState<boolean[]>([false]);

  const handleDelete = (index: number) => {
    remove(index);

    setIsTypeSelected((prevIsTypeSelected) => {
      const updatedIsTypeSelected = [...prevIsTypeSelected];
      updatedIsTypeSelected.splice(index, 1);
      return updatedIsTypeSelected;
    });
  };

  const handleAdd = () => {
    // Initialize the state for the new field
    setIsTypeSelected((prevIsTypeSelected) => [...prevIsTypeSelected, false]);

    if (selectedTypes.every((item) => item.type !== "select")) {
      append({ type: "select", text: "" });
    } else {
      append({ type: "", text: "" });
    }
  };

  const renderFormFields = (selectedType: string, index: number) => {
    switch (selectedType) {
      case "ข้อวินิจฉัย":
        return (
          <label>
            <Select
              {...register(`NDXdata.${index}.text`)}
              className="sectiongap"
              data={[
                "แบบแผนการหายใจไม่มีประสิทธิภาพ",
                "เสี่ยงต่อการเกิดท่อช่วยหายใจเลื่อนหลุด",
                "มีภาวะไม่สมดุลสารน้ำและเกลือแร่",
              ]}
              placeholder="เลือกข้อวินิจฉัย"
              onChange={(value) => {
                setValue(`NDXdata.${index}.text`, value || "");
              }}
            />
          </label>
        );
      case "ข้อมูลสนับสนุน":
        return (
          <label>
            <section className="sectiongap">
              <textarea
                className="textarearesize"
                {...register(`NDXdata.${index}.text`)}
                placeholder="กรอกข้อมูลสนับสนุน"
              />
            </section>
          </label>
        );
      default:
        return null;
    }
  };

  
  const userQuery = useCurrentNurseLogin();
  if (userQuery.isLoading) return <Spinner />;

  const handleFormSubmit = async (data: FormValues) => {
    console.log("Submit data", data.NDXdata);
    const userId = userQuery.data?.id;
    const requestRecordBody = {
      user_id: userId,
      patient_id: patientId,
    };
    const record = await axios.post<Record>(
      "http://localhost:5001/api/records",
      requestRecordBody
    );
    const recordId = record.data.id;
    const requestFieldsBody = data.NDXdata.map(NDXdata => {
      return {
        record_id: recordId,
        field_type: "NDX_TEXT",
        field_data: NDXdata.text,
        field_pre_label: NDXdata.type
      }
    })
    await axios.post(
      "http://localhost:5001/api/fields",
      requestFieldsBody
    );
    window.location.reload();
  };

  return (
    <div>
      <div className="Headform">NDX ข้อวินิจฉัย</div>

      {fields.map((item, index) => (
        <div key={item.id} className="NDXformcontainer">
          <select
            value={item.type}
            onChange={(e) => handleTypeChange(e, index)}
            className="select"
            disabled={isTypeSelected[index]}
          >
            <option value="select">ตัวเลือก</option>
            <option value="ข้อวินิจฉัย">ข้อวินิจฉัย</option>
            <option value="ข้อมูลสนับสนุน">ข้อมูลสนับสนุน</option>
          </select>
          <div onClick={() => handleDelete(index)} className="deletebutton">
            Delete
          </div>
          <label>
            <section>{renderFormFields(selectedTypes[index]?.type, index)}</section>
          </label>
        </div>
      ))}
      <div className="btncontainer">
        <div onClick={handleAdd} className="addbutton">
          {selectedTypes.every((item) => item.type !== "select") ? "Add" : "Add"}
        </div>
        <div onClick={() => handleFormSubmit({ NDXdata: fields })} className="submitbtn">
          Submit
        </div>
      </div>
    </div>
  );
}

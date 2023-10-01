import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import "./formlayout.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Select } from '@mantine/core';

type FormValues = {
  NDXdata: {
    type: string;
    name: string;
    date: string;
    text: string;

  }[];
};

export default function NDXForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      NDXdata: [{ type: "select", name: "", date: "" }],
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

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedType = e.target.value;

    setValue(`NDXdata.${index}.type`, selectedType as any); // Use type casting to resolve the error
  };
  
  const renderFormFields = (selectedType: string, index: number) => {
    switch (selectedType) {
      case 'item1':
        return (
          <label>
            <Select
              {...register(`NDXdata.${index}.name`)}
              className="sectiongap"
              data={[
                'แบบแผนการหายใจไม่มีประสิทธิภาพ',
                'เสี่ยงต่อการเกิดท่อช่วยหายใจเลื่อนหลุด',
                'มีภาวะไม่สมดุลสารน้ำและเกลือแร่',
              ]}
              placeholder="Pick value"
              onChange={(value) => {
                // Handle the value change here
                setValue(`NDXdata.${index}.name`, value || ''); // Ensure value is not null
              }}
            />
          </label>
        );
      case 'item2':
        // Render form fields for item3
        return (
          <label>
            <section className="sectiongap">
              <textarea className="textarearesize" {...register(`NDXdata.${index}.text`)} />
            </section>
          </label>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Submit data", data);
        })}
      >
        <h1 className="Headform">NDX ข้อวินิจฉัย</h1>

        {fields.map((item, index) => (
          <div key={item.id} className="NDXformcontainer">
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(e, index)}
              className="select"
            >
              <option value="select">ตัวเลือก</option>
              <option value="item1">ข้อวินิจฉัย</option>
              <option value="item2">ข้อมูลสนับสนุน</option>
            </select>
            <button type="button" onClick={() => remove(index)} className="deletebutton">
              Delete
            </button>
            <label>
              <section>
                {renderFormFields(selectedTypes[index]?.type, index)}
              </section>
            </label>
          </div>
        ))}
        <div className="btncontainer">
          <button
            type="button"
            onClick={() => {
              if (selectedTypes.every((item) => item.type !== "select")) {
                append({ type: "select", name: "", date: "", text: "" });
              } else {
                append({ type: "", name: "", date: "", text: "" });
              }
            }}
            className="addbutton"
          >
            {selectedTypes.every((item) => item.type !== "select")
              ? "Add"
              : "Add"}
          </button>
          <button type="submit" className="submitbtn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
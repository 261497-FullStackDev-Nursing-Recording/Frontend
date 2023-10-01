import React,{useState} from "react";
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
      NDXdata: [{ type: "select", name: "" }],
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
      append({ type: "select", name: "", text: "" });
    } else {
      append({ type: "", name: "", text: "" });
    }
  };

  const renderFormFields = (selectedType: string, index: number) => {
    switch (selectedType) {
      case 'ข้อวินิจฉัย':
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
              placeholder="เลือกข้อวินิจฉัย"
              onChange={(value) => {
                setValue(`NDXdata.${index}.name`, value || '');
              }}
            />
          </label>
        );
      case 'ข้อมูลสนับสนุน':
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
          console.log("Submit data", data.NDXdata);
        })}
      >
        <h1 className="Headform">NDX ข้อวินิจฉัย</h1>

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
            <button type="button" onClick={() => handleDelete(index)} className="deletebutton">
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
            onClick={handleAdd}
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
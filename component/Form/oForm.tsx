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
  Odata: {
    type: string;
    name: string;
    text: string;
  }[];
};

export default function OForm() {
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
      Odata: [{ type: "select", name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "Odata",
    control,
  });

  const selectedTypes = useWatch({
    name: "Odata",
    control,
  });

  const handleTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedType = e.target.value;
    setValue(`Odata.${index}.type`, selectedType as any);
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
      case 'การวางแผนการพยาบาล':
        return (
          <label>
            <Select
              {...register(`Odata.${index}.name`)}
              className="sectiongap"
              data={[
                'VENTILATOR CARE',
                'AIRWAY CARE',
                'รักษาพยาธิสภาพตามโรค',
                'ผู้ป่วยได้รับสารน้ำและอาหารให้เพียงพอ',
                'ผู้ป่วยไม่เกิดภาวะปอดอักเสบ',
                'ผู้ป่วยไม่เกิดภาวะpneumothrorax',
                'ผู้ป่วยและญาติคลายความวิตกกังวล',
                'ผู้ป่วยได้รับการดูแลด้านสุขวิทยาส่วนบุคคล',
                'ผู้ป่วยสามารถหย่าเครื่องช่วยหายใจได้สำเร็จ',
              ]}
              placeholder="เลือกการวางแผนการพยาบาล"
              onChange={(value) => {
                setValue(`Odata.${index}.name`, value || '');
              }}
            />
          </label>
        );
      case 'ข้อมูลสนับสนุน':
        return (
          <label>
            <section className="sectiongap">
              <textarea className="textarearesize" {...register(`Odata.${index}.text`)} placeholder="กรอกข้อมูลสนับสนุน" />
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
    console.log("Submit data", data.Odata);
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
    const requestFieldsBody = data.Odata.map(Odata => {
      return {
        record_id: recordId,
        field_type: "O_TEXT",
        field_data: Odata.text,
        field_pre_label: Odata.type
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
      <div className="Headform">O การวางแผนการพยาบาล</div>

      {fields.map((item, index) => (
        <div key={item.id} className="Oformcontainer">
          <select
            value={item.type}
            onChange={(e) => handleTypeChange(e, index)}
            className="select"
            disabled={isTypeSelected[index]}
          >
            <option value="select">ตัวเลือก</option>
            <option value="การวางแผนการพยาบาล">การวางแผนการพยาบาล</option>
            <option value="ข้อมูลสนับสนุน">ข้อมูลสนับสนุน</option>
          </select>
          <div onClick={() => handleDelete(index)} className="deletebutton">
            Delete
          </div>
          <label>
            <section>
              {renderFormFields(selectedTypes[index]?.type, index)}
            </section>
          </label>
        </div>
      ))}
      <div className="btncontainer">
        <div
          onClick={handleAdd}
          className="addbutton"
        >
          {selectedTypes.every((item) => item.type !== "select")
            ? "Add"
            : "Add"}
        </div>
        <div onClick={() => handleFormSubmit({ Odata: fields })} className="submitbtn">
          Submit
        </div>
      </div>
    </div>
  );
}

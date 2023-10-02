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
  Edata: {
    type: string;
    name: string;
    text: string;

  }[];
};

export default function EForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      Edata: [{ type: "select", name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "Edata",
    control,
  });

  const selectedTypes = useWatch({
    name: "Edata",
    control,
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedType = e.target.value;
    setValue(`Edata.${index}.type`, selectedType as any);
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
      case 'O2 Saturation':
        return (
          <label>
                <section className="sectiongap">
                  <div className="gapInput">O2 Saturationอยู่ระหว่าง</div>
                  <input
                    {...register(`Edata.${index}.name`)}
                    placeholder={`กรอกค่า`}
                  />
                  <span className="gapInput"> %</span>
                  
                </section>
               
              </label>
        );
      case 'ก๊าซในเลือดแดงมีค่าปกติ PaO2':
        return (
          <label>
                <section className="sectiongap">
                  <div className="gapInput">ก๊าซในเลือดแดงมีค่า PaO2</div>
                  <input
                    {...register(`Edata.${index}.name`)}
                    placeholder={`กรอกค่า`}
                  />
                  <span className="gapInput"> mgHg</span>
                  
                </section>
               
              </label>
        );


        case 'ก๊าซในเลือดแดงมีค่าปกติ PaCO2':
          return (
            <label>
                  <section className="sectiongap">
                    <div className="gapInput">ก๊าซในเลือดแดงมีค่า PaCO2</div>
                    <input
                      {...register(`Edata.${index}.name`)}
                      placeholder={`กรอกค่า`}
                    />
                    <span className="gapInput"> mmHg</span>
                    
                  </section>
                 
                </label>
          );


          case 'เลือกผลของการรักษา':
        return (
          <label>
            <Select
              {...register(`Edata.${index}.name`)}
              className="sectiongap"
              data={[
                'สัญญาณชีพอยู่ในเกณฑ์ ปกติ',
                'สัญญาณชีพอยู่ในเกณฑ์ ไม่ปกติ',
                'ไม่มีภาวะพร่องออกซิเจน',
                'ไม่เกิดท่อช่วยหายใจเลื่อนหลุด',
                'ไม่เกิดการบาดเจ็บจากการผูกมัด',
                'I/O balance',
                'ไม่มีภาวะทุพโภชนาการ',
                'Electrolyte,Albumin อยู่ในเกณฑ์ ปกติ',
                'Electrolyte,Albumin อยู่ในเกณฑ์ ไม่ปกติ',
                'ไม่เกิดปอดอักเสบจากการใช้เครื่องช่วยหายใจ',
                'ไม่เกิดภาวะ pneumothrorax',
                'ผู้ป่วยและญาติทุเลาจากความวิตกกังวล',
                'ผู้ป่วยมีสีหน้าสดชื่น นอนหลับพักผ่อนได้',
                'ผู้ป่วยสามารถสื่อสารความต้องการได้',
                'ไม่เกิดการใส่ท่อช่วยหายใจใหม่ภายใน 48 ชม.',

              ]}
              placeholder="เลือกผลการประเมิน"
              onChange={(value) => {
                setValue(`Edata.${index}.name`, value || '');
              }}
            />
          </label>
        );



        case 'ข้อมูลเพิ่มเติม':
          return (
            <label>
              <section className="sectiongap">
                <textarea className="textarearesize" {...register(`Edata.${index}.text`)} placeholder="กรอกข้อมูลเพิ่มเติม" />
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
          console.log("Submit data", data.Edata);
        })}
      >
        <h1 className="Headform">E การประเมินผล</h1>

        {fields.map((item, index) => (
          <div key={item.id} className="Eformcontainer">
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(e, index)}
              className="select"
              disabled={isTypeSelected[index]}
            >
              <option value="select">ตัวเลือก</option>
              <option value="O2 Saturation">O2 Saturation</option>
              <option value="ก๊าซในเลือดแดงมีค่าปกติ PaO2">ก๊าซในเลือดแดงมีค่าปกติ PaO2</option>
              <option value="ก๊าซในเลือดแดงมีค่าปกติ PaCO2">ก๊าซในเลือดแดงมีค่าปกติ PaCO2</option>
              <option value="เลือกผลของการรักษา">เลือกผลของการรักษา</option>
              <option value="ข้อมูลเพิ่มเติม">ข้อมูลเพิ่มเติม</option>
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
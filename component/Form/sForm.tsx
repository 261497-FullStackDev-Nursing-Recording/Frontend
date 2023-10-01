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
  Sdata: {
    type: string;
    name: string;
    text: string;
    date: string;
  }[];
};

export default function SForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      Sdata: [{ type: "select", name: "" , date: ""}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "Sdata",
    control,
  });

  const selectedTypes = useWatch({
    name: "Sdata",
    control,
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedType = e.target.value;
    setValue(`Sdata.${index}.type`, selectedType as any);
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
      append({ type: "select", name: "", text: "",date: "" });
    } else {
      append({ type: "", name: "", text: "" ,date: ""});
    }
  };

  const renderFormFields = (selectedType: string, index: number) => {
    switch (selectedType) {
      case 'โรคประจำตัว':
        return (
          
          <label>
          <section className="sectiongap">
            <input  {...register(`Sdata.${index}.name`) } placeholder={`กรอกโรคประจำตัว`}/>
            
          </section>
        </label>
          
        );
      case 'อาการของผู้ป่วย':
        return (
          <label>
            <section className="sectiongap">
              <textarea className="textarearesize" {...register(`Sdata.${index}.text`)}  placeholder={`กรอกอาการของผู้ป่วย`} />
            </section>
          </label>
        );


        case 'DTX':
          return (
            <label>
                <section className="sectiongap">
                  <div className="gapInput">DTX</div>
                  <input
                    {...register(`Sdata.${index}.name`)}
                    placeholder={`กรอกค่า`}
                  />
                  <span className="gapInput"> mg%</span>
                </section>
                <div className="gapInput">เลือกวันที่</div>
                <input
                  {...register(`Sdata.${index}.date`)}
                  placeholder={`วัน/เดือน/ปี`}
                />
                 {/* <DatePicker
                  selected={new Date()} // Set the default value to today
                  onChange={(date) => {
  
                  }}
                  dateFormat="dd/MM/yyyy" 
                /> */}
                
              </label>  
          );

          case 'Ketone':
            return (
              <>
                <label>
                  <section className="sectiongap">
                    <div className="gapInput">Ketone</div>
                    <input
                      {...register(`Sdata.${index}.name`)}
                      placeholder={`กรอกค่า`}
                    />
                    <span className="gapInput"> mmol/L</span>
                  </section>
                  <div className="gapInput">เลือกวันที่</div>
                    <input
                  {...register(`Sdata.${index}.date`)}
                  placeholder={`วัน/เดือน/ปี`}
                />
                  {/* <DatePicker
                    selected={new Date()} // Set the default value to today
                    onChange={(date) => {
    
                    }}
                    dateFormat="dd/MM/yyyy" // Specify the date format
                  /> */}
                </label>
              </>
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
        <h1 className="Headform">S อาการของผู้ป่วย</h1>

        {fields.map((item, index) => (
          <div key={item.id} className="Sformcontainer">
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(e, index)}
              className="select"
              disabled={isTypeSelected[index]}
            >
              <option value="select">ตัวเลือก</option>
              <option value="โรคประจำตัว">โรคประจำตัว</option>
              <option value="อาการของผู้ป่วย">อาการของผู้ป่วย</option>
              <option value="DTX">DTX</option>
              <option value="Ketone">Ketone</option>
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
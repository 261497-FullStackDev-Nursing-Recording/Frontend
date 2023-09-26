import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import "./formlayout.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type FormValues = {
  Odata: {
    type: string;
    name: string;
    date: string;
    text: string;

  }[];
};

export default function OForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      Odata: [{ type: "select", name: "", date: "" }],
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

  // Function to handle the selection change in the dropdown
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedType = e.target.value;

    // Update the selected type for the specific item in the cart array
    setValue(`Odata.${index}.type`, selectedType as any); // Use type casting to resolve the error
  };

  // Function to render the form fields based on the selected type
  const renderFormFields = (selectedType: string, index: number) => {
    switch (selectedType) {
      case "item1":
        return (
         
          <><label>
            <section className="sectiongap">
            <select {...register(`Odata.${index}.name`)}>
           
          <option value="op1">VENTILATOR CARE</option>
          <option value="op2">AIRWAY CARE</option>
          <option value="op3">รักษาพยาธิสภาพตามโรค</option>
          <option value="op4">ป้องกันการเกิดท่อช่วยหายใจเลื่อนหลุด</option>
          <option value="op5">ผู้ป่วยได้รับสารน้ำและอาหารให้เพียงพอ</option>
          <option value="op6">ผู้ป่วยไม่เกิดภาวะปอดอักเสบ</option>
          <option value="op7">ผู้ป่วยไม่เกิดภาวะpneumothrorax</option>
          <option value="op8">ผู้ป่วยและญาติคลายความวิตกกังวล</option>
          <option value="op9">ผู้ป่วยได้รับการดูแลด้านสุขวิทยาส่วนบุคคล</option>
          <option value="op10">ผู้ป่วยและญาติคลายความวิตกกังวล</option>
          <option value="op11">ผู้ป่วยสามารถหย่าเครื่องช่วยหายใจได้สำเร็จ</option>
        </select>
           </section>
            </label>
          </>
        );
        case "item2":
          // Render form fields for item3
          return (
  
            <>
             <label>
              <section className="sectiongap" >
           
              <textarea className="textarearesize"
                {...register(`Odata.${index}.text`)}
                placeholder={`กรอกข้อมูล`}
              />
  
            </section>
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
        <h1 className="Headform">O การวางแผนการพยาบาล</h1>

        {fields.map((item, index) => (
          <div key={item.id} className="Oformcontainer" >
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(e, index)}
              className="select"
            >
              <option value="select">ตัวเลือก</option>
              <option value="item1">การวางแผนการพยาบาล</option>
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
              // Check the selected option to determine whether to add a dropdown or a form
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
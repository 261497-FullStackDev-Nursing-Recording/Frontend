import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import "./formlayout.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
      NDXdata: [{ type: "select", name: "", date:"" }],
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

  // Function to handle the selection change in the dropdown
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedType = e.target.value;

    // Update the selected type for the specific item in the cart array
    setValue(`NDXdata.${index}.type`, selectedType as any); // Use type casting to resolve the error
  };

  // Function to render the form fields based on the selected type
  const renderFormFields = (selectedType: string, index: number) => {
    switch (selectedType) {
      case "item1":
        return (
         
          <><label>
            <select {...register(`NDXdata.${index}.name`)} className="sectiongap">
            <option value="option1">แบบแผนการหายใจไม่มีประสิทธิภาพ</option>
            <option value="option2">เสี่ยงต่อการเกิดท่อช่วยหายใจเลื่อนหลุด
</option>
            <option value="option3">มีภาวะไม่สมดุลสารน้ำและเกลือแร่</option>
          </select>
            </label>
          </>
        );
        case "item2":
          // Render form fields for item3
          return (
  
            <>
             <label>
              <section className="sectiongap">
            
              <textarea className="textarearesize"
                {...register(`NDXdata.${index}.text`)}
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
              append({ type: "select", name: "", date: "" ,text: ""});
            } else {
              append({ type: "", name: "", date:"" , text: ""});
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
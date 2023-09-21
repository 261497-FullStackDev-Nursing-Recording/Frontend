import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import "./formlayout.css";

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
      Odata: [{ type: "select", name: "", date:"" }],
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
            <section>
            <span>โรคประจำตัว</span>
            <input
              {...register(`Odata.${index}.name`)}
              placeholder={`กรอกโรคประจำตัว`}
            />
           </section>
            </label>
          </>
        );
      case "item2":
        // Render form fields for item2
        return (
          <>
          <label>
            <section>
          <span>DTX</span>
            <input
              {...register(`Odata.${index}.name`)}
              placeholder={`กรอกค่า`}
            />
            <span>mg%</span>
         <input
              {...register(`Odata.${index}.date`)}
              placeholder={`วัน/เดือน/ปี`}
            />
            </section>
            </label>
          </>
        );
      case "item3":
        // Render form fields for item3
        return (
          <>
          <label>
            <section>
           <span>Ketone</span>
            <input
              {...register(`Odata.${index}.name`)}
              placeholder={`กรอกค่า`}
            />
            <span>mmol/L</span>
         <input
              {...register(`Odata.${index}.date`)}
              placeholder={`วัน/เดือน/ปี`}
            />
           </section>
            </label>
          </>
          
        );


        case "item4":
        // Render form fields for item3
        return (

          <>
           <label>
            <section>
            <span>ข้อมูลสนับสนุน</span>
            <textarea
              {...register(`Odata.${index}.text`)}
              placeholder={`กรอก`}
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
        <h1 className="Headform">O <span className="Headtext">ข้อมูลจากผู้ป่วย</span></h1>
       
        {fields.map((item, index) => (
          <div key={item.id} className="Obody">
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(e, index)}
              className="select"
            >
              <option value="select">ตัวเลือก</option>
              <option value="item1">โรคประจำตัว</option>
              <option value="item2">DTX</option>
              <option value="item3">Ketone</option>
              <option value="item4">ข้อมูลสนับสนุน</option>
            </select>
            <label>
              <section>
            {renderFormFields(selectedTypes[index]?.type, index)}
            
            <button type="button" onClick={() => remove(index)}>
              -
            </button>
            </section>
            </label>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            // Check the selected option to determine whether to add a dropdown or a form
            if (selectedTypes.every((item) => item.type !== "select")) {
              append({ type: "select", name: "", date: "" ,text: ""});
            } else {
              append({ type: "", name: "", date:"" , text: ""});
            }
          }}
        >
          {selectedTypes.every((item) => item.type !== "select")
            ? "Add"
            : "+"}
        </button>

        <button type="submit" className="submitbtn">
          Submit
        </button>
      </form>
    </div>
  );
}
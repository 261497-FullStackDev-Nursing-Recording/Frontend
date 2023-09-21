import React from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import "./formlayout.css";

type FormValues = {
  Edata: {
    type: string;
    name: string;
    date: string;
    text: string;

  }[];
};

export default function IForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      Edata: [{ type: "select", name: "", date:"" }],
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

  // Function to handle the selection change in the dropdown
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedType = e.target.value;

    // Update the selected type for the specific item in the cart array
    setValue(`Edata.${index}.type`, selectedType as any); // Use type casting to resolve the error
  };

  // Function to render the form fields based on the selected type
  const renderFormFields = (selectedType: string, index: number) => {
    switch (selectedType) {
      case "item1":
        return (
         
          <><label>
            <section>
      
            <textarea 
              {...register(`Edata.${index}.text`)}
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
        <h1 className="Headform">E <span className="Headtext">ผลขอการรักษา</span></h1>
       
        {fields.map((item, index) => (
          <div key={item.id} className="Ebody">
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(e, index)}
              className="select"
            >
              <option value="select">ตัวเลือก</option>
              <option value="item1">ผลขอการรักษา</option>
              
              
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

        <button type="submit" className="submitbtn1">
          Submit
        </button>
      </form>
    </div>
  );
}
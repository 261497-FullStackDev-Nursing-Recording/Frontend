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
            <section className="sectiongap">
      
            <textarea className="textarearesize"
              {...register(`Edata.${index}.text`)}
              placeholder={`กรอกข้อมูล`}
            />
           </section>
            </label>
          </>
        );

        case "item2":
          return (
            <>
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
            </>
  
          );


          case "item3":
          return (
            <>
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
            </>
  
          );

          case "item4":
            return (
              <>
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
              </>
    
            );



            case "item5":
        return (
         
          <><label>
            <section className="sectiongap">
            <select {...register(`Edata.${index}.name`)}>
           
          <option value="op1">สัญญาณชีพอยู่ในเกณฑ์ ปกติ</option>
          <option value="op2">ไม่มีภาวะพร่องออกซิเจน</option>
          <option value="op3">ไม่เกิดท่อช่วยหายใจเลื่อนหลุด </option>
          <option value="op4">ไม่เกิดการบาดเจ็บจากการผูกมัด</option>
          <option value="op5">I/O balance</option>
          <option value="op6">ไม่มีภาวะทุพโภชนาการ</option>
          <option value="op7">Electrolyte,Albumin อยู่ในเกณฑ์ปกติ</option>
          <option value="op8">ไม่เกิดปอดอักเสบจากการใช้เครื่องช่วยหายใจ</option>
          <option value="op9">ไม่เกิดภาวะ pneumothrorax</option>
          <option value="op10">ผู้ป่วยและญาติทุเลาจากความวิตกกังวล</option>
          <option value="op11">ผู้ป่วยมีสีหน้าสดชื่น นอนหลับพักผ่อนได้</option>
          <option value="op12">ผู้ป่วยสามารถสื่อสารความต้องการได้</option>
          <option value="op13">ผู้ป่วยสุขสบาย ไม่เกิดแผลกดทับ พักผ่อนได้</option>
          <option value="op14">ไม่เกิดการใส่ท่อช่วยหายใจใหม่ภายใน 48 ชม.</option>
        </select>
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
        <h1 className="Headform">E การประเมินผล</h1>
       
        {fields.map((item, index) => (
          <div key={item.id} className="Eformcontainer">
            <select
              value={item.type}
              onChange={(e) => handleTypeChange(e, index)}
              className="select"
            >
              <option value="select">ตัวเลือก</option>
              <option value="item1">ข้อมูลเพิ่มเติม </option>
              <option value="item2">O2 Saturation</option>
              <option value="item3">ก๊าซในเลือดแดงมีค่าปกติ PaO2</option>
              <option value="item4">ก๊าซในเลือดแดงมีค่าปกติ PaCO2</option>
              <option value="item5">ผลของการรักษา</option>
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
import React from "react";
import { Control, useFieldArray, useForm, useWatch, Controller } from "react-hook-form";
import "./formlayout.css";
import { text } from "stream/consumers";

type FormValues = {
  cart: {
    type: string;
    name: string;
    amount: number;
  }[];
  type: string; // New field for select
};

let renderCount = 0;

function getTotal(payload: FormValues["cart"]) {
  let total = 0;

  for (const item of payload) {
    total = total + (Number.isNaN(item.amount) ? 0 : item.amount);
  }

  return total;
}

function TotalAmout({ control }: { control: Control<FormValues> }) {
  const cartValues = useWatch({
    control,
    name: "cart"
  });

  return <p>{getTotal(cartValues)}</p>;
}

export default function OForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ type:"select" ,name: "", amount: 0 }],
       // Default value for the select
    }
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
    rules: {
      required: "Please add at least 1 item"
    }
  });

  renderCount++;

  return (
    
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Submit data", data);
        })}
      >
       
       <h1 className="Headform">O</h1>
       
       
        <button
          type="button"
          onClick={() => {
            append({
              type: "select",
              name: "",
              amount: 0
              
            });
          }}
        >
          Add
        </button>


        

       
{fields.map((field, index) => {
  return (
    <section key={field.id}>

<label>
        <span>Type</span>
        <select
          {...register(`cart.${index}.type`, { required: true })}
        >
          <option value="type1">Type 1</option>
          <option value="type2">Type 2</option>
          {/* Add more type options as needed */}
        </select>
      </label>

      <label>
        <span>Name</span>
        <input
          {...register(`cart.${index}.name`, { required: true })}
        />
      </label>
      
      <label>
        <span>Mean</span>
        <input
          type="number"
          {...register(`cart.${index}.amount`, { valueAsNumber: true })}
        />
      </label>
      <button type="button" onClick={() => remove(index)}>
        Delete
      </button>
    </section>
  );
})}
     
        

        <p>{errors.cart?.root?.message}</p>
        <button type="submit" className="submitbtn" >Submit</button>
      </form>
    </div>
  );
}
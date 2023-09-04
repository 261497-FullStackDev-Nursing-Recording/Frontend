import React from "react";
import { Control, useFieldArray, useForm, useWatch, Controller } from "react-hook-form";
import "./formlayout.css";

type FormValues = {
  cart: {
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

export default function MyForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: "", amount: 0 }],
      type: "" // Default value for the select
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
        <div>
          <label>เลือกกลุ่มโรค: </label>
          <Controller
            name="type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field}>
                <option value="">Select...</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                {/* Add more options as needed */}
              </select>
            )}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            append({
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
                <span>Name</span>
                <input
                  {...register(`cart.${index}.name`, { required: true })}
                />
              </label>
              <label>
                <span>Mean</span>
                <input
                  type="number" // Changed to text input, but you can use select
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
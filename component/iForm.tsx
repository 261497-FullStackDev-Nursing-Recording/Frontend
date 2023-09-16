import React from "react";
import {
  Control,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import "./formlayout.css";

type FormValues = {
  cart: {
    type: string;
    name: string;
    amount: number;
  }[];
};

let renderCount = 0;

function getTotal(payload: FormValues["cart"]) {
  let total = 0;

  for (const item of payload) {
    total = total + (Number.isNaN(item.amount) ? 0 : item.amount);
  }

  return total;
}

export default function IForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ type: "", name: "", amount: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
    rules: {
      required: "Please add at least 1 item",
    },
  });

  const cartValues = useWatch({
    control,
    name: "cart",
  });

  renderCount++;

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("Submit data", data);
        })}
      >
        <h1 className="Headform">I</h1>

        <button
          type="button"
          onClick={() => {
            append({
              type: "",
              name: "",
              amount: 0,
            });
          }}
        >
          Add
        </button>

        {fields.map((field, index) => {
          const selectedType = cartValues[index]?.type || "";

          return (
            <section key={field.id}>
              <label>
                <span>Select</span>
                <select
                  {...register(`cart.${index}.type`, { required: true })}
                >
                  <option value="">Select</option>
                  <option value="WBC">WBC</option>
                  <option value="other">Other</option>
                </select>
              </label>

              {selectedType === "WBC" ? (
                <>
                  <label>
                    <span>WBCs per microliter</span>
                    <input
                      {...register(`cart.${index}.name`, { required: true })}
                    />
                  </label>

                </>
              ) : (
                <label>
                  <span>Name</span>
                  <input
                    {...register(`cart.${index}.name`, { required: true })}
                  />
                </label>
              )}

              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </section>
          );
        })}

        <p>{errors.cart?.root?.message}</p>
        <button type="submit" className="submitbtn">
          Submit
        </button>
      </form>
    </div>
  );
}

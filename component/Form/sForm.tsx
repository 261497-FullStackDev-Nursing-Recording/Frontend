import React from 'react';
import { useForm, Controller, useFieldArray, SubmitHandler } from 'react-hook-form';

type FormData = {
  items: { name: string; type: string }[];
};

const DynamicForm: React.FC = () => {
  const { control, handleSubmit, register } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Dynamic Form</h2>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            name={`items[${index}].name`}
            control={control}
            defaultValue={field.name}
            render={({ field }) => <input {...field} />}
          />
          <Controller
            name={`items[${index}].type`}
            control={control}
            defaultValue={field.type}
            render={({ field }) => (
              <select {...field}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                {/* Add more input types as needed */}
              </select>
            )}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', type: 'text' })}>
        Add Item
      </button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;

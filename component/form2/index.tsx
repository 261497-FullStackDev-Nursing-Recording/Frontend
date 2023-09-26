"use client";
import FormDisplay from "./FormDisplay";
import { getFormSelectFields } from "./formSelectFields";
import { Button } from "../Form/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Form/ui/select"
import { useState } from "react";
import { FC } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import "./styles.css"

interface FormProps {
  formType: string;
}
const Form: FC<FormProps> = ({ formType }) => {
  const selectData = getFormSelectFields(formType);
  const useFormReturn = useForm({});
  const { control, handleSubmit, watch } = useFormReturn;
  const fieldsReturn = useFieldArray({ control, name: "oField" });
  const { append } = fieldsReturn;
  const [selectValue, setSelectValue] = useState("");
  console.log({ values: watch() });

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="form"
    >
      <FormDisplay fieldsReturn={fieldsReturn} useFormReturn={useFormReturn} />

      <div className="flex gap-2">
        <Select
          onValueChange={(val) => setSelectValue(val)}
        >
          <SelectTrigger className="w-[500px] custom-select-trigger">
            <SelectValue
              placeholder="ประเภทการบันทึก"
              className="custom-select-value"
            />
          </SelectTrigger>
          <SelectContent className="custom-select-content">
            {selectData.map((item) => (
              <SelectItem
                value={item.inputCode}
                key={item.inputCode}
                className="custom-select-item"
              >
                {item.inputCodeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div
          onClick={() => {
            const data = selectData.find((item) => item.inputCode === selectValue);
            append(data);
          }}
          className="addbutton"
        >
          Add
        </div>
        <div className="submitbutton">Submit</div>
      </div>
    </form>
  );
};

export default Form;

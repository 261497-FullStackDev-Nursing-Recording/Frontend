import { Button } from "../Form/ui/button"
import { Input } from "../Form/ui/input"
import { Textarea } from"../Form/ui/textarea"
import { FC } from "react";
import {
  UseFieldArrayReturn,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import "./styles.css"

interface Props {
  useFormReturn: UseFormReturn;
  fieldsReturn: UseFieldArrayReturn<FieldValues, "oField", "id">;
}

const FormDisplay: FC<Props> = ({ fieldsReturn, useFormReturn }) => {
  const { fields, remove } = fieldsReturn;
  const { register, getValues } = useFormReturn;
  return (
    <div className="flex flex-col gap-3">
      {fields.map((item, index) => {
        const data = getValues(`oField.${index}`);
        const inputType = data.inputType as string;
        const preLabel = data.preLabel as string;
        const postLabel = data.postLabel as string;
        // console.log({ data });
        return (
          <div key={item.id} className="flex gap-3 items-center">
            <div>{preLabel}</div>

            {inputType !== "textarea" ? (
              <Input
                {...register(`oField.${index}.inputText`)}
                type={inputType}
                className="w-60"
              />
            ) : (
              <Textarea
                {...register(`oField.${index}.inputText`)}
                className="w-80 h-40"
              />
            )}
            <div>{postLabel}</div>
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              Delete
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default FormDisplay;

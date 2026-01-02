import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";
import { FieldDescription } from "../ui/field";

interface InputFieldErrorProps {
  field: string;
  state: any;
}

const InputFieldError = ({ field, state }: InputFieldErrorProps) => {
  if (!state) return null;
  
  const error = getInputFieldError(field, state);
  if (error) {
    return (
      <FieldDescription className="text-red-600">
        {error}
      </FieldDescription>
    );
  }

  return null;
};

export default InputFieldError;

import { AlertCircle } from "lucide-react";

interface Props {
  errors?: string[];
  id?: string;
}

export default function FieldError({ errors, id }: Props) {
  if (!errors?.length) return null;
  return (
    <p id={id} role="alert" className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <AlertCircle size={12} aria-hidden />
      {errors[0]}
    </p>
  );
}

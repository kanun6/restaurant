"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className: string;
  size: btnSize;
  text: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {
  const { pending } = useFormStatus(); // ใช้ useFormStatus() แทน useFormState()

  return (
    <Button
      disabled={pending}
      type="submit"
      size={size}
      className={`${className} capitalize`}
    >
      {pending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <span>{text}</span>
      )}
    </Button>
  );
};

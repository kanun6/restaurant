'use client'
import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from 'lucide-react';

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className: string;
  size: string;
  text: string;
};

export const SubmitButton = ({ className, size, text }: SubmitButtonProps) => {
    const { pending } = useFormState
  return <Button disabled={pending} type="submit" size={size} className={'${className} capitalize'}>
    {
        pending
        ? <LoaderCircle className="animate-spin"/>
        :  <p>{text}</p>
    }
    
    </Button>
};

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IMessageInput {
  placeholder?: string;
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required?: boolean;
  errors: FieldErrors;
}

const MessageInput = (props: IMessageInput) => {
  const { errors, id, register, placeholder, required, type } = props;
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete="id"
        placeholder={placeholder}
        {...register(id, { required })}
        className="text-black font-light py-2 
        px-4 bg-neutral-100 w-full 
        rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;

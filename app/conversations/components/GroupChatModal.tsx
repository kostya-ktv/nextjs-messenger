import { IModal } from "@/components/Modal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface IGroupChatModal extends Omit<IModal, "children"> {
  users: User[];
}

const GroupChatModal: React.FC<IGroupChatModal> = ({
  users,
  ...modalProps
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");
  return <div></div>;
};

export default GroupChatModal;

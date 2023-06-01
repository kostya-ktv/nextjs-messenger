import Button from "@/components/Button";
import Modal, { IModal } from "@/components/Modal";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        modalProps.onClose();
      })
      .catch(() => toast.error("Error"))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal {...modalProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                required
                label="Name"
                id="name"
                disabled={isLoading}
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                value={members}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
              />
            </div>
          </div>
        </div>
        <div
          className="
              mt-6 flex items-center justify-end gap-x-6"
        >
          <Button
            disabled={isLoading}
            onClick={modalProps.onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;

"use client";

import React, { useState } from "react";
import Modal, { IModal } from "../Modal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface ISettingsModal extends Omit<IModal, "children"> {
  currentUser: User;
}

const SettingsModal: React.FC<ISettingsModal> = ({
  currentUser,
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("api/settings/", data)
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
          <div
            className="
                  border-b border-gray-900/10 pb-12"
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public info
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div
                  className="
                mt-2 flex items-center gap-x-3"
                >
                  <Image
                    alt="img"
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset={"mly7wkty"}
                  >
                    <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
                  mt-6 flex items-center justify-end gap-x-6"
          >
            <Button disabled={isLoading} secondary onClick={modalProps.onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;

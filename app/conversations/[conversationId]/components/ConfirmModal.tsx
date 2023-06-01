"use client";

import Button from "@/components/Button";
import Modal, { IModal } from "@/components/Modal";
import useConversation from "@/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

interface Props extends Omit<IModal, "children"> {}

const ConfirmModal: React.FC<Props> = (props) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = useCallback(() => {
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        props.onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Some error"))
      .finally(() => setIsLoading(false));
  }, [conversationId, router, props]);
  return (
    <Modal {...props}>
      <div className="sm:flex sm:items-start">
        <div
          className="mx-auto flex h-12 w-12
              flex-shrink-0 items-center rounded-full justify-center
              bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
        >
          <FiAlertTriangle
            className="
          h-6 w-6 text-red-600"
          />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            className="text-base font-se leading-6 text-gray-900"
            as="h3"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure to delete this conversation?
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          Delete
        </Button>
        <Button disabled={isLoading} secondary onClick={props.onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

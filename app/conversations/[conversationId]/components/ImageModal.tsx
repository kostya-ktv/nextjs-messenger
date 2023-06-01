"use client";
import Modal, { IModal } from "@/components/Modal";
import Image from "next/image";
import React from "react";

interface IImageModal extends Omit<IModal, "children"> {
  src?: string | null;
}

const ImageModal: React.FC<IImageModal> = ({ src, ...props }) => {
  return src ? (
    <Modal {...props}>
      <div className="w-80 h-80">
        <Image alt="img" className="object-cover" fill src={src} />
      </div>
    </Modal>
  ) : null;
};

export default ImageModal;

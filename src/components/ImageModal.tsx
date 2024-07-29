// modal using tailwindcss and daisy to view image in full screen

import { useEffect, useState } from 'react';

type ImageModalProps = {
  image: string;
  onClose: () => void;
  open: boolean;
};

const ImageModal = ({ image, open, onClose }: ImageModalProps) => {
  return (
    <dialog className={`modal ${open ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle bg-base-300 absolute right-2 top-2" onClick={onClose}>✕</button>
        <img src={image} className={`w-full h-full`} alt="chat-media" />
      </div>
    </dialog>
  );
};

export default ImageModal;
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-[#000000] bg-opacity-50 flex justify-center items-center p-4">
      <div
        className="bg-[#111827] py-4 rounded-xl shadow-lg max-w-5xl w-full h-[500px] flex flex-col overflow-auto"
        style={{ boxShadow: "0px 0px 30px #B94CED" }}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 bg-white w-8 h-8 flex items-center justify-center rounded-full"
          onClick={onClose}
        >
          X
        </button>
        <h3 className="bg-[#B94CED] text-[#ffff] w-full text-center text-2xl p-2">
          Analisis de compatibilidad de componentes
        </h3>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

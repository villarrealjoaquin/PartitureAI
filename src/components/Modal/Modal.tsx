import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }: any) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-[#111827] bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#111827] py-4 rounded-lg shadow-lg max-w-4xl w-full h-[500px] flex flex-col border overflow-auto">
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

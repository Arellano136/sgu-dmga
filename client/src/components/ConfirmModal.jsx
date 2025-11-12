import React from "react";
import Modal from "./Modal";
import { AlertCircle } from "lucide-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, userName, isLoading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-500 mt-1" size={24} />
          <p className="text-gray-700">
            ¿Estás seguro de que deseas eliminar al usuario{" "}
            <span className="font-semibold">{userName}</span>?
          </p>
        </div>
        <div className="flex gap-3 pt-4">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

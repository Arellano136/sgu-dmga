import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const UserTable = ({ users, onEdit, onDelete, isLoading }) => {
  if (isLoading)
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="mt-2 text-gray-600">Cargando usuarios...</p>
      </div>
    );

  if (users.length === 0)
    return (
      <div className="text-center py-8 text-gray-500">
        No hay usuarios registrados
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
              Nombre Completo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
              Correo Electrónico
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
              Teléfono
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-black">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm text-black">{user.id}</td>
              <td className="px-6 py-4 text-sm text-black">{user.nombre} {user.apellidos}</td>
              <td className="px-6 py-4 text-sm text-black">{user.correo_electronico}</td>
              <td className="px-6 py-4 text-sm text-black">{user.telefono}</td>
              <td className="px-6 py-4 text-center text-sm">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Editar"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Eliminar"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

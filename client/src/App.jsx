import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Modal from "./components/Modal";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import ConfirmModal from "./components/ConfirmModal";

// Configuración de la API usando variables de entorno
const ENV = import.meta.env;
const API_URL = `${ENV.VITE_API_PROTOCOL}://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;
const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      console.log('Cargando usuarios desde:', `${API_URL}/user/all`);
      
      const res = await fetch(`${API_URL}/user/all`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      console.log('Status:', res.status);
      const data = await res.json();
      
      if (Array.isArray(data.result)) {
        setUsers(data.result);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      showNotification("Error al cargar los usuarios", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (userData) => {
    setIsFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/save`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(userData),
      });
      
      const data = await res.json();
      
      if (data.result) {
        showNotification("Usuario guardado correctamente");
        setShowAddModal(false);
        loadUsers();
      } else {
        showNotification(data.message || "Error al guardar", "error");
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      showNotification("Error al guardar el usuario", "error");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleUpdate = async (userData) => {
    setIsFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/update`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(selectedUser),
      });
      
      const data = await res.json();
      
      if (data.result) {
        showNotification("Usuario actualizado correctamente");
        setShowEditModal(false);
        setSelectedUser(null);
        loadUsers();
      } else {
        showNotification(data.message || "Error al actualizar", "error");
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      showNotification("Error al actualizar el usuario", "error");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/user/${selectedUser.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json"
        }
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        // Ignora si no hay body
      }

      if (res.ok) {
        showNotification("Usuario eliminado correctamente");
        setShowDeleteModal(false);
        setSelectedUser(null);
        loadUsers();
      } else {
        showNotification(data?.message || "Error al eliminar", "error");
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      showNotification("Error al eliminar el usuario", "error");
    } finally {
      setIsFormLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="w-full h-screen bg-gray-50 py-8 px-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-grow">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Gestión de Usuarios
            </h1>
            <p className="text-gray-600 mt-1">
              Administra los usuarios del sistema
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} /> Nuevo Usuario
          </button>
        </div>

        {/* Notificación */}
        {notification && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Tabla (ocupa todo el espacio disponible) */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-grow">
          <UserTable
            users={users}
            onEdit={(u) => {
              setSelectedUser(u);
              setShowEditModal(true);
            }}
            onDelete={(u) => {
              setSelectedUser(u);
              setShowDeleteModal(true);
            }}
            isLoading={isLoading}
          />
        </div>

        {/* Modales */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Nuevo Usuario"
        >
          <UserForm
            onSubmit={handleSave}
            onCancel={() => setShowAddModal(false)}
            isLoading={isFormLoading}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          title="Editar Usuario"
        >
          <UserForm
            user={selectedUser}
            onSubmit={handleUpdate}
            onCancel={() => {
              setShowEditModal(false);
              setSelectedUser(null);
            }}
            isLoading={isFormLoading}
          />
        </Modal>

        <ConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDelete}
          userName={selectedUser?.fullName}
          isLoading={isFormLoading}
        />
      </div>
    </div>
  );
};

export default App;
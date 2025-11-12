import React, { useState } from "react";

const UserForm = ({ user, onSubmit, onCancel, isEdit }) => {
  const [formData, setFormData] = useState({
    id: user?.id || '',
    nombre: user?.nombre || '',
    apellidos: user?.apellidos || '',
    correo_electronico: user?.correo_electronico || '',
    telefono: user?.telefono || ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.correo_electronico.trim()) {
      newErrors.correo_electronico = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo_electronico)) {
      newErrors.correo_electronico = 'El correo no es válido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      // Limpiar campos vacíos antes de enviar
      const cleanData = isEdit ? formData : {
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        correo_electronico: formData.correo_electronico.trim(),
        telefono: formData.telefono.trim()
      };
      onSubmit(cleanData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={`w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className={`w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.apellidos ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.apellidos && <p className="text-red-500 text-xs mt-1">{errors.apellidos}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
        <input
          type="email"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={handleChange}
          className={`w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.correo_electronico ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.correo_electronico && <p className="text-red-500 text-xs mt-1">{errors.correo_electronico}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className={`w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="10 dígitos"
        />
        {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
      </div>

      <div className="flex gap-2 pt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEdit ? 'Actualizar' : 'Guardar'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};


export default UserForm;

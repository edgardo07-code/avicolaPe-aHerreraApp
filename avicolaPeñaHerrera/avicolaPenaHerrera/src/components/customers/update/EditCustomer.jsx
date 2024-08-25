import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../../axios';
import './editCustomer.scss'; // Asegúrate de que esta ruta sea correcta

const EditCustomer = ({ customer, onClose }) => {
  const [formData, setFormData] = useState({ ...customer });
  const queryClient = useQueryClient();

  // Mutation para actualizar el cliente
  const updateMutation = useMutation({
    mutationFn: (updatedCustomer) => makeRequest.put(`/customers/${updatedCustomer.customer_id}`, updatedCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      alert('Cliente actualizado satisfactoriamente!');
      onClose();
    },
    onError: (error) => {
      alert('Error actualizando el cliente: ' + (error.response?.data || error.message));
    },
  });

  // Maneja el cambio en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    updateMutation.mutate(formData);
  };

  useEffect(() => {
    setFormData({ ...customer });
  }, [customer]);

  return (
    <div className="edit-customer-modal">
      <div className="edit-customer-content">
        <h2>Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            NIT:
            <input
              type="text"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Ruta:
            <input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleChange}
              required
            />
          </label>
          <div className="edit-customer-buttons">
            <button type="submit">Actualizar</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;

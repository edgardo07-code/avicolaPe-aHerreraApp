import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './customerRegister.scss'; // Asegúrate de ajustar la ruta según la ubicación del archivo SCSS
import { AuthContext } from '../../../context/authContext'; // Asegúrate de que esta ruta sea correcta
import { makeRequest } from '../../../axios'; // Asegúrate de que esta ruta sea correcta

const CustomerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    nit: '',
    route_id: '',
    phone: '',
    address: '',
  });

  const { currentUser } = useContext(AuthContext); // Obtén el usuario actual desde el contexto
  const queryClient = useQueryClient(); // Obtén queryClient para invalidar consultas

  const mutation = useMutation({
    mutationFn: async (data) => {
      // Enviar datos al backend con el token
      await makeRequest.post('/customers', data)
    },
    onSuccess: () => {
      // Acción en caso de éxito
      queryClient.invalidateQueries(["customers"]); // Asegúrate de usar el nombre correcto para la consulta
      alert('El cliente ha sido creado satisfactoriamente!');
      setFormData({
        name: '',
        nit: '',
        route_id: '',
        phone: '',
        address: '',
      });
    },
    onError: (error) => {
      // Acción en caso de error
      alert('Error creando el cliente: ' + (error.response?.data || error.message));
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación Frontend
    if (!formData.name || !formData.nit || !formData.route_id  || !formData.phone || !formData.address) {
      alert('Todos los campos son requeridos.');
      return;
    }

    // Trigger mutación
    mutation.mutate(formData);
  };

  return (
    <div className='customer-register'>
      <div className="card">
      <h2>Nuevo Cliente</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nit">NIT</label>
          <input
            type="text"
            id="nit"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="route_id">Ruta</label>
          <input
            type="text"
            id="route_id"
            name="route_id"
            value={formData.route_id}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Telefono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Registrando...' : 'Enviar'}
        </button>
      </form>
      </div>
    </div>
  );
};

export default CustomerRegister;

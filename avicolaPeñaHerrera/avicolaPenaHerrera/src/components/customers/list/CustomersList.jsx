import React, { useState, useRef, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './customerList.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../../axios';
import EditCustomer from '../update/EditCustomer';

const CustomersList = ({ customersList }) => {
  const [menuState, setMenuState] = useState({ id: null, top: 0, left: 0 });
  const menuRef = useRef(null);

  const [editingCustomer, setEditingCustomer] = useState(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (productId) => makeRequest.delete(`/customers/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
    },
  });

  useEffect(() => {
    // Cierra el menú si se hace clic fuera de él
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuState({ id: null, top: 0, left: 0 });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDoubleClick = (event, customer) => {
    const { clientX, clientY } = event;
    setMenuState({
      id: customer.customer_id,
      top: clientY + 10,
      left: clientX,
    });
  };

  const mutation = useMutation({
        mutationFn: async (data) => {
            // Enviar datos al backend con el token
            await makeRequest.post('/customers', data );
        },
        onSuccess: () => {
            // Acción en caso de éxito
            queryClient.invalidateQueries(["customers", userId]);
            alert('El producto ha sido creado satisfactoriamente!');
            setFormData({
                product_name: '',
                description: '',
                price: ''
            });
        },
        onError: (error) => {
            // Acción en caso de error
            alert('Error creando el producto: ' + (error.response?.data || error.message));
        }
    });

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setMenuState({ id: null, top: 0, left: 0 });
  };

  const closeEditModal = () => {
    setEditingCustomer(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Esta seguro que desea eliminar este cliente?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="customerList">
      {editingCustomer && (
        <div className="modal-overlay">
          <EditCustomer customer={editingCustomer} onClose={closeEditModal} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>NIT</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Ruta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customersList.map((customer) => (
            <React.Fragment key={customer.customer_id}>
              <tr>
                <td onDoubleClick={(e) => handleDoubleClick(e, customer)}>{customer.name}</td>
                <td onDoubleClick={(e) => handleDoubleClick(e, customer)}>{customer.nit}</td>
                <td onDoubleClick={(e) => handleDoubleClick(e, customer)}>{customer.address}</td>
                <td onDoubleClick={(e) => handleDoubleClick(e, customer)}>{customer.phone}</td>
                <td onDoubleClick={(e) => handleDoubleClick(e, customer)}>{customer.route}</td>
                <td>
                  <button onClick={() => console.log(customer.customer_id)}>
                    Hacer Pedido
                  </button>
                </td>
              </tr>
              {menuState.id === customer.customer_id && (
                <tr>
                  <td colSpan="6" className="config-customer-menu" ref={menuRef} >
                    <button className="menu-item" onClick={() => handleEdit(customer)}><EditIcon/></button>
                    <button className="menu-item" onClick={() => handleDelete(customer.customer_id)}><DeleteIcon/></button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;

import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './createProduct.scss'; // Asegúrate de que esta ruta sea correcta
import { AuthContext } from '../../../context/authContext';
import { makeRequest } from '../../../axios';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        price: ''
    });

    const { currentUser } = useContext(AuthContext); // Asegúrate de tener el contexto de autenticación configurado
    const userId = currentUser.id;
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (data) => {
            // Enviar datos al backend con el token
            await makeRequest.post('/products', data );
        },
        onSuccess: () => {
            // Acción en caso de éxito
            queryClient.invalidateQueries(["products", userId]);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Frontend validation
        if (!formData.product_name || !formData.price) {
            alert('El nombre y precio del producto son requeridos.');
            return;
        }

        if (formData.price <= 0) {
            alert('El precio debe ser superior a cero.');
            return;
        }

        // Trigger mutation
        mutation.mutate(formData);
    };

    return (
        <div className="create-product">
            <div className="card">
                <h2 className="card-title">Crear Producto</h2>
                <form className="product-form" onSubmit={handleSubmit}>
                    <label className="form-label">
                        Nombre
                        <input
                            type="text"
                            name="product_name"
                            value={formData.product_name}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </label>
                    <label className="form-label">
                        Descripción
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-textarea"
                            rows={1}
                        />
                    </label>
                    <label className="form-label">
                        Precio
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </label>
                    <button type="submit" className="form-button" disabled={mutation.isLoading}>
                        {mutation.isLoading ? 'Creando...' : 'Enviar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;

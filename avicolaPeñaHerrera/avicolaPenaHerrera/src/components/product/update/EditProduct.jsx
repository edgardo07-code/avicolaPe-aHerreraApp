import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../../axios";
import './editProduct.scss'

const EditProduct = ({ product, onClose }) => {
  const [id] = useState(product.product_id);
  const [name, setName] = useState(product.product_name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (updatedProduct) => makeRequest.put(`/products`, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ product_name: name, price, description, id });
  };

  return (
    <div className="edit-product-modal">
      <h2>Editar {name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Precio
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Descripción
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button type="submit">Enviar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditProduct;

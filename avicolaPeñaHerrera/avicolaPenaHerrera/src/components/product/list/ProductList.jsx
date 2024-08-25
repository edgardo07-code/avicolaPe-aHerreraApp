import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import './productList.scss'; // Asegúrate de crear este archivo para los estilos
import EditProduct from "../update/EditProduct";
import { makeRequest } from "../../../axios";

const ProductList = ({ productList }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (productId) => makeRequest.delete(`/products/${productId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (productId) => {
    if (window.confirm("Esta seguro que desea eliminar este producto?")) {
      deleteMutation.mutate(productId);
    }
  };

  const closeEditModal = () => {
    setEditingProduct(null);
  };

  return (
    <div className="productList">
      {editingProduct && (
        <div className="modal-overlay">
          <EditProduct product={editingProduct} onClose={closeEditModal} />
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productList?.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td style={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
                <button onClick={() => handleEditClick(product)}>
                  <EditIcon />
                </button>
                <button onClick={() => handleDelete(product.product_id)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

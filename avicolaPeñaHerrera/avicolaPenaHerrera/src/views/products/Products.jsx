import { useState } from 'react';
import CreateProduct from "../../components/product/create/CreateProduct";
import ProductList from "../../components/product/list/ProductList";
import Modal from "../../components/modal/Modal";
import './products.scss';
import { useProducts } from '../../hooks/useProducts';
import Loading from '../../components/common/loading/Loading';

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { isLoading, error, data } = useProducts();
  
  return (
    <div className="products">
      <div className='products-container'>
        <div className="header">
        <span>Agregar Producto</span>
        <button className="btn-add" onClick={() => toggleModal()}>+</button>
      </div>
      { error
        ? "Sin conexión con la API!"
        : isLoading
        ? <Loading/>
        : data?.length > 0 ?  
        <>
        <ProductList productList={data} />
        
      </>
       
        : <span>No hay datos en la tabla productos.</span>}
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Crear Producto"
      >
        <CreateProduct />
      </Modal>
      </div>
    </div>
  );
}

export default Products;

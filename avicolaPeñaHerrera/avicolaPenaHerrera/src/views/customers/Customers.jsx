import { useState } from "react";
import Loading from "../../components/common/loading/Loading";
import CustomersList from "../../components/customers/list/CustomersList";
import CustomerRegister from "../../components/customers/register/CustomerRegister";
import Modal from "../../components/modal/Modal";
import { useCustomers } from "../../hooks/useCustomers";
import './customers.scss';

const Customers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, data } = useCustomers();

  

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <div className="customers">
      <div className="customer-container">
        <div className="header">
          <span>Agregar Cliente</span>
          <button className="btn-add" onClick={() => setIsModalOpen(true)}>+</button>
        </div>
        {error ? "Sin conexión con la API!" :
          isLoading ? <Loading /> :
          data?.length > 0 ? (
            <>
              <CustomersList key={data.id} customersList={data} />
              
            </>
          ) : <span>No hay datos en la tabla clientes.</span>
        }
        <Modal
                isOpen={isModalOpen}
                onClose={toggleModal}
                title="Agregar Cliente">
                <CustomerRegister />
              </Modal>
      </div>
    </div>
  );
};

export default Customers;

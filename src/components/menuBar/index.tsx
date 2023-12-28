import { Delivery } from '@/helpers/axios/delivery';
import { AddClientsLocalStorage } from '@/libs/add-clients-locastorage/add-clients-locastorage';
import React, { useState } from 'react';
import { AiOutlineCaretRight } from 'react-icons/ai';
import { SessionStorageValues } from '../form/sessionStorageValues';
import { Loading } from '../loading';

export const MenuBar = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowMenu = () => {
    setShow((show) => !show);
  };

  const handleClick = async () => {
    const confirmData = confirm('Deseja mesmo enviar os clientes?');

    if (confirmData) {
      setLoading(true);
      const { data, error, message } = AddClientsLocalStorage.getAll();

      if (!data && error && message) {
        alert(message);
        setLoading(false);
        return;
      }

      const token = sessionStorage.getItem('$token');

      if (!token) {
        SessionStorageValues.redirect();
        return;
      }

      let isDeliveryError = false;

      for (let index = 0; index < data!.length; index++) {
        const { error, message } = await Delivery.create_delivery({
          params: {
            ...data![index],
          },
          token,
        });

        if (!error) {
          AddClientsLocalStorage.removeClient(
            data![index].recipient.boletus_id,
          );
        }

        if (error && message) {
          alert(message);
          isDeliveryError = true;

          break;
        }
      }

      if (isDeliveryError) {
        setLoading(false);
        return;
      }

      setLoading(false);

      alert('Usuários adicnados com sucesso!');

      AddClientsLocalStorage.deleteAllClinets();

      setShow(false);
    }
  };

  return (
    <div className={`${show ? 'menuBar  menu-open' : 'menuBar menu-close'}`}>
      {loading && <Loading />}
      <div onClick={handleShowMenu} className="icon">
        <AiOutlineCaretRight />
      </div>

      <h2>Adicinar os usuários</h2>
      <div>
        <button onClick={handleClick} type="button">
          Enviar
        </button>
      </div>
    </div>
  );
};

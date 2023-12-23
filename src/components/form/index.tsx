/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { Input } from '../input';
import { FormValidation } from './form-validation';
import { formatPhoneNumber } from '../../helpers/formatPhoneNumber';
import { formatCPF } from '../../helpers/formatCpf';
import { CameraCapture } from '../CameraCapture';
import { Checkbox } from '../Checkbox';
import { Delivery } from '../../helpers/axios/delivery';
import { Message, MessageProps } from '../message';
import { Loading } from '../loading';
import { SessionValidate } from '../../helpers/session-validate';
import { SessionStorageValues } from './sessionStorageValues';
import { RestoresErrorMessage } from './restoresErrorMessage';
import { ClearStates } from './clearStates';
import { Login } from '@/helpers/axios/login';

export const Form = () => {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [boletus_id, setBoletus_id] = useState(0);

  const [clearCpf_cnpj, setClearCpf_cnpj] = useState(false);
  const [clearNumber, setClearNumber] = useState(false);
  const [clearEmail, setClearEmail] = useState(false);
  const [clearBoletus, setClearBoletus] = useState(false);

  const [showPhoto, setShowPhoto] = useState(false);

  const [errorMessage, setErrorMesssage] = useState<MessageProps>({
    type: 'error',
    message: '',
  });
  const [sessionRedirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validateId, setValidateId] = useState('');

  useEffect(() => {
    let time: NodeJS.Timeout = setTimeout(() => {}, 3000);

    RestoresErrorMessage.restore({
      message: errorMessage.message,
      sessionRedirect,
      setErrorMesssage,
      setRedirect,
      time: time,
      id: validateId,
    });

    ClearStates.clear({
      clearBoletus,
      clearCpfCnpj: clearCpf_cnpj,
      clearEmail,
      clearNumber,
      setClearBoletus,
      setClearCpfCnpj: setClearCpf_cnpj,
      setClearEmail,
      setClearNumber,
    });

    return () => clearTimeout(time);
  }, [
    errorMessage.message,
    sessionRedirect,
    clearCpf_cnpj,
    clearEmail,
    clearNumber,
    clearBoletus,
  ]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const {
      error: errorSessionValid,
      data: {
        deliveredByEmail,
        deliveredByName,
        isDate,
        token,
        image,
        latitude,
        longitude,
        someoneAtHome,
        id,
      },
    } = SessionStorageValues.get();

    if (!id) {
      SessionStorageValues.redirect();
      return;
    }

    setValidateId(id);

    if (errorSessionValid) {
      Login.signOut(id);
      return;
    }

    const { error: sessionError, message: messageSession } =
      SessionValidate.validateDate({ isData: isDate });

    if (sessionError) {
      setLoading(false);
      setRedirect(true);
      setErrorMesssage({
        message: messageSession,
        type: 'error',
      });
      return;
    }

    const { error, message } = await FormValidation.validate({
      cpf: formatCPF(cpfCnpj),
      email,
      number,
      token,
      image,
      latitude,
      longitude,
      boletus_id,
    });

    if (error) {
      setLoading(false);
      setErrorMesssage({
        message,
        type: 'error',
      });

      return;
    }

    const { error: errorDeliveryCreated, message: deliveryMessage } =
      await Delivery.create_delivery({
        params: {
          deliveredByEmail,
          deliveredByName,
          imageReference: image!,
          latitude: Number(latitude),
          longitude: Number(longitude),
          recipient: {
            cpf_cnpj: formatCPF(cpfCnpj),
            boletus_id,
            email,
            number,
            someoneAtHome: Boolean(someoneAtHome) ?? false,
          },
        },
        token,
      });

    if (errorDeliveryCreated) {
      setLoading(false);
      setErrorMesssage({
        message: deliveryMessage,
        type: 'error',
      });

      return;
    }

    setLoading(false);

    setClearCpf_cnpj(true);
    setClearEmail(true);
    setClearNumber(true);
    setClearBoletus(true);

    sessionStorage.removeItem('$image');
    sessionStorage.removeItem('$latitude');
    sessionStorage.removeItem('$longitude');
    sessionStorage.removeItem('$someoneAtHome');

    setErrorMesssage({
      message: 'Entrega gravada com sucesso',
      type: 'sucess',
    });
  };

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      {loading && <Loading />}
      {errorMessage.message && (
        <Message message={errorMessage.message} type={errorMessage.type} />
      )}
      {showPhoto && <CameraCapture setShow={(show) => setShowPhoto(show)} />}
      <h1>Localização</h1>
      <div className="input">
        <Input
          clear={clearCpf_cnpj}
          label_name="CPF (Obrigatório)"
          onChange={(value) => setCpfCnpj(value)}
          type="text"
          id="1"
        />
      </div>

      <div className="input">
        <Input
          clear={clearCpf_cnpj}
          label_name="Boleto (Obrigatório)"
          onChange={(value) => setBoletus_id(Number(value))}
          type="number"
          id="7"
        />
      </div>

      <div className="input">
        <Input
          clear={clearEmail}
          label_name="Email (Não é obrigatório)"
          onChange={(value) => setEmail(value)}
          type="email"
          id="2"
        />
        <div className="input"></div>
        <Input
          clear={clearNumber}
          label_name="Numero (Não é obrigatório)"
          onChange={(value) => setNumber(formatPhoneNumber(value))}
          type="tel"
          id="3"
        />
      </div>
      <div>
        <Checkbox />
      </div>

      <div className="conteiner-button">
        <button
          onClick={() => setShowPhoto(true)}
          className="button-image"
          type="button"
        >
          Tirar Foto
        </button>
        <button className="button-submit" type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
};

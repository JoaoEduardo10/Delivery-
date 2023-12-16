import React, { useEffect, useState } from 'react';
import { Input } from '../input';
import { formValidation } from '@/helpers/form-validation';
import { formatPhoneNumber } from '@/helpers/formatPhoneNumber';
import { formatCPF } from '@/helpers/formatCpf';
import { CameraCapture } from '../CameraCapture';
import { Checkbox } from '../Checkbox';
import { Delivery } from '@/helpers/axios/delivery';
import { Message, MessageProps } from '../message';
import { Loading } from '../loading';

export const Form = () => {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');

  const [clearCpf_cnpj, setClearCpf_cnpj] = useState(false);
  const [clearNumber, setClearNumber] = useState(false);
  const [clearEmail, setClearEmail] = useState(false);

  const [showPhoto, setShowPhoto] = useState(false);

  const [errorMessage, setErrorMesssage] = useState<MessageProps>({
    type: 'error',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let time: NodeJS.Timeout;

    if (errorMessage.message) {
      time = setTimeout(() => {
        setErrorMesssage({
          message: '',
          type: 'error',
        });
      }, 3000);
    }

    return () => clearTimeout(time);
  }, [errorMessage.message]);

  useEffect(() => {
    if (clearCpf_cnpj) {
      setClearCpf_cnpj(false);
    }

    if (clearEmail) {
      setClearEmail(false);
    }

    if (clearNumber) {
      setClearNumber(false);
    }
  }, [clearCpf_cnpj, clearEmail, clearNumber]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const token = sessionStorage.getItem('$token');
    const deliveredByEmail = sessionStorage.getItem('$email');
    const deliveredByName = sessionStorage.getItem('$username');

    if (!token || !deliveredByEmail || !deliveredByName) {
      window.location.href = '/';
      return;
    }

    const image = sessionStorage.getItem('$image');
    const latitude = sessionStorage.getItem('$latitude');
    const longitude = sessionStorage.getItem('$longitude');
    const someoneAtHome = sessionStorage.getItem('$someoneAtHome');

    const { error, message } = await formValidation({
      cpf: formatCPF(cpfCnpj),
      email,
      number,
      token,
      image,
      latitude,
      longitude,
    });

    if (error) {
      setLoading(false);
      setErrorMesssage({
        message,
        type: 'error',
      });

      return;
    }

    await Delivery.create_delivery({
      params: {
        deliveredByEmail,
        deliveredByName,
        imageReference: image!,
        latitude: Number(latitude),
        longitude: Number(longitude),
        recipient: {
          cpf_cnpj: formatCPF(cpfCnpj),
          email,
          number,
          someoneAtHome: Boolean(someoneAtHome) ?? false,
        },
      },
      token,
    });

    setLoading(false);

    setClearCpf_cnpj(true);
    setClearEmail(true);
    setClearNumber(true);

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

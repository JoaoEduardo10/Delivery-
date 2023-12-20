/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { PhotoDisplay } from '../PhotoDisplay';
import { Loading } from '../loading';
import { Message, MessageProps } from '../message';
import { CapturePhoto } from './capturePhoto';
import { StartCapture } from './startCapture';
import { LatitudeAndLongitudeProps, SessionManager } from './sessionManager';

export interface VideoComponetProps {
  setShow: (show: boolean) => void;
}

export const CameraCapture = ({ setShow }: VideoComponetProps) => {
  const videoRef = useRef<any>(null);
  const [image, setImage] = useState('');
  const [showImageDisplay, setShowImageDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMesssage] = useState<MessageProps>({
    type: 'error',
    message: '',
  });
  const [latitudeAndLongitude, setLatitudeAndLongitude] =
    useState<LatitudeAndLongitudeProps>({
      latitude: 0,
      longitude: 0,
    });

  const handleTakeAndSavePhoto = async () => {
    try {
      setLoading(true);

      const { fotoDataURL, latitude, longitude } = await CapturePhoto.get({
        videoRef,
      });

      setImage(fotoDataURL);
      setLatitudeAndLongitude({ latitude, longitude });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setErrorMesssage({ message: error.message, type: 'error' });
    }
  };

  useEffect(() => {
    const start = async () => {
      const { error, message } = await StartCapture.start({ videoRef });

      if (error) {
        setErrorMesssage({
          message,
          type: 'error',
        });
      }
    };

    start();
  }, []);

  useEffect(() => {
    let time: NodeJS.Timeout;

    const { success } = SessionManager.setSessionData({
      image,
      latitudeAndLongitude,
    });

    if (success) {
      setShowImageDisplay(true);
    }

    if (errorMessage.message) {
      time = setTimeout(() => {
        setErrorMesssage({
          message: '',
          type: 'error',
        });
      }, 3000);
    }

    return () => clearTimeout(time);
  }, [image, latitudeAndLongitude, errorMessage.message]);

  return (
    <>
      {loading && <Loading />}
      {showImageDisplay && (
        <PhotoDisplay
          setShow={() => setShowImageDisplay(false)}
          image={image}
        />
      )}
      {errorMessage.message && (
        <Message message={errorMessage.message} type={errorMessage.type} />
      )}
      <section className="video-component">
        <div
          aria-label="icon-close-camera"
          onClick={() => setShow(false)}
          className="icon-close"
        >
          <FaWindowClose />
        </div>
        <div aria-label="conteiner-video" className="conteiner-video">
          <video className="video" ref={videoRef} autoPlay></video>
        </div>
        <button type="button" onClick={handleTakeAndSavePhoto}>
          Tirar foto
        </button>
      </section>
    </>
  );
};

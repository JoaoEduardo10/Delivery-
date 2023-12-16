/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { getLocation } from '../../helpers/getLatitudeAndLongitude';
import { PhotoDisplay } from '../PhotoDisplay';
import { Loading } from '../loading';

interface LatitudeAndLongitudeProps {
  latitude: number;
  longitude: number;
}

export interface VideoComponetProps {
  setShow: (show: boolean) => void;
}

export const CameraCapture = ({ setShow }: VideoComponetProps) => {
  const [image, setImage] = useState('');
  const [latitudeAndLongitude, setLatitudeAndLongitude] =
    useState<LatitudeAndLongitudeProps>({
      latitude: 0,
      longitude: 0,
    });
  const videoRef = useRef<any>(null);
  const [showImageDisplay, setShowImageDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

  const capturePhoto = async () => {
    try {
      const video = videoRef.current;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d') as any;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const fotoDataURL = canvas.toDataURL('image/jpeg');

      const { latitude, longitude } = await getLocation();

      setImage(fotoDataURL);
      setLatitudeAndLongitude({ latitude, longitude });
    } catch (error: any) {
      console.error('Erro ao obter localização:', error.message);
    }
  };

  const startCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error: any) {
      alert(`Não foi possivel abre a camera: ${error.message}`);
    }
  };

  const handleTakeAndSavePhoto = async () => {
    setLoading(true);
    await capturePhoto();
    setLoading(false);
  };

  useEffect(() => {
    startCapture();
  }, []);

  useEffect(() => {
    if (
      image &&
      latitudeAndLongitude.latitude != 0 &&
      latitudeAndLongitude.longitude != 0
    ) {
      sessionStorage.setItem('$image', image);
      sessionStorage.setItem(
        '$latitude',
        latitudeAndLongitude.latitude.toString(),
      );
      sessionStorage.setItem(
        '$longitude',
        latitudeAndLongitude.longitude.toString(),
      );

      setShowImageDisplay(true);
    }
  }, [image, latitudeAndLongitude]);

  return (
    <>
      {loading && <Loading />}
      {showImageDisplay && (
        <PhotoDisplay
          setShow={() => setShowImageDisplay(false)}
          image={image}
        />
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

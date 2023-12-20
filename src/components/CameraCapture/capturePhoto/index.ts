import { getLocation } from '../../../helpers/getLatitudeAndLongitude';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CapturePhotoProps {
  get: {
    videoRef: React.MutableRefObject<any>;
  };
}

class CapturePhoto {
  static async get({ videoRef }: CapturePhotoProps['get']) {
    const video = videoRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Não foi possivel pega a imagem');
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const fotoDataURL = canvas.toDataURL('image/jpeg');

    const { latitude, longitude } = await getLocation();

    return { fotoDataURL, latitude, longitude };
  }
}

export { CapturePhoto };

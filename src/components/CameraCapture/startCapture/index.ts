/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StartCaptureProps {
  start: {
    videoRef: React.MutableRefObject<any>;
  };
}

class StartCapture {
  static async start({ videoRef }: StartCaptureProps['start']) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();

      return { error: false, message: '' };
    } catch (error) {
      return { error: true, message: 'Não foi possivel abre a camera' };
    }
  }
}

export { StartCapture };

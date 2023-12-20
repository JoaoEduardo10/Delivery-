import React from 'react';
import Image from 'next/image';
import { FaWindowClose } from 'react-icons/fa';

export interface PhotoDisplayProps {
  image: string;
  setShow: (show: boolean) => void;
}

export const PhotoDisplay = ({ image, setShow }: PhotoDisplayProps) => {
  return (
    <section className="photo-display" aria-label="photo-display">
      <div
        aria-label="icons-imageDisplay-close"
        onClick={() => setShow(false)}
        className="icon-close-display"
      >
        <FaWindowClose />
      </div>
      <div className="conteiner-image-display">
        <Image src={image} alt="image-display" width={100} height={100} />
      </div>
    </section>
  );
};

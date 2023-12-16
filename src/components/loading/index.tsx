import React from 'react';
import { HashLoader } from 'react-spinners';

export const Loading = () => {
  return (
    <div className="loaging-componet" aria-label="loading">
      <HashLoader className="loading" color="#e7411b" size={100} />
    </div>
  );
};

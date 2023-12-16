import React, { useEffect, useState } from 'react';

export const Checkbox = () => {
  const [isChecked, setChecked] = useState(false);
  const someoneAtHome = sessionStorage.getItem('$someoneAtHome');

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  useEffect(() => {
    if (!someoneAtHome) {
      setChecked(false);
    }
  }, [someoneAtHome]);

  useEffect(() => {
    sessionStorage.setItem('$someoneAtHome', `${isChecked}`);
  }, [isChecked]);

  return (
    <div className="conteiner-checkbox">
      <input
        id="6"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="6">Tem alguém em casa?</label>
    </div>
  );
};

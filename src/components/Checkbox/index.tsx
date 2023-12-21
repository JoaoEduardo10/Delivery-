import React, { useEffect, useState } from 'react';

let someoneAtHome = false;

export const Checkbox = () => {
  const [isChecked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    someoneAtHome = true;
    setChecked(!isChecked);
  };

  useEffect(() => {
    if (!someoneAtHome) {
      setChecked(false);
    }

    sessionStorage.setItem('$someoneAtHome', `${isChecked}`);
  }, [someoneAtHome, isChecked]);

  return (
    <div className="conteiner-checkbox">
      <input
        id="6"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        aria-label="input checkbox"
      />
      <label htmlFor="6" aria-label="label checkbox">
        Tem alguém em casa?
      </label>
    </div>
  );
};

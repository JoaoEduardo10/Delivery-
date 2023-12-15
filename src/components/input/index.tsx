import React, { useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';

const id = uuid();

export interface InputProps {
  type: 'text' | 'email';
  label_name: string;
  onChange: (value: string) => void;
  clear: boolean;
}

export const Input = ({ type, label_name, onChange, clear }: InputProps) => {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    onChange(value);

    if (clear) {
      setValue('');
      setFocus(false);
    }
  }, [value, clear]);

  const handleFocus = () => {
    setFocus(true);
  };

  const hanldeBlur = () => {
    if (value) {
      return;
    }

    setFocus(false);
  };

  return (
    <div aria-label="conteiner input" className="conteiner_input">
      <label
        aria-label="label"
        className={focus ? 'focus_label' : 'blur_label'}
        htmlFor={id}
      >
        {label_name}
      </label>
      <input
        aria-label="input"
        type={type}
        id={id}
        onChange={({ target }) => setValue(target.value)}
        value={value}
        onFocus={handleFocus}
        onBlur={hanldeBlur}
      />
    </div>
  );
};

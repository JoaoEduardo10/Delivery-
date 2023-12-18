import { formatPhoneNumber } from '../../helpers/formatPhoneNumber';
import React, { useEffect, useState } from 'react';

export interface InputProps {
  type: 'text' | 'email' | 'tel' | 'number';
  label_name: string;
  onChange: (value: string) => void;
  clear: boolean;
  id: string;
}

export const Input = ({
  type,
  label_name,
  onChange,
  clear,
  id,
}: InputProps) => {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const [actualKey, setActualKey] = useState('');

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

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (type == 'tel') {
      if (actualKey !== 'Backspace') {
        const numberFormatted = formatPhoneNumber(value);

        setValue(numberFormatted);
        return;
      }

      setValue(value);
    }

    setValue(value);
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
        onChange={handleChangeInput}
        value={value}
        onFocus={handleFocus}
        onBlur={hanldeBlur}
        onKeyDown={({ key }) => setActualKey(key)}
      />
    </div>
  );
};

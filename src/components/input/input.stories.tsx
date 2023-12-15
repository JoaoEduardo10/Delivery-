import React, { useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import { Input, InputProps } from '.';

const meta = {
  title: 'Inputs',
  component: Input,
  args: {
    clear: false,
    label_name: 'text',
    onChange: (value) => console.log(value),
    type: 'text',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

export const TemplateInputWithTypeText = (agrs: InputProps) => {
  const [value, setValue] = useState('');
  const [clear, setClear] = useState(false);

  useEffect(() => {
    if (clear) {
      setClear(false);
    }
    console.log(value);
  }, [clear, value]);

  return (
    <div>
      <Input {...agrs} clear={clear} onChange={(value) => setValue(value)} />
      <button onClick={() => setClear(true)}>Limpar</button>
    </div>
  );
};

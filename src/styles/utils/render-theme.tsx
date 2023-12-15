import React from 'react';
import { render } from '@testing-library/react';
import '../index.scss';

interface RenderThemeProps {
  children: React.ReactNode;
}

const renderTheme = ({ children }: RenderThemeProps) => {
  return render(<div>{children}</div>);
};

export { renderTheme };

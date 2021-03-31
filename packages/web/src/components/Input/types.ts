import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export interface ContainerProps {
  isFilled?: boolean;
  isFocused?: boolean;
  hasError?: boolean;
}

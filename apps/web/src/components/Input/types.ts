import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

export default Props;

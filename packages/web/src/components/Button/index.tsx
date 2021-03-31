import React from 'react';

import Container from './styles';
import Props from './types';

const Button: React.FC<Props> = ({ children, ...rest }) => (
  <Container {...rest}>{children}</Container>
);

export default Button;

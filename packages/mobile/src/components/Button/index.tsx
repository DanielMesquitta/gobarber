import React from 'react';

import { Container, Text } from './styles';
import { Props } from './types';

const Button: React.FC<Props> = ({ children, ...rest }) => (
  <Container {...rest}>
    <Text>{children}</Text>
  </Container>
);

export default Button;

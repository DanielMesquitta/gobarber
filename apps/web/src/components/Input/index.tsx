import React from 'react';

import Container from './styles';
import Props from './types';

const Input: React.FC<Props> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon />}
    <input {...rest} />
  </Container>
);

export default Input;

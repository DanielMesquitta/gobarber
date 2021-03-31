import React from 'react';

import Container from './styles';
import { Props } from './types';

const Tooltip: React.FC<Props> = ({ title, children, ...rest }) => (
  <Container {...rest}>
    <span>{title}</span>
    {children}
  </Container>
);

export default Tooltip;

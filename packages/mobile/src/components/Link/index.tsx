import React from 'react';

import { Container, Text, Icon } from './styles';
import { Props } from './types';

const Link: React.FC<Props> = ({
  icon,
  appearance = 'primary',
  children,
  ...rest
}) => (
  <Container {...rest}>
    {icon && <Icon size={18} name={icon} {...{ appearance }} />}
    <Text {...{ appearance }}>{children}</Text>
  </Container>
);

export default Link;

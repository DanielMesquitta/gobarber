import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Text, Icon } from './styles';
import { Props } from './types';

const Link: React.FC<Props> = ({
  icon,
  appearance = 'primary',
  children,
  href,
  ...rest
}) => {
  const { navigate } = useNavigation();

  return (
    <Container onPress={() => navigate(href)} {...rest}>
      {icon && <Icon size={18} name={icon} {...{ appearance }} />}
      <Text {...{ appearance }}>{children}</Text>
    </Container>
  );
};

export default Link;

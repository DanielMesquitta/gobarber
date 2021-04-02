import React from 'react';

import { colors } from '~/styles';

import { Container, TextInput, Icon } from './styles';
import { Props } from './types';

const Input: React.FC<Props> = ({ icon, name, style, ...rest }) => {
  return (
    <Container style={style}>
      {icon && <Icon size={20} name={icon} />}
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor={colors.gray._200}
        {...rest}
      />
    </Container>
  );
};

export default Input;

import React from 'react';
import { Image } from 'react-native';

import logo from '~/../assets/images/logo.png';
import { Container, Title } from '~/pages/Sign/styles';

const SignIn: React.FC = () => (
  <Container>
    <Image source={logo} />
    <Title>Log In</Title>
  </Container>
);

export default SignIn;

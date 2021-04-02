import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/images/logo.png';
import { Link, Wrapper } from '~/components';
import {
  Container,
  Title,
  Button,
  Input,
  BottomLink,
} from '~/pages/Sign/styles';

const SignIn: React.FC = () => (
  <Wrapper>
    <Container>
      <Image source={logo} />
      <Title>Log In</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Password" />

      <Button>Submit</Button>

      <Link appearance="secondary">Forgot password</Link>
    </Container>
    <BottomLink icon="log-in">Create account</BottomLink>
  </Wrapper>
);

export default SignIn;

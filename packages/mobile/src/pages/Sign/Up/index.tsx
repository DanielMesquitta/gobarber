import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/images/logo.png';
import { Wrapper } from '~/components';
import { useKeyboard } from '~/hooks';
import {
  Container,
  Title,
  Button,
  Input,
  BottomLink,
} from '~/pages/Sign/styles';

const SignUp: React.FC = () => {
  const { isKeyboardOpen } = useKeyboard();

  return (
    <Wrapper>
      <Container>
        <Image source={logo} />
        <Title>Create account</Title>

        <Input name="name" icon="user" placeholder="Name" />
        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Password" />

        <Button>Submit</Button>
      </Container>
      {!isKeyboardOpen && (
        <BottomLink href="SignIn" appearance="secondary" icon="arrow-left">
          Log in
        </BottomLink>
      )}
    </Wrapper>
  );
};

export default SignUp;

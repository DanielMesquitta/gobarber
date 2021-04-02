import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/images/logo.png';
import { Link, Wrapper } from '~/components';
import { useKeyboard } from '~/hooks';
import {
  Container,
  Title,
  Button,
  Input,
  BottomLink,
} from '~/pages/Sign/styles';

const SignIn: React.FC = () => {
  const { isKeyboardOpen } = useKeyboard();

  return (
    <Wrapper>
      <Container>
        <Image source={logo} />
        <Title>Log In</Title>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Password" />

        <Button>Submit</Button>

        <Link href="SignIn" appearance="secondary">
          Forgot password
        </Link>
      </Container>
      {!isKeyboardOpen && (
        <BottomLink href="SignUp" icon="log-in">
          Create account
        </BottomLink>
      )}
    </Wrapper>
  );
};

export default SignIn;

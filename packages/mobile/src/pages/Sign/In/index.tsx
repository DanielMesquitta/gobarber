import React, { useCallback, useRef } from 'react';
import { Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import logo from '~/assets/images/logo.png';
import { Link, Wrapper } from '~/components';
import { useAuth, useKeyboard } from '~/hooks';
import {
  Container,
  Title,
  Button,
  Input,
  BottomLink,
} from '~/pages/Sign/styles';
import { getValidationErrors } from '~/utils';

import { FormData } from './types';

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const { isKeyboardOpen } = useKeyboard();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordRef = useRef(null);

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    async (credentials) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Invalid e-mail format')
            .required('The e-mail is required'),
          password: Yup.string().required('The password is required'),
        });
        await schema.validate(credentials, { abortEarly: false });
        try {
          await signIn(credentials);
          Alert.alert('Success', 'You successfully logged in');
          navigate('Dashboard');
        } catch ({ response }) {
          Alert.alert('Error', response.data.message);
        }
      } catch (err) {
        formRef.current.setErrors(getValidationErrors(err));
      }
    },
    [navigate, signIn]
  );

  return (
    <Wrapper>
      <Container>
        <Image source={logo} />
        <Title>Log In</Title>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            icon="mail"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={passwordRef.current?.focus}
          />
          <Input
            ref={passwordRef}
            name="password"
            icon="lock"
            placeholder="Password"
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={formRef.current?.submitForm}
          />
          <Button onPress={formRef.current?.submitForm}>Submit</Button>
        </Form>
        <Link href="SignUp" appearance="secondary">
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

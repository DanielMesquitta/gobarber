import React, { useCallback, useRef } from 'react';
import { Image, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

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
import { api } from '~/services';
import { getValidationErrors } from '~/utils';

import { FormData } from './types';

const SignUp: React.FC = () => {
  const { isKeyboardOpen } = useKeyboard();
  const { navigate } = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = useCallback<SubmitHandler<FormData>>(
    async (data) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('The name field is required'),
          email: Yup.string()
            .email('Invalid e-mail format')
            .required('The e-mail field is required'),
          password: Yup.string().min(
            6,
            'The password length needs to be greater than 6'
          ),
        });
        await schema.validate(data, { abortEarly: false });
        try {
          await api.post('/users', data);
          Alert.alert(
            'Success',
            'Successfully created an account, you can now log in'
          );
          navigate('SignIn');
        } catch ({ response }) {
          Alert.alert('Error', response.data.message);
        }
      } catch (err) {
        formRef.current.setErrors(getValidationErrors(err));
      }
    },
    [navigate]
  );

  return (
    <Wrapper>
      <Container>
        <Image source={logo} />
        <Title>Create account</Title>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            icon="user"
            placeholder="Name"
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={emailRef.current?.focus}
          />
          <Input
            ref={emailRef}
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
            textContentType="newPassword"
            returnKeyType="send"
            onSubmitEditing={formRef.current?.submitForm}
          />
          <Button onPress={formRef.current?.submitForm}>Submit</Button>
        </Form>
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

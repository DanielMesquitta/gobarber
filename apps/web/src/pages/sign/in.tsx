import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { Logo } from '~/assets';
import { Button, Input } from '~/components';
import { useAuth, useToast } from '~/hooks';
import { PublicRouter } from '~/services';
import { Container, Content, Background } from '~/styles/pages/Sign';
import { getValidationErrors } from '~/utils';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();

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
          addToast({
            type: 'success',
            title: 'Success',
            description: 'You successfully logged in.',
          });
          router.replace('/dashboard');
        } catch (err) {
          addToast({
            type: 'error',
            title: 'Error',
            description: 'Failed to log in, verify your credentials.',
          });
        }
      } catch (err) {
        formRef.current.setErrors(getValidationErrors(err));
      }
    },
    [addToast, router, signIn]
  );

  return (
    <Container>
      <Content>
        <Logo />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Log in</h1>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Enter</Button>
          <Link href="/sign/recover">Forgot password</Link>
        </Form>

        <Link href="/sign/up">
          <button type="button">
            <FiLogIn />
            Create account
          </button>
        </Link>
      </Content>
      <Background url="/sign-in-background.png" />
    </Container>
  );
};

export default PublicRouter(SignIn);

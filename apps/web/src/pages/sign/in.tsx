import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import * as Yup from 'yup';

import { Logo } from '~/assets';
import { Button, Input } from '~/components';
import { Container, Content, Background } from '~/styles/pages/Sign';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: FormData) => {}, []);

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

export default SignIn;

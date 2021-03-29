import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Link from 'next/link';

import { Logo } from '~/assets';
import { Button, Input } from '~/components';
import { Container, Content, Background } from '~/styles/pages/Sign';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background url="/sign-up-background.png" />
      <Content>
        <Logo />
        <form>
          <h1>Create account</h1>
          <Input icon={FiUser} name="name" placeholder="Name" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Sign up</Button>
        </form>

        <Link href="/sign/in">
          <button type="button">
            <FiArrowLeft />I already have an account
          </button>
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;

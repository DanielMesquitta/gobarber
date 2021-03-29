import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Link from 'next/link';

import { Logo } from '~/assets';
import { Button, Input } from '~/components';
import { Container, Content, Background } from '~/styles/pages/Sign';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo />
        <form>
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
        </form>

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

import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import Link from 'next/link';

import { Logo } from '~/assets';
import { Container, Content, Background } from '~/styles/pages/SignIn';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo />
        <form>
          <h1>Log in</h1>
          <input type="email" required placeholder="E-mail" />
          <input type="password" required placeholder="Password" />
          <button type="submit">Enter</button>
          <Link href="/sign/recover">Forgot password</Link>
        </form>

        <Link href="/sign/up">
          <a>
            <FiLogIn />
            Create account
          </a>
        </Link>
      </Content>
      <Background></Background>
    </Container>
  );
};

export default SignIn;

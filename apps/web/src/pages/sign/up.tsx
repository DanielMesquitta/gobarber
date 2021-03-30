import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Link from 'next/link';
import * as Yup from 'yup';

import { Logo } from '~/assets';
import { Button, Input } from '~/components';
import { Container, Content, Background } from '~/styles/pages/Sign';
import { getValidationErrors } from '~/utils';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback<SubmitHandler<FormData>>(async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('The name field is required'),
        email: Yup.string()
          .email('Invalid email format')
          .required('The email field is required'),
        password: Yup.string().min(
          6,
          'The password length needs to be greater than 6'
        ),
      });
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      formRef.current.setErrors(getValidationErrors(err));
    }
  }, []);

  return (
    <Container>
      <Background url="/sign-up-background.png" />
      <Content>
        <Logo />
        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

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

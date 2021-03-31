import styled from 'styled-components';

import Button from '~/components/Button/styles';
import { Container as Input } from '~/components/Input/styles';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 70rem;

  form {
    width: 34rem;
    margin: 8rem 0;
    text-align: center;

    h1 {
      margin-bottom: 2.4rem;
    }

    ${Input} {
      & + ${Input} {
        margin-top: 0.8rem;
      }
    }

    ${Button} {
      margin-top: 1.6rem;
      width: 100%;
    }

    a {
      &,
      &:visited {
        display: block;
        margin-top: 2.4rem;

        &:hover {
          color: ${({ theme }) => theme.colors.gray._100};
        }
      }
    }
  }

  > button {
    color: ${({ theme }) => theme.colors.primary._100};
    display: flex;
    align-items: center;

    svg {
      margin-right: 1.6rem;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary._200};
    }
  }
`;

interface BackgroundProps {
  url: string;
}

export const Background = styled.div<BackgroundProps>`
  flex: 1;
  background: url(${({ url }) => url}) no-repeat center;
  background-size: cover;
`;

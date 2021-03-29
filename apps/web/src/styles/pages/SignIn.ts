import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 70rem;

  form {
    width: 34rem;
    text-align: center;

    h1 {
      margin-bottom: 2.4rem;
    }

    input {
      background: ${({ theme }) => theme.colors.gray._400};
      border: 2px solid ${({ theme }) => theme.colors.gray._400};
      border-radius: 0.4rem;
      padding: 1.6rem;
      width: 100%;

      &::placeholder {
        color: ${({ theme }) => theme.colors.gray._200};
      }

      & + input {
        margin-top: 0.8rem;
      }
    }

    button {
      background: ${({ theme }) => theme.colors.primary._100};
      color: ${({ theme }) => theme.colors.gray._300};
      font-weight: ${({ theme }) => theme.typography.weight.bold};
      height: 5.6rem;
      border-radius: 0.4rem;
      padding: 1.6rem;
      margin-top: 1.6rem;
      width: 100%;

      &:hover {
        background: ${({ theme }) => theme.colors.primary._200};
      }
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

  > a {
    &,
    &:visited {
      color: ${({ theme }) => theme.colors.primary._100};
      display: flex;
      align-items: center;
      margin-bottom: 3.2rem;

      svg {
        margin-right: 1.6rem;
      }

      &:hover {
        color: ${({ theme }) => theme.colors.primary._200};
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url('/sign-in-background.png') no-repeat center;
  background-size: cover;
`;

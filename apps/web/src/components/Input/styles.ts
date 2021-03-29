import styled from 'styled-components';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.gray._400};
  border: 2px solid ${({ theme }) => theme.colors.gray._400};
  border-radius: 0.4rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 1.6rem;

  svg {
    margin-right: 1.6rem;
    color: ${({ theme }) => theme.colors.gray._200};
  }

  input {
    padding: 1.6rem;
    padding-left: 0;
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray._200};
    }
  }
`;

export default Container;

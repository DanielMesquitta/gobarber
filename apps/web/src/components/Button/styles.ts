import styled from 'styled-components';

const Container = styled.button`
  background: ${({ theme }) => theme.colors.primary._100};
  color: ${({ theme }) => theme.colors.gray._300};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  height: 5.6rem;
  border-radius: 0.4rem;
  padding: 1.6rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary._200};
  }
`;

export default Container;

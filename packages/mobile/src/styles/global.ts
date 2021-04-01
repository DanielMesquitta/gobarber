import styled from 'styled-components/native';

const GlobalContainer = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.gray._300};
`;

export default GlobalContainer;

import styled from 'styled-components/native';

import {
  Button as StyledButton,
  Input as StyledInput,
  Link,
} from '~/components';

export const Container = styled.View`
  position: relative;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray._000};
  font-family: ${({ theme }) => theme.fonts.bold};
  margin: 64px 0 24px;
`;

export const Input = styled(StyledInput)`
  margin-bottom: 8px;
`;

export const Button = styled(StyledButton)`
  margin-top: 8px;
`;

export const BottomLink = styled(Link)`
  width: 100%;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.gray._400};
  background: ${({ theme }) => theme.colors.gray._300};
`;

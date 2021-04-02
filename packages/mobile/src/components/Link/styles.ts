import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { IconProps, TextProps } from './types';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
`;

export const Text = styled.Text<TextProps>`
  font-size: 16px;
  color: ${({ theme, appearance }) =>
    appearance === 'primary'
      ? theme.colors.primary._100
      : theme.colors.gray._000};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 16px;
  color: ${({ theme, appearance }) =>
    appearance === 'primary'
      ? theme.colors.primary._100
      : theme.colors.gray._000};
`;

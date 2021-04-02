import { View, TextInput as RNTextInput } from 'react-native';

import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Container = styled(View)`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.gray._400};
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled(RNTextInput)`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray._000};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.gray._200};
`;

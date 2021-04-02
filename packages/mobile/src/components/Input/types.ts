import { TextInputProps } from 'react-native';

export interface Props extends TextInputProps {
  name: string;
  icon?: string;
}

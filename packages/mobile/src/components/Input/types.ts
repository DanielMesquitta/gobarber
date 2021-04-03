import { TextInput, TextInputProps } from 'react-native';

export interface Props extends TextInputProps {
  name: string;
  icon?: string;
}

export interface InputProps extends TextInput {
  value: string;
}

export interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export interface IconProps {
  isFocused: boolean;
  isFilled: boolean;
}

export interface ForwardRef {
  focus: () => void;
}

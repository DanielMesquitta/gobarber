import React, {
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import { useField } from '@unform/core';

import { colors } from '~/styles';

import { Container, TextInput, Icon } from './styles';
import { Props, InputProps, ForwardRef } from './types';

const Input: React.ForwardRefRenderFunction<ForwardRef, Props> = (
  { icon, name, style, ...rest },
  ref
) => {
  const {
    registerField,
    defaultValue = '',
    fieldName,
    error,
    clearError,
  } = useField(name);

  const inputRef = useRef<InputProps>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;
        return '';
      },
      setValue(_, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = String(value);
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleInputClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleChangeText = useCallback((text) => {
    if (inputRef.current) inputRef.current.value = text;
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
    if (error) clearError();
  }, [clearError, error]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));

  return (
    <Container
      onPress={handleInputClick}
      activeOpacity={1}
      hasError={!!error}
      {...{ style, isFocused }}
    >
      {icon && <Icon size={20} name={icon} {...{ isFocused, isFilled }} />}
      <TextInput
        ref={inputRef as any}
        keyboardAppearance="dark"
        placeholderTextColor={colors.gray._200}
        onChangeText={handleChangeText}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...{ defaultValue }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);

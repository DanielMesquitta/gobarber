import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

import { colors } from '~/styles';

import { Container, Error } from './styles';
import { Props } from './types';

const Input: React.FC<Props> = ({ icon: Icon, name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { registerField, fieldName, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  const handleIconClick = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <Container {...{ isFilled, isFocused, hasError: !!error }}>
      {Icon && <Icon onClick={handleIconClick} />}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color={colors.status.error} />
        </Error>
      )}
    </Container>
  );
};

export default Input;

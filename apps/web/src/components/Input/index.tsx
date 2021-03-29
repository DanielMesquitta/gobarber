import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

import Container from './styles';
import Props from './types';

const Input: React.FC<Props> = ({ icon: Icon, name, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    registerField,
    fieldName,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon />}
      <input
        ref={inputRef}
        defaultValue={defaultValue}
        onFocus={clearError}
        {...rest}
      />
    </Container>
  );
};

export default Input;

import styled, { css } from 'styled-components';

import { Tooltip } from '~/components';

import { ContainerProps } from './types';

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.colors.gray._400};
  border: 2px solid ${({ theme }) => theme.colors.gray._400};
  border-radius: 0.4rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1.6rem;

  svg {
    margin-right: 1.6rem;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.gray._200};
  }

  ${({ isFilled, isFocused }) =>
    (isFilled || isFocused) &&
    css`
      svg {
        color: ${({ theme }) => theme.colors.primary._100};
      }

      ${isFocused &&
      css`
        border: 2px solid ${({ theme }) => theme.colors.primary._100};
      `}
    `}

  ${({ hasError }) =>
    hasError &&
    css`
      border: 2px solid ${({ theme }) => theme.colors.status.error};
    `}

  input {
    padding: 1.6rem 0;
    width: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray._200};
    }
  }
`;

export const Error = styled(Tooltip)`
  svg {
    margin: 0;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.status.error};
  }

  span {
    color: ${({ theme }) => theme.colors.gray._000} !important;
    background: ${({ theme }) => theme.colors.status.error} !important;

    &::before {
      border-color: ${({ theme }) => theme.colors.status.error} transparent !important;
    }
  }
`;

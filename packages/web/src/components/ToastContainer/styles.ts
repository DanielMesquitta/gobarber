import styled from 'styled-components';

import { hexToRgba } from '~/utils';

import { ToastProps } from './types';

export const Container = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  padding: 3rem;
  overflow: hidden;
`;

export const Toast = styled.div<ToastProps>`
  width: 36rem;
  position: relative;
  padding: 1.6rem 3rem 1.6rem 1.6rem;
  border-radius: 0.4rem;
  box-shadow: 0 0.2rem 0.8rem
    ${({ theme }) => hexToRgba(theme.colors.gray._400, 0.2)};
  display: flex;
  background: ${({ theme, type }) => theme.colors.status[type || 'info']._100};
  color: ${({ theme, type }) => theme.colors.status[type || 'info']._200};

  & + & {
    margin-top: 0.8rem;
  }

  > svg {
    margin-right: 1.2rem;
  }

  div {
    flex: 1;

    p {
      margin-top: 0.4rem;
      font-size: ${({ theme }) => theme.typography.size.caption};
      opacity: 0.8;
      line-height: 1.4;
    }
  }

  button {
    position: absolute;
    right: 1.6rem;
    top: 1.6rem;
    opacity: 0.6;
    border: 0;
    color: inherit;
  }
`;

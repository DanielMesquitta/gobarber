import styled from 'styled-components';

const Container = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus {
    span {
      opacity: 1;
      display: inline-block;
    }
  }

  span {
    display: none;
    opacity: 0;
    background: ${({ theme }) => theme.colors.primary._100};
    color: ${({ theme }) => theme.colors.gray._300};
    font-size: ${({ theme }) => theme.typography.size.caption};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    width: 16rem;
    padding: 0.8rem;
    border-radius: 0.4rem;
    position: absolute;
    bottom: calc(100% + 1.2rem);
    left: 50%;
    transform: translateX(-50%);

    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 100%);
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.primary._100} transparent;
      border-width: 6px 6px 0 6px;
    }
  }
`;

export default Container;

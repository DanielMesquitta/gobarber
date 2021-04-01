import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray._000};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-weight: 500;
  margin: 64px 0 24px;
`;

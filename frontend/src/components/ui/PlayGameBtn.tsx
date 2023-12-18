import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.btnText};
  border: none;
  border-radius: 15px;
  margin: 0;
  padding: 10px;
  width: 150px;
  font-family: ${({ theme }) => theme.fonts.btnFont};
  font-size: ${({ theme }) => theme.fontSizes.xsmall};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
    transform: scale(0.98);
    filter: brightness(1.1);
  }
`;

function PlayGameBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <Button {...props} />;
}

export default PlayGameBtn;

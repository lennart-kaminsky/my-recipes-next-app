import styled, { css } from "styled-components";

export function ChangeButton({ display, children, onChangeDisplay, left }) {
  return (
    <StyledChangeButton
      $left={left}
      type="button"
      disabled={display}
      onClick={onChangeDisplay}
    >
      {children}
    </StyledChangeButton>
  );
}

export function PortionsButton({
  onClick,
  children,
  disabled,
  $single,
  $isHighlighted,
}) {
  return (
    <StyledPortionsButton
      $isHighlighted={$isHighlighted}
      $single={$single}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledPortionsButton>
  );
}

export function ButtonNoStyle({ children, onClick }) {
  return <ButtonNotStyled onClick={onClick}>{children}</ButtonNotStyled>;
}

export function CircleButton({ children, onClick }) {
  return <StyledCircleButton onClick={onClick}>{children}</StyledCircleButton>;
}

const StyledCircleButton = styled.button`
  color: var(--secondary-bg-color);
  font-size: 1.5rem;
  background-color: var(--secondary-color);
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 100%;
  position: absolute;
  padding: 0.25rem 0.7rem;
  top: 1.5rem;
  right: 1.5rem;
`;

const StyledChangeButton = styled.button`
  width: 50%;
  padding: 15px 0;
  background-color: rgba(0, 0, 0, 50%);
  font-size: 1.3rem;
  color: white;
  border: none;
  border-radius: ${({ $left }) => ($left ? "10px 0 0 10px" : "0 10px 10px 0")};
  &:disabled {
    color: var(--secondary-color);
    background-color: rgba(0, 0, 0, 80%);
  }
`;

const StyledPortionsButton = styled.button`
  border: none;
  background: none;
  color: ${({ $isHighlighted }) =>
    $isHighlighted ? "var(--primary-color)" : "var(--secondary-color)"};
  padding-inline: 15px;
  ${({ $single }) =>
    $single &&
    css`
      padding-inline: 20px;
      background-color: var(--secondary-bg-color);
      border-radius: 20px;
    `}
`;

const ButtonNotStyled = styled.button`
  border: none;
  background: none;
  color: var(--secondary-color);
`;

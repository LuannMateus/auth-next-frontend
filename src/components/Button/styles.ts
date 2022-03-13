import styled, { css } from 'styled-components';
import { ButtonProps } from '.';

export const Button = styled.button<Pick<ButtonProps, 'color'>>`
  ${({ theme, color }) => css`
    background: ${theme.colors[color]};
    border: none;
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.normal};
    padding: ${theme.spacings.xsmall} ${theme.spacings.medium};
    cursor: pointer;
    border-radius: ${theme.spacings.tiny};
    transition: ${theme.transitions.fast};
    display: flex;
    align-items: center;
    justify-content: center;
    &:focus {
      outline: none;
      box-shadow: 0 0 ${theme.spacings.tiny} ${theme.colors[color]};
      filter: brightness(110%);
    }
    &:hover {
      filter: brightness(90%);
    }
    &:disabled {
      background: ${theme.colors.gray4};
      color: ${theme.colors.gray1};
      cursor: not-allowed;
      &:hover {
        filter: none;
      }
    }
    > svg {
      width: 2rem;
      height: 2rem;
      margin-left: 1rem;
    }
  `}
`;

export const DeleteButton = styled.button`
  ${() => css`
    width: 5rem;

    align-self: flex-end;

    border: none;
    background: none;

    cursor: pointer;

    transition: filter 300ms ease-in-out;

    > svg {
      color: red;
      width: 2rem;
    }

    &:hover {
      filter: brightness(75%);
    }

    &:disabled {
      opacity: 0.5;
    }
  `}
`;

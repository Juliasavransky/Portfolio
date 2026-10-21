import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Link from 'next/link';

export const Container = styled.div`
  width: 100%;
  max-width: var(--maxw);
  margin-inline: auto;
  padding-inline: var(--gutter);
`;

export const Section = styled.section`
  padding-block: clamp(3rem, 8vw, 5.5rem);

  & + & {
    border-block-start: 1px solid var(--divider);
  }
`;

export const H1 = styled.h1`
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.15;
  font-weight: 700;
  text-wrap: balance;
`;

export const H2 = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  font-weight: 700;
  margin-block-end: 1.5rem;
  text-wrap: balance;
`;

export const Lead = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  color: var(--text-muted);
  max-width: 38em;
  margin-block-start: 1rem;
  text-wrap: pretty;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-block-start: 2rem;
`;

const button = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius);
  border: 2px solid transparent;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 160ms var(--ease-out),
    background-color 160ms ease,
    border-color 160ms ease;

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const variants = {
  primary: css`
    background: var(--accent);
    color: var(--on-accent);
    @media (hover: hover) {
      &:hover {
        background: #ffd633;
      }
    }
  `,
  secondary: css`
    background: transparent;
    color: var(--text);
    border-color: var(--line);
    @media (hover: hover) {
      &:hover {
        border-color: var(--accent);
      }
    }
  `,
  whatsapp: css`
    background: var(--whatsapp);
    color: var(--on-accent);
    @media (hover: hover) {
      &:hover {
        background: #3ee07a;
      }
    }
  `,
};

export type ButtonVariant = keyof typeof variants;

export const LinkButton = styled(Link)<{ $variant?: ButtonVariant }>`
  ${button}
  ${({ $variant = 'primary' }) => variants[$variant]}
`;

export const AnchorButton = styled.a<{ $variant?: ButtonVariant }>`
  ${button}
  ${({ $variant = 'primary' }) => variants[$variant]}
`;

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  ${button}
  ${({ $variant = 'primary' }) => variants[$variant]}
`;

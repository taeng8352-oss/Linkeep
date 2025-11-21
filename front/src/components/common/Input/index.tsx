import { InputHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import * as S from "./style";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
};

export function Input({ label, hint, ...props }: InputProps) {
  return (
    <S.InputWrapper>
      {label && <S.Label>{label}</S.Label>}
      <S.StyledInput {...props} />
      {hint && <S.Hint>{hint}</S.Hint>}
    </S.InputWrapper>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  children: ReactNode;
};

export function Select({ label, children, ...props }: SelectProps) {
  return (
    <S.InputWrapper>
      {label && <S.Label>{label}</S.Label>}
      <S.StyledSelect {...props}>{children}</S.StyledSelect>
    </S.InputWrapper>
  );
}

import { ButtonHTMLAttributes } from "react";
import * as S from "./style";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <S.StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </S.StyledButton>
  );
}

import { ReactNode } from "react";
import * as S from "./style";

type CardProps = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

export function Card({ title, description, children }: CardProps) {
  return (
    <S.CardContainer>
      {title && <S.CardTitle>{title}</S.CardTitle>}
      {description && <S.CardDescription>{description}</S.CardDescription>}
      {children}
    </S.CardContainer>
  );
}

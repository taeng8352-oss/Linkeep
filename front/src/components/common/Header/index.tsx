import { useNavigate } from "react-router-dom";
import * as S from "./style";

type HeaderProps = {
  variant?: "default" | "host" | "spot";
  showBack?: boolean;
  onBack?: () => void;
};

export function Header({ variant = "default", showBack = false, onBack }: HeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  if (variant === "host") {
    return (
      <S.HeaderContainer>
        <S.HeaderContent>
          <S.Logo to="/">Linkeep</S.Logo>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#2563eb" }}>
            호스트 센터
          </span>
          <S.HeaderSpacer />
        </S.HeaderContent>
      </S.HeaderContainer>
    );
  }

  if (variant === "spot") {
    return (
      <S.HeaderContainer>
        <S.HeaderContent>
          {showBack && (
            <S.BackButton onClick={handleBack}>
              ← 뒤로
            </S.BackButton>
          )}
          <S.Logo to="/">Linkeep</S.Logo>
          <S.HeaderSpacer />
        </S.HeaderContent>
      </S.HeaderContainer>
    );
  }

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        {showBack && (
          <S.BackButton onClick={handleBack}>
            ← 뒤로
          </S.BackButton>
        )}
        <S.Logo to="/">Linkeep</S.Logo>
        {!showBack && <S.NavLink to="/host">호스트 센터</S.NavLink>}
        {showBack && <S.HeaderSpacer />}
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}

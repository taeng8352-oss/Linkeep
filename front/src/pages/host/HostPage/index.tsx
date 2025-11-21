import { Header } from "@/components/common";
import * as S from "./style";

export default function HostPage() {
  return (
    <S.Main>
      <Header variant="host" />
      <S.Content>
        <S.TokenSection>
          <S.SectionTitle>호스트 센터</S.SectionTitle>
          <S.SectionDescription>
            호스트 관리 기능은 준비 중입니다.
          </S.SectionDescription>
        </S.TokenSection>
      </S.Content>
    </S.Main>
  );
}

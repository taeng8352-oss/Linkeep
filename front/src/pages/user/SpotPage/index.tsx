import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header, Button } from "@/components/common";
import { spotApi } from "@/api";
import type { Spot } from "@/types";
import * as S from "./style";

export default function SpotPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    const fetchSpot = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await spotApi.getById(uuid);
        setSpot(data);
      } catch (err) {
        console.error(err);
        setError("점포 정보를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpot();
  }, [uuid]);

  if (loading) {
    return (
      <S.LoadingContainer>
        <S.LoadingText>점포 정보를 불러오는 중...</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  if (error || !spot) {
    return (
      <S.ErrorContainer>
        <S.ErrorMessage>{error || "점포 정보를 찾을 수 없습니다."}</S.ErrorMessage>
        <Button variant="outline" onClick={() => navigate(-1)}>
          뒤로 가기
        </Button>
      </S.ErrorContainer>
    );
  }

  const displayPrice = `₩${(spot.price_per_bag || 0).toLocaleString()}/개`;
  const openTime = spot.open_time ?? "09:00";
  const closeTime = spot.close_time ?? "22:00";

  return (
    <S.Container>
      <Header variant="spot" showBack />

      <S.HeroImage>
        {spot.image_url ? (
          <img src={spot.image_url} alt={spot.name} />
        ) : (
          <img src="/spots/hero-luggage-seoul-wide.png" alt="짐보관소" />
        )}
        <S.BadgeContainer>
          <S.PriceBadge>{displayPrice}</S.PriceBadge>
          <S.AvailabilityBadge>여유</S.AvailabilityBadge>
        </S.BadgeContainer>
      </S.HeroImage>

      <S.MainContent>
        <S.InfoSection>
          <S.SpotName>{spot.name}</S.SpotName>
          <S.Address>{spot.address}</S.Address>
          {spot.description && (
            <S.InfoDescription>{spot.description}</S.InfoDescription>
          )}
        </S.InfoSection>

        <S.CardGrid>
          <S.InfoCard>
            <S.CardLabel>보관 요금</S.CardLabel>
            <S.CardValue>{displayPrice}</S.CardValue>
          </S.InfoCard>
          <S.InfoCard>
            <S.CardLabel>영업 시간</S.CardLabel>
            <S.CardValue>{openTime}~{closeTime}</S.CardValue>
          </S.InfoCard>
          <S.InfoCard>
            <S.CardLabel>최대 수량</S.CardLabel>
            <S.CardValue>{spot.max_bags}개</S.CardValue>
          </S.InfoCard>
        </S.CardGrid>

        <S.FeatureSection>
          <S.FeatureList>
            <S.FeatureItem>
              <S.FeatureIcon>🧳</S.FeatureIcon>
              <span>모든 사이즈 보관 가능</span>
            </S.FeatureItem>
            <S.FeatureItem>
              <S.FeatureIcon>🔐</S.FeatureIcon>
              <span>CCTV/실내 보관으로 안전</span>
            </S.FeatureItem>
            <S.FeatureItem>
              <S.FeatureIcon>✅</S.FeatureIcon>
              <span>운영 시간 내 직원 상주</span>
            </S.FeatureItem>
          </S.FeatureList>
        </S.FeatureSection>

        <S.BookingButton>
          <Button fullWidth onClick={() => navigate(`/spot/${uuid}/book`)}>
            예약하기
          </Button>
        </S.BookingButton>
      </S.MainContent>
    </S.Container>
  );
}

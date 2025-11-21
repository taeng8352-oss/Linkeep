import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header, Button } from "@/components/common";
import { reservationApi } from "@/api";
import type { Reservation } from "@/types";
import * as S from "./style";

interface LocationState {
  reservationId: string;
}

export default function CompletePage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state?.reservationId) return;

    const fetchReservation = async () => {
      try {
        const data = await reservationApi.getById(state.reservationId);
        setReservation(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [state?.reservationId]);

  if (!state?.reservationId) {
    return (
      <S.ErrorContainer>
        <S.ErrorMessage>예약 정보가 없습니다.</S.ErrorMessage>
        <Button variant="outline" onClick={() => navigate("/")}>홈으로</Button>
      </S.ErrorContainer>
    );
  }

  if (loading) {
    return (
      <S.LoadingContainer>
        <S.LoadingText>예약 정보를 불러오는 중...</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  if (!reservation) {
    return (
      <S.ErrorContainer>
        <S.ErrorMessage>예약 정보를 찾을 수 없습니다.</S.ErrorMessage>
        <Button variant="outline" onClick={() => navigate("/")}>홈으로</Button>
      </S.ErrorContainer>
    );
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const spot = reservation.spots;
  const mapUrl = spot?.latitude && spot?.longitude
    ? `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`
    : null;

  return (
    <S.Container>
      <Header />

      <S.MainContent>
        <S.SuccessIcon>✅</S.SuccessIcon>
        <S.Title>예약 완료!</S.Title>
        <S.Subtitle>예약이 성공적으로 완료되었습니다.</S.Subtitle>

        <S.ReservationCard>
          <S.CardTitle>예약 정보</S.CardTitle>

          <S.InfoRow>
            <S.InfoLabel>점포</S.InfoLabel>
            <S.InfoValue>{spot?.name || "점포"}</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>주소</S.InfoLabel>
            <S.InfoValue>{spot?.address || "-"}</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>맡기는 시간</S.InfoLabel>
            <S.InfoValue>{formatDateTime(reservation.start_time)}</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>찾는 시간</S.InfoLabel>
            <S.InfoValue>{formatDateTime(reservation.end_time)}</S.InfoValue>
          </S.InfoRow>

          <S.InfoRow>
            <S.InfoLabel>짐 개수</S.InfoLabel>
            <S.InfoValue>{reservation.bags}개</S.InfoValue>
          </S.InfoRow>

          <S.Divider />

          <S.InfoRow>
            <S.InfoLabel>결제 금액</S.InfoLabel>
            <S.PriceValue>₩{reservation.total_price.toLocaleString()}</S.PriceValue>
          </S.InfoRow>
        </S.ReservationCard>

        {mapUrl && (
          <S.MapSection>
            <S.MapPlaceholder>
              <S.MapIcon>📍</S.MapIcon>
              <S.MapText>지도에서 위치 확인</S.MapText>
            </S.MapPlaceholder>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.open(mapUrl, "_blank")}
            >
              Google Maps에서 열기
            </Button>
          </S.MapSection>
        )}

        <S.ButtonGroup>
          <Button fullWidth onClick={() => navigate("/")}>
            홈으로
          </Button>
        </S.ButtonGroup>
      </S.MainContent>
    </S.Container>
  );
}

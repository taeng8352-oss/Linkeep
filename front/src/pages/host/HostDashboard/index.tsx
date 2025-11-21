import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button, Card } from "@/components/common";
import { hostSpotApi, hostReservationApi } from "@/api";
import { useHostAuth } from "@/hooks/useHostAuth";
import type { Spot, Reservation } from "@/types";
import * as S from "./style";

export default function HostDashboard() {
  const navigate = useNavigate();
  const { host, isAuthenticated, isLoading, logout } = useHostAuth();

  const [spots, setSpots] = useState<Spot[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/host/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        const [spotsData, reservationsData] = await Promise.all([
          hostSpotApi.getAll(),
          hostReservationApi.getToday(),
        ]);
        setSpots(spotsData);
        setReservations(reservationsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/host/login");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || loading) {
    return (
      <S.LoadingContainer>
        <S.LoadingText>로딩 중...</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <Header />

      <S.MainContent>
        <S.TopSection>
          <S.Welcome>안녕하세요, {host?.name}님</S.Welcome>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </S.TopSection>

        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>내 점포</S.SectionTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/host/spots/new")}>
              + 점포 등록
            </Button>
          </S.SectionHeader>

          {spots.length === 0 ? (
            <S.EmptyState>
              등록된 점포가 없습니다.
            </S.EmptyState>
          ) : (
            <S.SpotList>
              {spots.map((spot) => (
                <S.SpotCard key={spot.id}>
                  <S.SpotInfo>
                    <S.SpotName>{spot.name}</S.SpotName>
                    <S.SpotAddress>{spot.address}</S.SpotAddress>
                  </S.SpotInfo>
                  <S.QRButton onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/spot/${spot.id}`);
                    alert("QR 링크가 복사되었습니다!");
                  }}>
                    QR 복사
                  </S.QRButton>
                </S.SpotCard>
              ))}
            </S.SpotList>
          )}
        </S.Section>

        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>오늘의 예약</S.SectionTitle>
          </S.SectionHeader>

          {reservations.length === 0 ? (
            <S.EmptyState>
              오늘 예약이 없습니다.
            </S.EmptyState>
          ) : (
            <S.ReservationList>
              {reservations.map((reservation) => (
                <Card key={reservation.id}>
                  <S.ReservationInfo>
                    <S.GuestName>{reservation.guest_name}</S.GuestName>
                    <S.ReservationDetails>
                      {reservation.bags}개 · {formatTime(reservation.start_time)} ~ {formatTime(reservation.end_time)}
                    </S.ReservationDetails>
                    <S.ReservationStatus status={reservation.status}>
                      {reservation.status === 'pending' && '대기'}
                      {reservation.status === 'paid' && '결제완료'}
                      {reservation.status === 'completed' && '완료'}
                      {reservation.status === 'cancelled' && '취소'}
                    </S.ReservationStatus>
                  </S.ReservationInfo>
                </Card>
              ))}
            </S.ReservationList>
          )}
        </S.Section>
      </S.MainContent>
    </S.Container>
  );
}

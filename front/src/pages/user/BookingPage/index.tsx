import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header, Button, Input } from "@/components/common";
import { spotApi, reservationApi } from "@/api";
import type { Spot } from "@/types";
import * as S from "./style";

export default function BookingPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();

  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    guest_name: "",
    guest_phone: "",
    bags: 1,
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    if (!uuid) return;

    const fetchSpot = async () => {
      try {
        const data = await spotApi.getById(uuid);
        setSpot(data);

        // Set default times
        const now = new Date();
        const startTime = new Date(now.getTime() + 30 * 60000);
        const endTime = new Date(now.getTime() + 4 * 3600000);

        setForm(prev => ({
          ...prev,
          start_time: startTime.toISOString().slice(0, 16),
          end_time: endTime.toISOString().slice(0, 16),
        }));
      } catch (err) {
        console.error(err);
        setError("점포 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpot();
  }, [uuid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spot || !uuid) return;

    if (!form.guest_name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }

    if (!form.guest_phone.trim()) {
      setError("연락처를 입력해주세요.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const reservation = await reservationApi.create({
        spot_id: uuid,
        guest_name: form.guest_name,
        guest_phone: form.guest_phone,
        bags: form.bags,
        start_time: new Date(form.start_time).toISOString(),
        end_time: new Date(form.end_time).toISOString(),
      });

      // Navigate to payment page with reservation ID
      navigate(`/spot/${uuid}/payment`, {
        state: {
          reservationId: reservation.id,
          totalPrice: reservation.total_price,
          spotName: spot.name
        }
      });
    } catch (err) {
      console.error(err);
      setError("예약 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const totalPrice = spot ? spot.price_per_bag * form.bags : 0;

  if (loading) {
    return (
      <S.LoadingContainer>
        <S.LoadingText>로딩 중...</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  if (!spot) {
    return (
      <S.ErrorContainer>
        <S.ErrorMessage>점포를 찾을 수 없습니다.</S.ErrorMessage>
        <Button variant="outline" onClick={() => navigate(-1)}>뒤로 가기</Button>
      </S.ErrorContainer>
    );
  }

  return (
    <S.Container>
      <Header showBack onBack={() => navigate(-1)} />

      <S.MainContent>
        <S.Title>예약 정보 입력</S.Title>

        <S.Form onSubmit={handleSubmit}>
          <Input
            label="이름"
            value={form.guest_name}
            onChange={(e) => setForm({ ...form, guest_name: e.target.value })}
            placeholder="예약자 이름"
          />

          <Input
            label="연락처"
            value={form.guest_phone}
            onChange={(e) => setForm({ ...form, guest_phone: e.target.value })}
            placeholder="010-0000-0000"
          />

          <S.BagCounter>
            <S.Label>짐 개수</S.Label>
            <S.CounterWrapper>
              <S.CounterButton
                type="button"
                onClick={() => setForm({ ...form, bags: Math.max(1, form.bags - 1) })}
              >
                -
              </S.CounterButton>
              <S.CounterValue>{form.bags}</S.CounterValue>
              <S.CounterButton
                type="button"
                onClick={() => setForm({ ...form, bags: Math.min(spot.max_bags, form.bags + 1) })}
              >
                +
              </S.CounterButton>
            </S.CounterWrapper>
          </S.BagCounter>

          <Input
            label="맡기는 시간"
            type="datetime-local"
            value={form.start_time}
            onChange={(e) => setForm({ ...form, start_time: e.target.value })}
          />

          <Input
            label="찾는 시간"
            type="datetime-local"
            value={form.end_time}
            onChange={(e) => setForm({ ...form, end_time: e.target.value })}
          />

          <S.PriceSection>
            <S.PriceLabel>예상 금액</S.PriceLabel>
            <S.PriceValue>₩{totalPrice.toLocaleString()}</S.PriceValue>
          </S.PriceSection>

          {error && <S.ErrorText>{error}</S.ErrorText>}

          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? "처리 중..." : "결제하기"}
          </Button>
        </S.Form>
      </S.MainContent>
    </S.Container>
  );
}

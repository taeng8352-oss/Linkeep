import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header, Button, Input } from "@/components/common";
import { paymentApi } from "@/api";
import * as S from "./style";

interface LocationState {
  reservationId: string;
  totalPrice: number;
  spotName: string;
}

export default function PaymentPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  if (!state?.reservationId) {
    return (
      <S.ErrorContainer>
        <S.ErrorMessage>예약 정보가 없습니다.</S.ErrorMessage>
        <Button variant="outline" onClick={() => navigate(`/spot/${uuid}`)}>
          처음으로
        </Button>
      </S.ErrorContainer>
    );
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardForm.cardNumber || !cardForm.expiry || !cardForm.cvc) {
      setError("카드 정보를 모두 입력해주세요.");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      await paymentApi.create({
        reservation_id: state.reservationId,
        amount: state.totalPrice,
      });

      navigate(`/spot/${uuid}/complete`, {
        state: {
          reservationId: state.reservationId,
        }
      });
    } catch (err) {
      console.error(err);
      setError("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <S.Container>
      <Header showBack onBack={() => navigate(-1)} />

      <S.MainContent>
        <S.Title>결제 정보</S.Title>

        <S.OrderSummary>
          <S.SummaryRow>
            <S.SummaryLabel>점포</S.SummaryLabel>
            <S.SummaryValue>{state.spotName}</S.SummaryValue>
          </S.SummaryRow>
          <S.Divider />
          <S.SummaryRow>
            <S.SummaryLabel>결제 금액</S.SummaryLabel>
            <S.TotalPrice>₩{state.totalPrice.toLocaleString()}</S.TotalPrice>
          </S.SummaryRow>
        </S.OrderSummary>

        <S.Form onSubmit={handlePayment}>
          <S.CardSection>
            <S.SectionTitle>카드 정보 (Dummy)</S.SectionTitle>

            <Input
              label="카드 번호"
              value={cardForm.cardNumber}
              onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
              placeholder="0000 0000 0000 0000"
            />

            <S.CardRow>
              <Input
                label="유효기간"
                value={cardForm.expiry}
                onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                placeholder="MM/YY"
              />
              <Input
                label="CVC"
                value={cardForm.cvc}
                onChange={(e) => setCardForm({ ...cardForm, cvc: e.target.value })}
                placeholder="000"
              />
            </S.CardRow>
          </S.CardSection>

          {error && <S.ErrorText>{error}</S.ErrorText>}

          <Button type="submit" fullWidth disabled={processing}>
            {processing ? "결제 처리 중..." : `₩${state.totalPrice.toLocaleString()} 결제하기`}
          </Button>
        </S.Form>
      </S.MainContent>
    </S.Container>
  );
}

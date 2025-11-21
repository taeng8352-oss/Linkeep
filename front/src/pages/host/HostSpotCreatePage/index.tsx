import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button, Input } from "@/components/common";
import { hostSpotApi } from "@/api";
import { useHostAuth } from "@/hooks/useHostAuth";
import * as S from "./style";

export default function HostSpotCreatePage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useHostAuth();

  const [form, setForm] = useState({
    name: "",
    address: "",
    description: "",
    price_per_bag: "5000",
    max_bags: "20",
    open_time: "09:00",
    close_time: "22:00",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/host/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.address) {
      setError("점포명과 주소를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await hostSpotApi.create({
        name: form.name,
        address: form.address,
        description: form.description || undefined,
        price_per_bag: parseInt(form.price_per_bag) || 5000,
        max_bags: parseInt(form.max_bags) || 20,
        open_time: form.open_time,
        close_time: form.close_time,
      });

      navigate("/host");
    } catch (err) {
      console.error(err);
      setError("점포 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <S.LoadingContainer>
        <S.LoadingText>로딩 중...</S.LoadingText>
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <Header showBack onBack={() => navigate(-1)} />

      <S.MainContent>
        <S.Title>점포 등록</S.Title>

        <S.Form onSubmit={handleSubmit}>
          <Input
            label="점포명"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="홍대 캐리어보관소"
          />

          <Input
            label="주소"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="서울 마포구 홍대입구역 9번출구"
          />

          <Input
            label="설명"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="24시간 CCTV 운영, 에어컨 완비"
          />

          <S.Row>
            <Input
              label="가격 (원/개)"
              type="number"
              value={form.price_per_bag}
              onChange={(e) => setForm({ ...form, price_per_bag: e.target.value })}
            />

            <Input
              label="최대 수량"
              type="number"
              value={form.max_bags}
              onChange={(e) => setForm({ ...form, max_bags: e.target.value })}
            />
          </S.Row>

          <S.Row>
            <Input
              label="영업 시작"
              type="time"
              value={form.open_time}
              onChange={(e) => setForm({ ...form, open_time: e.target.value })}
            />

            <Input
              label="영업 종료"
              type="time"
              value={form.close_time}
              onChange={(e) => setForm({ ...form, close_time: e.target.value })}
            />
          </S.Row>

          {error && <S.ErrorText>{error}</S.ErrorText>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "등록 중..." : "등록하기"}
          </Button>
        </S.Form>
      </S.MainContent>
    </S.Container>
  );
}

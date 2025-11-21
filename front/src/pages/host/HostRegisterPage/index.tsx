import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header, Button, Input } from "@/components/common";
import { hostAuthApi } from "@/api";
import * as S from "./style";

export default function HostRegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password || !form.name) {
      setError("필수 항목을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await hostAuthApi.register({
        email: form.email,
        password: form.password,
        name: form.name,
        phone: form.phone || undefined,
      });

      navigate("/host/login");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header showBack onBack={() => navigate(-1)} />

      <S.MainContent>
        <S.Title>호스트 회원가입</S.Title>

        <S.Form onSubmit={handleSubmit}>
          <Input
            label="이름"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="홍길동"
          />

          <Input
            label="이메일"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="host@example.com"
          />

          <Input
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="비밀번호"
          />

          <Input
            label="연락처 (선택)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="010-0000-0000"
          />

          {error && <S.ErrorText>{error}</S.ErrorText>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "가입 중..." : "가입하기"}
          </Button>
        </S.Form>

        <S.LoginLink>
          이미 계정이 있으신가요?{" "}
          <Link to="/host/login">로그인</Link>
        </S.LoginLink>
      </S.MainContent>
    </S.Container>
  );
}

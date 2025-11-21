import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header, Button, Input } from "@/components/common";
import { hostAuthApi } from "@/api";
import { useHostAuth } from "@/hooks/useHostAuth";
import * as S from "./style";

export default function HostLoginPage() {
  const navigate = useNavigate();
  const { login } = useHostAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await hostAuthApi.login({
        email: form.email,
        password: form.password,
      });

      login(result.host, result.token);
      navigate("/host");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <Header />

      <S.MainContent>
        <S.Title>호스트 로그인</S.Title>

        <S.Form onSubmit={handleSubmit}>
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

          {error && <S.ErrorText>{error}</S.ErrorText>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </Button>
        </S.Form>

        <S.RegisterLink>
          계정이 없으신가요?{" "}
          <Link to="/host/register">회원가입</Link>
        </S.RegisterLink>
      </S.MainContent>
    </S.Container>
  );
}

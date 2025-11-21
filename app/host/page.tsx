"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Reservation = {
  id: string;
  created_at: string;
  spot_id: string;
  host_token: string | null;
  name: string | null;
  phone: string | null;
  bags: number | null;
  dropoff_at: string | null;
  pickup_at: string | null;
  memo: string | null;
};

export default function HostCenterPage() {
  const [tokenInput, setTokenInput] = useState(""); // 호스트가 입력하는 토큰
  const [hostToken, setHostToken] = useState<string | null>(null); // 실제 조회에 쓰는 토큰
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 한국 시간으로 보기 위한 포맷터
  const formatKoreaTime = (iso: string | null) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  };

  const formatTimeOnly = (time: string | null) => {
    if (!time) return "-";
    // "10:00:00" 형태면 앞의 HH:MM만 사용
    return time.slice(0, 5);
  };

  const loadReservations = async (token: string) => {
    if (!token) {
      setError("host_token을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setReservations([]);

    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .eq("host_token", token)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setError("예약 목록을 불러오는 중 오류가 발생했습니다.");
    } else {
      setReservations(data || []);
      setHostToken(token);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadReservations(tokenInput.trim());
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
        <div className="max-w-xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="text-xs text-blue-600 font-semibold">
            Linkeep 호스트 센터
          </div>
          <div className="text-sm font-semibold text-gray-700">/host</div>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 pb-8 space-y-6">
        {/* 1. 토큰 입력 폼 */}
        <section className="mt-4 border rounded-2xl bg-white p-4 shadow-sm">
          <h1 className="text-base font-semibold mb-2">
            내 점포 예약 보기 (host_token)
          </h1>
          <p className="text-xs text-gray-500 mb-3">
            제휴 시 전달받은 <span className="font-mono">host_token</span> 을
            입력하면, 해당 점포의 예약 목록이 표시됩니다.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="예: test-spot"
            />
            <button
              type="submit"
              className="rounded-lg bg-black text-white text-sm font-semibold py-2"
            >
              예약 불러오기
            </button>
          </form>

          {hostToken && (
            <p className="mt-2 text-xs text-gray-500">
              현재 조회중인 host_token:{" "}
              <span className="font-mono font-semibold text-gray-700">
                {hostToken}
              </span>
            </p>
          )}
        </section>

        {/* 2. 에러 / 상태 메시지 */}
        {loading && (
          <p className="text-sm text-gray-500">예약 목록을 불러오는 중입니다…</p>
        )}

        {error && (
          <p className="text-sm text-red-500 whitespace-pre-line">{error}</p>
        )}

        {/* 3. 예약 목록 */}
        {!loading && !error && hostToken && (
          <section className="space-y-3">
            <h2 className="text-sm font-semibold">
              예약 목록
              <span className="ml-1 text-xs text-gray-500">
                ({reservations.length}건)
              </span>
            </h2>

            {reservations.length === 0 && (
              <p className="text-sm text-gray-500">
                아직 등록된 예약이 없습니다.
              </p>
            )}

            <div className="space-y-3">
              {reservations.map((r) => (
                <article
                  key={r.id}
                  className="border rounded-2xl bg-white p-3 shadow-sm text-sm"
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-semibold">
                      {r.name || "이름 없음"}{" "}
                      {r.bags ? (
                        <span className="text-xs text-gray-500">
                          ({r.bags}개)
                        </span>
                      ) : null}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      {formatKoreaTime(r.created_at)}
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-1">
                    연락처: {r.phone || "-"}
                  </div>

                  <div className="flex gap-4 text-xs text-gray-700 mb-1">
                    <div>
                      <span className="font-medium">맡기는 시간</span>{" "}
                      {formatTimeOnly(r.dropoff_at)}
                    </div>
                    <div>
                      <span className="font-medium">찾는 시간</span>{" "}
                      {formatTimeOnly(r.pickup_at)}
                    </div>
                  </div>

                  {r.memo && (
                    <div className="mt-1 text-xs text-gray-600">
                      메모: {r.memo}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

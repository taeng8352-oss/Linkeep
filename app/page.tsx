"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Spot = {
  id: string;
  name: string;
  area: string | null;
  address: string | null;
  open_time: string | null;
  close_time: string | null;
  price_per_day: number | null;
};

export default function HomePage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<"myeongdong" | "hongdae">(
    "myeongdong"
  );

  // DB에 저장된 area 값과 셀렉트 박스 값 매핑
  const areaMapping: Record<string, string> = {
    myeongdong: "명동",
    hongdae: "홍대",
  };

  useEffect(() => {
    const fetchSpots = async () => {
      setLoading(true);
      setError(null);

      const targetAreaName = areaMapping[selectedArea];

      const { data, error } = await supabase
        .from("spots")
        .select(
          "id, name, area, address, open_time, close_time, price_per_day, is_active"
        )
        .eq("is_active", true)
        .eq("area", targetAreaName);

      if (error) {
        console.error(error);
        setError("점포 정보를 불러오는 데 실패했습니다.");
      } else {
        setSpots(data || []);
      }

      setLoading(false);
    };

    fetchSpots();
  }, [selectedArea]);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 상단 헤더 */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="max-w-xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="font-bold text-lg">Linkeep</div>
          <Link
            href="/host"
            className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            호스트 센터
          </Link>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="max-w-xl mx-auto px-4 py-6 space-y-8">
        {/* 히어로 영역 – 이용자용 인트로 */}
        <section className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
          <h1 className="text-2xl font-bold leading-snug">
            이제 짐 때문에{" "}
            <span className="text-indigo-600">동선 꼬이지 않게</span>.
          </h1>
          <p className="text-sm text-gray-600">
            명동 · 홍대 일대 제휴 짐보관 점포를 한 번에 비교하고,
            QR로 빠르게 예약까지 할 수 있어요.
          </p>
        </section>

        {/* 검색 폼 + 지역 선택 */}
        <section className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="font-semibold text-lg">어디에서 짐을 맡길까요?</h2>

          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              // 지금은 지역 선택만으로 자동으로 다시 조회되기 때문에
              // submit 시 별도 동작은 없어도 됨
            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-medium">지역</label>
              <select
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                value={selectedArea}
                onChange={(e) =>
                  setSelectedArea(e.target.value as "myeongdong" | "hongdae")
                }
              >
                <option value="myeongdong">명동</option>
                <option value="hongdae">홍대입구</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">맡기는 시간</label>
                <input
                  type="time"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">찾는 시간</label>
                <input
                  type="time"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium">짐 개수(대략)</label>
              <input
                type="number"
                min={1}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
                placeholder="예: 2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-black text-white py-2.5 text-sm font-semibold hover:bg-gray-800 transition"
            >
              주변 짐보관 호스트 보기
            </button>
          </form>
        </section>

        {/* Supabase에서 불러온 점포 리스트 */}
        <section className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-lg mb-3">
            제휴 짐보관 호스트 ({areaMapping[selectedArea]})
          </h2>

          {loading && (
            <p className="text-sm text-gray-500">점포 정보를 불러오는 중...</p>
          )}

          {error && (
            <p className="text-sm text-red-500 mb-2">
              {error} (Supabase 설정을 다시 확인해주세요.)
            </p>
          )}

          {!loading && !error && spots.length === 0 && (
            <p className="text-sm text-gray-500">
              선택한 지역에 등록된 짐보관 호스트가 아직 없습니다.
            </p>
          )}

          <ul className="space-y-3 text-sm text-gray-700">
            {spots.map((spot) => (
              <li
                key={spot.id}
                className="border border-gray-100 rounded-xl p-3"
              >
                <div className="font-semibold">{spot.name}</div>
                <div className="text-gray-500">
                  {spot.address || spot.area || "주소 미등록"}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  영업 시간:{" "}
                  {spot.open_time && spot.close_time
                    ? `${spot.open_time} ~ ${spot.close_time}`
                    : "시간 정보 미등록"}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  1일 기준 가격:{" "}
                  {spot.price_per_day
                    ? `₩${spot.price_per_day.toLocaleString("ko-KR")}`
                    : "가격 미등록"}
                </div>
              </li>
            ))}
          </ul>

          <p className="text-xs text-gray-400 mt-3">
            이 리스트는 Supabase `spots` 테이블에서 실시간으로 불러온
            데이터입니다. 명동 / 홍대 제휴 점포를 추가하면 바로 여기에서
            확인할 수 있어요.
          </p>
        </section>
      </div>
    </main>
  );
}



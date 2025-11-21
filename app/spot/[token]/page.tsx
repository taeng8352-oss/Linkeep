"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";


type Spot = {
  id: string;
  name: string;
  area: string;
  address: string;
  open_time: string | null;
  close_time: string | null;
  price_per_day: number;
  max_bags: number | null;
  host_token: string;
  is_active: boolean;
};

type ReservationForm = {
  name: string;
  bagCount: number;
};

export default function SpotPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const token = params?.token as string | undefined;

  const [spot, setSpot] = useState<Spot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<ReservationForm>({
    name: "",
    bagCount: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const [isUsageOpen, setIsUsageOpen] = useState(true);

  // ✅ 히어로 이미지 경로: 공통 캐리어 + 서울 도심 이미지
  const imageSrc = "/spots/hero-luggage-seoul-wide.png";

  // 점포 정보 불러오기
  useEffect(() => {
    if (!token) return;

    const fetchSpot = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("spots")
          .select("*")
          .eq("host_token", token)
          .eq("is_active", true)
          .maybeSingle<Spot>();

        if (error) {
          console.error(error);
          setError("점포 정보를 불러오는 중 오류가 발생했습니다.");
          setSpot(null);
        } else if (!data) {
          setError("해당 점포를 찾을 수 없습니다. (QR 주소 또는 점포 상태를 확인해주세요.)");
          setSpot(null);
        } else {
          setSpot(data);
        }
      } catch (err) {
        console.error(err);
        setError("점포 정보를 불러오는 중 알 수 없는 오류가 발생했습니다.");
        setSpot(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSpot();
  }, [token]);

  const handleChange = (field: keyof ReservationForm, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spot || !token) return;

    if (!form.name.trim()) {
      setSubmitMessage("이름을 입력해주세요.");
      return;
    }

    if (form.bagCount <= 0) {
      setSubmitMessage("짐 개수를 1개 이상으로 입력해주세요.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase.from("reservations").insert({
        host_token: token,
        spot_id: spot.id,
        name: form.name.trim(),
        bag_count: form.bagCount,
        // created_at 은 DB default now()
      });

      if (error) {
        console.error(error);
        setSubmitMessage("예약 요청 중 오류가 발생했습니다. 다시 시도해주세요.");
      } else {
        setSubmitMessage(
          "예약 요청이 접수되었습니다! 안내받은 QR 화면을 매장에 보여주시면 됩니다."
        );
        setForm({ name: "", bagCount: 1 });
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage("예약 요청 중 알 수 없는 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 text-sm">점포 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error || !spot) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <p className="mb-4 text-sm text-slate-500">Linkeep</p>
        <p className="text-red-500 text-sm mb-2">{error ?? "점포 정보를 찾을 수 없습니다."}</p>
        <button
          onClick={() => router.back()}
          className="mt-2 text-sm px-4 py-2 rounded-full border border-slate-200 bg-white shadow-sm"
        >
          뒤로 가기
        </button>
      </div>
    );
  }

  const displayPrice = `₩${spot.price_per_day.toLocaleString()} / 1일`;
  const openTime = spot.open_time ?? "10:00";
  const closeTime = spot.close_time ?? "23:00";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 상단 바 */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 h-12">
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => router.back()}
            className="text-xs text-slate-500 hover:text-slate-700"
          >
            ← 근처 짐보관 더보기
          </button>

          {/* 가운데 로고만 크게 */}
          <Image
            src="/linkeep-logo.svg"      // public/linkeep-logo.svg 에 파일 두기
            alt="Linkeep 로고"
            width={50}                   // 여기 숫자 키우면 더 크게
            height={50}
            className="rounded-full"
          />

          {/* 오른쪽 공간 맞추기용 더미 */}
          <div className="w-16" />
        </div>
      </header>
  {/* 이하 기존 내용 그대로 */}


      {/* 히어로 이미지 */}
      <div className="relative w-full h-56 sm:h-64 bg-slate-100">
        <Image
          src={imageSrc}
          alt="Linkeep 짐보관 대표 이미지"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* 가격 / 여유 배지 */}
<div className="absolute inset-x-0 bottom-3 flex justify-between px-4 max-w-3xl mx-auto text-xs">
  <div className="px-3 py-1 rounded-full bg-black/70 text-white shadow-sm">
    {displayPrice}
  </div>

  {/* 여유 배지 – 하늘색 버전 */}
  <div className="px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700 font-semibold shadow-sm">
    여유
  </div>
</div>

      </div>

      {/* 본문 */}
      <main className="max-w-3xl mx-auto px-4 pb-20 -mt-4 space-y-6 relative z-10">
        {/* 상단 안내 + 타이틀 */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 px-5 pt-5 pb-6">
          <p className="text-[11px] text-sky-600 font-medium mb-1">
            홍대입구역 9번 출구에서 도보 1분
          </p>
          <h1 className="text-xl font-semibold text-slate-900 mb-1">{spot.name}</h1>
          <p className="text-[12px] text-slate-500 leading-relaxed">
            온라인 예약 필수 · 현장 접수/현금 결제는 받지 않습니다. 예약 후 정확한 주소와 이용 방법이
            안내됩니다.
          </p>
        </section>

        {/* 요약 카드 3개 */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-3">
            <p className="text-[11px] text-slate-400 mb-1">보관 요금</p>
            <p className="text-sm font-semibold text-slate-900">{displayPrice}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-3">
            <p className="text-[11px] text-slate-400 mb-1">영업 시간</p>
            <p className="text-sm font-semibold text-slate-900">
              {openTime} ~ {closeTime}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 px-4 py-3">
            <p className="text-[11px] text-slate-400 mb-1">보관 가능 수량</p>
            <p className="text-sm font-semibold text-slate-900">여유</p>
          </div>
        </section>

        {/* 특징 + 주소/안내 */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 px-5 py-5 space-y-4">
          {/* 특징 3가지 */}
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-slate-800">
              <span className="mt-[2px] text-blue-500">🧳</span>
              <span>모든 사이즈 보관 가능</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-800">
              <span className="mt-[2px] text-amber-500">🔐</span>
              <span>CCTV/실내 보관으로 안전한 짐 보관</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-800">
              <span className="mt-[2px] text-emerald-500">✅</span>
              <span>매장 운영 시간 동안 직원 상주로 간편한 이용</span>
            </div>
          </div>

          {/* 주소 박스는 안내용으로만 */}
          <div className="pt-3 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 mb-1">주소</p>
            <p className="text-sm text-slate-800">
              예약 후 상세 로드맵 및 매장 사진 제공
            </p>
          </div>
        </section>

        {/* 이 매장 이용 방법 (토글) */}
        <section className="bg-sky-50 rounded-3xl shadow-sm border border-sky-100 overflow-hidden">
          <button
            type="button"
            onClick={() => setIsUsageOpen((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <span className="text-sm font-semibold text-slate-900">이 매장 이용 방법</span>
            <span className="text-xs text-slate-500">{isUsageOpen ? "접기 ▲" : "펼치기 ▼"}</span>
          </button>

          {isUsageOpen && (
            <div className="px-5 pb-4 pt-1 text-sm text-slate-700 space-y-1">
              <p>1. 아래에서 이름과 짐 개수만 입력해 예약을 남겨주세요.</p>
              <p>2. 발급된 예약 QR코드를 직원에게 보여주세요.</p>
              <p>3. 짐을 맡기고 즐거운 하루를 보내세요.</p>
              <p>4. 매장 운영 마감 시간 전 언제든 찾아가실 수 있어요.</p>
            </div>
          )}
        </section>

        {/* 예약 폼 */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 px-5 py-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-1">이 매장에 예약하기</h2>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              
              <br />
            
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이름 */}
            <div className="space-y-1">
              <label className="block text-[11px] text-slate-500">이름</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="예약자 이름"
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500"
              />
            </div>

            {/* 짐 개수 */}
            <div className="space-y-1">
              <label className="block text-[11px] text-slate-500">짐 개수</label>
              <input
                type="number"
                min={1}
                value={form.bagCount}
                onChange={(e) => handleChange("bagCount", Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500"
              />
              <p className="text-[11px] text-slate-400">
                종류와 상관없이 편하게 작성해주세요.
              </p>
            </div>

            {/* 시간 안내 박스 (텍스트만) */}
            <div className="mt-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 space-y-1.5">
              <p className="text-[11px] font-medium text-slate-700"></p>
              <p className="text-[11px] text-slate-500">
            
              </p>
              <p className="text-[11px] text-slate-500">
                · 찾는 시간: {closeTime} 이전에 자유롭게 방문
              </p>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-full bg-slate-900 text-white text-sm font-medium py-3 disabled:opacity-60"
            >
              {submitting ? "예약 요청 보내는 중..." : "지금 예약"}
            </button>

            {submitMessage && (
              <p className="text-[11px] text-center text-slate-600 mt-1">{submitMessage}</p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}





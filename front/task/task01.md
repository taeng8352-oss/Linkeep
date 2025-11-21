# Task 01: Frontend - React 웹앱

## 개요
짐보관 서비스 프론트엔드. User/Host 화면 모두 구현. 모바일 웹앱 비율 지향.

---

## 1. User Flow & 페이지

### Flow
```
QR 스캔 → /spot/:uuid → 점포 정보 → 예약하기
→ /spot/:uuid/book → 예약 정보 입력
→ /spot/:uuid/payment → 결제 (dummy)
→ /spot/:uuid/complete → 완료 + 지도 안내
```

### 페이지 구조

#### `/spot/:uuid` - 점포 상세 페이지
```
┌─────────────────────────┐
│    [점포 이미지]         │
├─────────────────────────┤
│  점포명                  │
│  주소                    │
│  설명                    │
├─────────────────────────┤
│  가격: 5,000원/개        │
│  영업시간: 09:00~22:00   │
├─────────────────────────┤
│                         │
│   [ 예약하기 ]           │
│                         │
└─────────────────────────┘
```

#### `/spot/:uuid/book` - 예약 폼 페이지
```
┌─────────────────────────┐
│  ← 뒤로                  │
├─────────────────────────┤
│  예약 정보 입력          │
│                         │
│  이름: [          ]     │
│  연락처: [        ]     │
│  짐 개수: [ - 1 + ]     │
│  맡기는 시간: [선택]     │
│  찾는 시간: [선택]       │
├─────────────────────────┤
│  예상 금액: 5,000원      │
│                         │
│   [ 결제하기 ]           │
└─────────────────────────┘
```

#### `/spot/:uuid/payment` - 결제 페이지 (Dummy)
```
┌─────────────────────────┐
│  결제 정보               │
├─────────────────────────┤
│  점포: 홍대 캐리어보관소   │
│  짐: 2개                 │
│  시간: 10:00 ~ 18:00     │
├─────────────────────────┤
│  결제 금액: 10,000원     │
│                         │
│  [카드 정보 입력 - dummy]│
│                         │
│   [ 결제 완료 ]          │
└─────────────────────────┘
```

#### `/spot/:uuid/complete` - 완료 페이지
```
┌─────────────────────────┐
│  ✅ 예약 완료!           │
├─────────────────────────┤
│  예약 정보               │
│  - 점포: 홍대 캐리어보관소 │
│  - 시간: 10:00 ~ 18:00   │
│  - 짐: 2개               │
├─────────────────────────┤
│                         │
│  [  Google Map  ]       │
│  [  점포 위치   ]       │
│                         │
├─────────────────────────┤
│   [ 홈으로 ]             │
└─────────────────────────┘
```

---

## 2. Host Flow & 페이지

### Flow
```
/host/login → 로그인 (dummy)
→ /host → 대시보드 (내 점포, 예약 목록)
→ /host/spots/new → 점포 등록
```

### 페이지 구조

#### `/host/login` - 로그인 페이지 (Dummy)
```
┌─────────────────────────┐
│  호스트 로그인           │
├─────────────────────────┤
│  이메일: [        ]     │
│  비밀번호: [      ]     │
│                         │
│   [ 로그인 ]             │
│                         │
│  계정이 없으신가요?       │
│   [ 회원가입 ]           │
└─────────────────────────┘
```

#### `/host/register` - 회원가입 페이지 (Dummy)
```
┌─────────────────────────┐
│  호스트 회원가입          │
├─────────────────────────┤
│  이름: [          ]     │
│  이메일: [        ]     │
│  비밀번호: [      ]     │
│  연락처: [        ]     │
│                         │
│   [ 가입하기 ]           │
└─────────────────────────┘
```

#### `/host` - 대시보드
```
┌─────────────────────────┐
│  내 점포                 │
│  [ + 점포 등록 ]         │
├─────────────────────────┤
│  ┌───────────────┐      │
│  │ 홍대 캐리어보관소 │    │
│  │ 예약 3건       │      │
│  │ [QR 보기]      │      │
│  └───────────────┘      │
├─────────────────────────┤
│  오늘의 예약             │
│  ┌───────────────┐      │
│  │ 김철수 · 2개   │      │
│  │ 10:00~18:00   │      │
│  └───────────────┘      │
└─────────────────────────┘
```

#### `/host/spots/new` - 점포 등록
```
┌─────────────────────────┐
│  ← 뒤로                  │
│  점포 등록               │
├─────────────────────────┤
│  점포명: [        ]     │
│  주소: [          ]     │
│  설명: [          ]     │
│  가격: [    ] 원/개     │
│  영업시간: [  ]~[  ]    │
│  최대 수량: [  ]        │
│                         │
│   [ 등록하기 ]           │
└─────────────────────────┘
```

---

## 3. 라우팅

```typescript
// src/App.tsx
<Routes>
  {/* User */}
  <Route path="/spot/:uuid" element={<SpotPage />} />
  <Route path="/spot/:uuid/book" element={<BookingPage />} />
  <Route path="/spot/:uuid/payment" element={<PaymentPage />} />
  <Route path="/spot/:uuid/complete" element={<CompletePage />} />

  {/* Host */}
  <Route path="/host/login" element={<HostLoginPage />} />
  <Route path="/host/register" element={<HostRegisterPage />} />
  <Route path="/host" element={<HostDashboard />} />
  <Route path="/host/spots/new" element={<HostSpotCreatePage />} />

  {/* Redirect */}
  <Route path="/" element={<Navigate to="/host/login" />} />
</Routes>
```

---

## 4. API 클라이언트

```typescript
// src/api/index.ts
const API_URL = import.meta.env.VITE_API_URL;

// User API
export const spotApi = {
  getById: (uuid: string) => fetch(`${API_URL}/api/spots/${uuid}`),
};

export const reservationApi = {
  create: (data) => fetch(`${API_URL}/api/reservations`, { method: 'POST', ... }),
  getById: (id: string) => fetch(`${API_URL}/api/reservations/${id}`),
};

export const paymentApi = {
  create: (data) => fetch(`${API_URL}/api/payments`, { method: 'POST', ... }),
};

// Host API
export const hostAuthApi = {
  login: (data) => fetch(`${API_URL}/api/host/login`, { method: 'POST', ... }),
  register: (data) => fetch(`${API_URL}/api/host/register`, { method: 'POST', ... }),
};

export const hostSpotApi = {
  create: (data) => fetch(`${API_URL}/api/host/spots`, { method: 'POST', ... }),
  getAll: () => fetch(`${API_URL}/api/host/spots`),
};

export const hostReservationApi = {
  getAll: () => fetch(`${API_URL}/api/host/reservations`),
};
```

---

## 5. 파일 구조

```
src/
  main.tsx
  App.tsx
  api/
    index.ts                    # API 클라이언트
  pages/
    spot/
      SpotPage/                 # /spot/:uuid
      BookingPage/              # /spot/:uuid/book
      PaymentPage/              # /spot/:uuid/payment (dummy)
      CompletePage/             # /spot/:uuid/complete
    host/
      HostLoginPage/            # /host/login
      HostRegisterPage/         # /host/register
      HostDashboard/            # /host
      HostSpotCreatePage/       # /host/spots/new
  components/
    common/
      Button/
      Input/
      Card/
      Header/
    map/
      GoogleMap/                # Google Maps 컴포넌트
  hooks/
    useHostAuth.ts              # 호스트 인증 상태 관리 (dummy)
  styles/
    GlobalStyle.ts
    theme.ts
  types/
    index.ts
```

---

## 6. 구현 순서

### Phase 1: User 기본 Flow
1. SpotPage 리팩토링 (현재 완료)
2. BookingPage 구현 - 예약 폼
3. PaymentPage 구현 - Dummy 결제
4. CompletePage 구현 - 완료 + 지도

### Phase 2: Google Maps 연동
1. Google Maps API 키 설정
2. GoogleMap 컴포넌트 생성
3. CompletePage에 지도 추가

### Phase 3: Host 인증
1. HostLoginPage 구현
2. HostRegisterPage 구현
3. useHostAuth 훅 구현 (localStorage 기반 dummy)

### Phase 4: Host 대시보드
1. HostDashboard 구현
2. HostSpotCreatePage 구현
3. 예약 목록 표시

### Phase 5: 스타일링 & UX
1. 모바일 웹앱 비율 (max-width: 430px)
2. 이쁜 디자인 적용
3. 로딩/에러 상태 처리

---

## 7. 타입 정의

```typescript
// src/types/index.ts
export interface Spot {
  id: string;
  name: string;
  address: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  price_per_bag: number;
  max_bags: number;
  open_time: string;
  close_time: string;
  image_url?: string;
  is_active: boolean;
}

export interface Reservation {
  id: string;
  spot_id: string;
  guest_name: string;
  guest_phone: string;
  bags: number;
  start_time: string;
  end_time: string;
  total_price: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
}

export interface Host {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface ReservationInput {
  spot_id: string;
  guest_name: string;
  guest_phone: string;
  bags: number;
  start_time: string;
  end_time: string;
}

export interface PaymentInput {
  reservation_id: string;
  amount: number;
}
```

---

## 8. 환경변수

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=xxx  # 추후 추가
```

---

## 9. 예상 작업 시간

| 작업 | 예상 시간 |
|------|----------|
| BookingPage | 1.5시간 |
| PaymentPage (dummy) | 1시간 |
| CompletePage + 지도 | 1.5시간 |
| Host 로그인/가입 | 1.5시간 |
| Host 대시보드 | 2시간 |
| Host 점포 등록 | 1시간 |
| 스타일링 | 2시간 |
| **총합** | **10-12시간** |

---

## 다음 단계

1. BookingPage 구현
2. PaymentPage (dummy) 구현
3. CompletePage + 지도 구현
4. Host 페이지들 구현

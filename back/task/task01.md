# Task 01: Backend - NestJS API 서버

## 개요
짐보관 서비스의 백엔드 API 서버. User/Host 기능 모두 지원.

---

## 1. 데이터베이스 설계

### spots 테이블 (점포 정보)
```sql
CREATE TABLE spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                    -- 점포명
  address TEXT NOT NULL,                 -- 주소
  description TEXT,                      -- 점포 설명
  latitude DECIMAL(10, 8),               -- 위도 (Google Maps용)
  longitude DECIMAL(11, 8),              -- 경도 (Google Maps용)
  price_per_bag INTEGER DEFAULT 5000,    -- 가방당 가격 (원)
  max_bags INTEGER DEFAULT 20,           -- 최대 보관 가능 수량
  open_time TIME DEFAULT '09:00',        -- 영업 시작
  close_time TIME DEFAULT '22:00',       -- 영업 종료
  image_url TEXT,                        -- 점포 이미지
  host_id UUID REFERENCES hosts(id),     -- 호스트 FK
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### reservations 테이블 (예약 정보)
```sql
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id UUID REFERENCES spots(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  bags INTEGER NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,       -- 맡기는 시간
  end_time TIMESTAMPTZ NOT NULL,         -- 찾는 시간
  total_price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',         -- pending | paid | completed | cancelled
  payment_id TEXT,                       -- 결제 ID (dummy)
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### hosts 테이블 (호스트 정보) - Dummy 로그인용
```sql
CREATE TABLE hosts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,                -- 해시된 비밀번호 (dummy는 평문)
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### ERD
```
┌─────────────┐       ┌─────────────┐       ┌─────────────────┐
│   hosts     │       │   spots     │       │  reservations   │
├─────────────┤       ├─────────────┤       ├─────────────────┤
│ id (PK)     │◄──────│ host_id(FK) │       │ id (PK)         │
│ email       │       │ id (PK)     │◄──────│ spot_id (FK)    │
│ password    │       │ name        │       │ guest_name      │
│ name        │       │ address     │       │ guest_phone     │
│ phone       │       │ lat/lng     │       │ bags            │
│ created_at  │       │ price       │       │ start/end_time  │
└─────────────┘       │ ...         │       │ total_price     │
                      └─────────────┘       │ status          │
                                            └─────────────────┘
```

---

## 2. API 엔드포인트

### User API (인증 불필요)

#### Spots
```
GET  /api/spots/:uuid          - 점포 상세 조회
```

#### Reservations
```
POST /api/reservations         - 예약 생성
GET  /api/reservations/:id     - 예약 상세 조회 (결제 후 확인용)
```

#### Payment (Dummy)
```
POST /api/payments             - 결제 처리 (dummy)
```

### Host API (인증 필요 - dummy)

#### Auth
```
POST /api/host/login           - 로그인 (dummy)
POST /api/host/register        - 회원가입 (dummy)
```

#### Spots
```
POST /api/host/spots           - 점포 등록
GET  /api/host/spots           - 내 점포 목록
PUT  /api/host/spots/:uuid     - 점포 수정
DELETE /api/host/spots/:uuid   - 점포 삭제
```

#### Reservations
```
GET  /api/host/reservations    - 내 점포 예약 목록
PUT  /api/host/reservations/:id/status  - 예약 상태 변경
```

---

## 3. 프로젝트 구조

```
back/
  src/
    main.ts
    app.module.ts
    config/
      supabase.config.ts
    common/
      guards/
        host-auth.guard.ts      # Dummy 인증 가드
      supabase/
        supabase.service.ts
    spots/
      spots.module.ts
      spots.controller.ts       # GET /api/spots/:uuid
      spots.service.ts
      dto/
        spot.dto.ts
    reservations/
      reservations.module.ts
      reservations.controller.ts
      reservations.service.ts
      dto/
        create-reservation.dto.ts
    payments/
      payments.module.ts
      payments.controller.ts    # POST /api/payments (dummy)
      payments.service.ts
    host/
      host.module.ts
      auth/
        auth.controller.ts      # login, register
        auth.service.ts
      spots/
        host-spots.controller.ts
        host-spots.service.ts
      reservations/
        host-reservations.controller.ts
        host-reservations.service.ts
  task/
    task01.md
  .env
```

---

## 4. 구현 순서

### Phase 1: DB 마이그레이션
1. hosts 테이블 생성
2. spots 테이블 수정 (lat/lng, host_id 추가)
3. reservations 테이블 수정 (status, payment_id 추가)
4. 테스트 데이터 삽입

### Phase 2: User API
1. `GET /api/spots/:uuid` - 완료
2. `POST /api/reservations` - 예약 생성
3. `GET /api/reservations/:id` - 예약 조회
4. `POST /api/payments` - Dummy 결제

### Phase 3: Host Auth (Dummy)
1. `POST /api/host/register` - 회원가입
2. `POST /api/host/login` - 로그인 (JWT 없이 간단하게)
3. Host Auth Guard 구현

### Phase 4: Host API
1. `POST /api/host/spots` - 점포 등록
2. `GET /api/host/spots` - 내 점포 목록
3. `GET /api/host/reservations` - 예약 목록

---

## 5. DTO 정의

### CreateReservationDto
```typescript
export class CreateReservationDto {
  spot_id: string;
  guest_name: string;
  guest_phone: string;
  bags: number;
  start_time: string;  // ISO 8601
  end_time: string;
}
```

### CreatePaymentDto (Dummy)
```typescript
export class CreatePaymentDto {
  reservation_id: string;
  amount: number;
  // 실제 PG 연동 시 카드 정보 등 추가
}
```

### HostRegisterDto
```typescript
export class HostRegisterDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
}
```

### CreateSpotDto
```typescript
export class CreateSpotDto {
  name: string;
  address: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  price_per_bag?: number;
  max_bags?: number;
  open_time?: string;
  close_time?: string;
  image_url?: string;
}
```

---

## 6. 환경변수

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
PORT=3000

# 추후 추가
# JWT_SECRET=xxx
# GOOGLE_MAPS_API_KEY=xxx
```

---

## 7. 테스트 데이터

```sql
-- Host 생성
INSERT INTO hosts (id, email, password, name, phone) VALUES
('host-uuid-1', 'host@test.com', 'password123', '테스트 호스트', '010-1234-5678');

-- Spot 생성
INSERT INTO spots (name, address, description, latitude, longitude, price_per_bag, host_id) VALUES
('홍대 캐리어보관소', '서울 마포구 홍대입구역 9번출구', '24시간 CCTV 운영', 37.5563, 126.9236, 5000, 'host-uuid-1'),
('명동 짐보관', '서울 중구 명동역 6번출구', '에어컨 완비', 37.5636, 126.9869, 6000, 'host-uuid-1');
```

---

## 8. 예상 작업 시간

| 작업 | 예상 시간 |
|------|----------|
| DB 마이그레이션 | 1시간 |
| User API (spots, reservations) | 2시간 |
| Payment API (dummy) | 30분 |
| Host Auth (dummy) | 1시간 |
| Host API (spots, reservations) | 2시간 |
| 테스트 | 1시간 |
| **총합** | **7-8시간** |

---

## 다음 단계

1. DB 마이그레이션 실행
2. User API 우선 구현
3. Host API 구현

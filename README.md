# AutoVanLite

현대적인 웹 애플리케이션 개발을 위한 Next.js 기반 프로젝트입니다.

## 🚀 기술 스택

-   **Next.js 15** - React 서버 컴포넌트와 앱 라우터
-   **React 19** - 최신 React 기능
-   **TypeScript** - 타입 안전성
-   **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
-   **Shadcn/ui** - 접근성 좋은 컴포넌트 라이브러리
-   **Framer Motion** - 애니메이션 라이브러리
-   **next-themes** - 다크/라이트 모드 지원

## 🛠️ 설치 및 실행

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 서버 실행

```bash
npm start
```

## 📁 프로젝트 구조

```
AutoVanLite/
├── app/                    # Next.js 앱 라우터
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # Shadcn/ui 컴포넌트
│   └── theme-toggle.tsx  # 테마 토글 컴포넌트
├── lib/                  # 유틸리티 함수
│   └── utils.ts         # cn 함수 등
├── next.config.mjs      # Next.js 설정
├── tailwind.config.ts   # Tailwind CSS 설정
└── tsconfig.json        # TypeScript 설정
```

## 🎨 사용 가능한 컴포넌트

이 프로젝트에는 다음과 같은 Shadcn/ui 컴포넌트들이 설치되어 있습니다:

-   Accordion
-   Alert Dialog
-   Avatar
-   Badge
-   Button
-   Card
-   Checkbox
-   Dialog
-   Dropdown Menu
-   Form (React Hook Form + Zod)
-   Input
-   Label
-   Select
-   Tabs
-   Toast
-   Tooltip
-   그리고 더 많은 컴포넌트들...

## 🌙 다크 모드

이 프로젝트는 `next-themes`를 사용하여 다크/라이트 모드를 지원합니다. 우상단의 테마 토글 버튼을 사용하여 모드를 변경할 수 있습니다.

## 🎯 주요 특징

-   ⚡ **빠른 개발 환경**: Turbopack과 HMR로 빠른 개발 경험
-   🎨 **현대적인 UI**: Tailwind CSS와 Shadcn/ui로 아름다운 디자인
-   🌈 **애니메이션**: Framer Motion으로 부드러운 인터랙션
-   📱 **반응형 디자인**: 모든 디바이스에서 완벽한 표시
-   ♿ **접근성**: ARIA 속성과 키보드 내비게이션 지원
-   🔧 **타입 안전성**: TypeScript로 런타임 에러 방지

## 📝 개발 가이드

### 새로운 페이지 추가

`app/` 디렉토리에 새 폴더와 `page.tsx` 파일을 생성하세요.

### 새로운 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
```

### 커스텀 컴포넌트 생성

`components/` 디렉토리에 새 컴포넌트를 생성하고 Tailwind CSS 클래스를 사용하세요.

## 🤝 기여하기

1. 프로젝트를 포크하세요
2. 피처 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

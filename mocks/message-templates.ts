import { MessageTemplate } from "@/types/manual-send";

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
    {
        id: "t1",
        title: "앱 설치 안내",
        body: "차계부 설치하면 예약·알림·차량관리가 한 번에! {coupon} 혜택도 드려요.",
    },
    {
        id: "t2",
        title: "정비 완료 안내",
        body: "정비가 완료되었습니다. 점검·정비 명세서는 '하이웨이' 차계부에서 확인하세요.",
    },
    {
        id: "t3",
        title: "방문 감사 안내",
        body: "방문해주셔서 감사합니다. 감사 쿠폰이 발급되었습니다. 다음 예약 시 적용됩니다.",
    },
    {
        id: "t4",
        title: "타이어 프로모션 안내",
        body: "타이어, 지금 바꿀 타이밍. 빗길 제동 걱정 줄이고 주행은 더 부드럽게, 인트라밴 모터스에서 바로 교체하세요.",
    },
    {
        id: "t5",
        title: "안전점검 안내",
        body: "무상 10분 안전점검 진행 중입니다. 예약하고 안전하게 운행하세요.",
    },
];

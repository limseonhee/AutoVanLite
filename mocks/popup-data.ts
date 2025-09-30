import { CustomerData, PreviewContent } from "@/types/common-send-popup";

// 고객 샘플 데이터 생성 함수
export function generateCustomers(type: string, count: number): CustomerData[] {
    const firstNames = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임"];
    const lastNames = ["철수", "영희", "민수", "수영", "지현", "동현", "서연", "준호", "미나", "태양"];
    const vehicles = ["소나타", "아반떼", "그랜저", "투싼", "산타페", "K5", "K3", "스포티지", "모닝", "레이"];
    const plateNumbers = ["가", "나", "다", "라", "마", "바", "사", "아", "자", "차"];

    return Array.from({ length: count }, (_, i) => ({
        id: `${type}-${i + 1}`,
        name: firstNames[i % firstNames.length] + lastNames[i % lastNames.length],
        phone: `010-${String(9000 + ((i * 123) % 1000)).padStart(4, "0")}-${String(1000 + ((i * 456) % 9000)).padStart(
            4,
            "0"
        )}`,
        vehicle: vehicles[i % vehicles.length],
        plateNo: `${String(i + 10).padStart(2, "0")}${plateNumbers[i % plateNumbers.length]}${String(i + 1000).padStart(
            4,
            "0"
        )}`,
        lastVisit: `2024-01-${String((i % 30) + 1).padStart(2, "0")}`,
    }));
}

// 점검정비명세서 발송 문구
export const BULK_REPORT_PREVIEW: PreviewContent = {
    title: "점검정비명세서 발송",
    message:
        "안녕하세요. 차량 점검 작업이 완료되었습니다.\n\n점검정비명세서가 온라인으로 발급되었으니,\n[하이웨이 차계부]에서\n내용을 확인해주시기 바랍니다.\n\n궁금한 사항이 있으시면 언제든 연락 부탁드립니다.\n\n감사합니다.",
    additionalInfo: [],
};

// 세그먼트별 발송 문구 템플릿
export const SEGMENT_MESSAGE_TEMPLATES: Record<string, PreviewContent> = {
    // 기본 템플릿
    default: {
        title: "메시지 발송",
        message:
            "안녕하세요.\n\n안내 메시지를 발송합니다.\n\n자세한 내용은 하이웨이 차계부 앱에서 확인하실 수 있습니다.\n\n감사합니다.",
        additionalInfo: [],
    },

    // 세그먼트별 커스텀 템플릿
    "segment-1": {
        title: "차량 점검 안내",
        message:
            "안녕하세요.\n\n차량 정기 점검 시기가 다가왔습니다.\n\n안전한 운행을 위해 정기 점검을 받아보시기 바랍니다.\n\n자세한 내용은 하이웨이 차계부 앱에서 확인하실 수 있습니다.\n\n감사합니다.",
        additionalInfo: ["발송 채널: SMS, Push", "발송 주기: 월 1회"],
    },

    "segment-2": {
        title: "정비 완료 안내",
        message:
            "안녕하세요.\n\n요청하신 차량 정비가 완료되었습니다.\n\n정비 내역은 하이웨이 차계부 앱에서 확인하실 수 있습니다.\n\n감사합니다.",
        additionalInfo: ["발송 채널: Push", "발송 주기: 정비 완료 시"],
    },

    "segment-3": {
        title: "소모품 교체 권장",
        message:
            "안녕하세요.\n\n차량 소모품 교체 시기가 도래했습니다.\n\n안전 운행을 위해 소모품 점검 및 교체를 권장드립니다.\n\n자세한 내용은 하이웨이 차계부 앱에서 확인하실 수 있습니다.\n\n감사합니다.",
        additionalInfo: ["발송 채널: SMS", "발송 주기: 분기별"],
    },
};

// 세그먼트 메시지 가져오기 헬퍼 함수
export function getSegmentMessage(segmentId: string, segmentName: string, channels: readonly string[]): PreviewContent {
    const template = SEGMENT_MESSAGE_TEMPLATES[segmentId] || SEGMENT_MESSAGE_TEMPLATES.default;

    return {
        ...template,
        title: segmentName,
        additionalInfo: [`발송 채널: ${channels.join(", ")}`, ...(template.additionalInfo || [])],
    };
}

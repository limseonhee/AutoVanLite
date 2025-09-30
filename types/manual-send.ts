export type CategoryType = "guidance" | "happyCall" | "preventive" | "inspectionInsurance" | "birthday";

export type SendMode = "now" | "schedule";

export interface CategoryInfo {
    id: CategoryType;
    name: string;
    description: string;
}

export interface MessageTemplate {
    id: string;
    title: string;
    body: string;
}

export interface Filters {
    vehicleYear: string;
    vehicleType: string;
    mileage: string;
    visitHistory: string;
    serviceHistory: string;
    customerGrade: string;
    // 카테고리별 전용 필터들
    guidance: {
        dateType: string; // "admission" | "lastVisit"
        dateValue: string;
        visitCountMin: string;
        vehicleName: string;
        vehicleNameSelect: string;
        registrationStartDate: string;
        registrationEndDate: string;
        modelYear: string;
        mileageFrom: string;
        mileageTo: string;
    };
    happyCall: {
        deliveryStartDate: string;
        deliveryEndDate: string;
        visitCountMin: string;
        vehicleName: string;
        vehicleNameSelect: string;
        registrationStartDate: string;
        registrationEndDate: string;
        modelYear: string;
        mileageFrom: string;
        mileageTo: string;
    };
    preventive: {
        startDate: string;
        endDate: string;
        preventiveItems: string[];
    };
    inspectionInsurance: {
        type: string; // "inspection" | "insurance"
        startDate: string;
        endDate: string;
    };
    birthday: {
        startDate: string;
        endDate: string;
    };
}

export interface ManualSendProps {
    onSend?: (data: SendData) => void;
    onSchedule?: (data: ScheduleData) => void;
    onSaveTemplate?: (template: Omit<MessageTemplate, "id">) => void;
    initialMessage?: string;
    hideTemplates?: boolean;
}

export interface SendData {
    message: string;
    targetCount: number;
    category: CategoryType;
    filters: Filters;
}

export interface ScheduleData extends SendData {
    scheduleAt: string;
}

export interface FilterChipData {
    key: string;
    label: string;
    value: string;
}

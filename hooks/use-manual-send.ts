import { useState, useMemo } from "react";
import { CategoryType, Filters, SendMode, FilterChipData } from "@/types/manual-send";

const DEFAULT_FILTERS: Filters = {
    vehicleYear: "all",
    vehicleType: "all",
    mileage: "all",
    visitHistory: "all",
    serviceHistory: "all",
    customerGrade: "all",
    guidance: {
        dateType: "admission",
        dateValue: "",
        visitCountMin: "",
        vehicleName: "",
        vehicleNameSelect: "",
        registrationStartDate: "",
        registrationEndDate: "",
        modelYear: "",
        mileageFrom: "",
        mileageTo: "",
    },
    happyCall: {
        deliveryStartDate: "",
        deliveryEndDate: "",
        visitCountMin: "",
        vehicleName: "",
        vehicleNameSelect: "",
        registrationStartDate: "",
        registrationEndDate: "",
        modelYear: "",
        mileageFrom: "",
        mileageTo: "",
    },
    preventive: {
        startDate: "",
        endDate: "",
        preventiveItems: [],
    },
    inspectionInsurance: {
        type: "inspection",
        startDate: "",
        endDate: "",
    },
    birthday: {
        startDate: "",
        endDate: "",
    },
};

// helpers
function pad(n: number) {
    return String(n).padStart(2, "0");
}

function toLocalInputValue(d: Date) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(
        d.getMinutes()
    )}`;
}

export function useManualSend(initialMessage?: string) {
    // 카테고리 선택
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>("guidance");

    // filters
    const [filters, setFilters] = useState<Filters>({ ...DEFAULT_FILTERS });
    const [filteredCount, setFilteredCount] = useState<number | null>(null);

    // message
    const [message, setMessage] = useState(initialMessage || "");

    // send schedule
    const [sendMode, setSendMode] = useState<SendMode>("now");
    const [scheduleAt, setScheduleAt] = useState<string>("");

    const minScheduleInput = useMemo(() => {
        const d = new Date(Date.now() + 5 * 60 * 1000); // now +5m
        return toLocalInputValue(d);
    }, []);

    const isScheduleInvalid =
        sendMode === "schedule" &&
        (!scheduleAt || new Date(scheduleAt).getTime() < new Date(minScheduleInput).getTime());

    // filter chips
    const hasFiltersApplied = useMemo(() => {
        const basicFilters = Object.entries(filters).filter(
            ([key, value]) => typeof value === "string" && key !== selectedCategory && value !== "all"
        );
        const categoryFilters = filters[selectedCategory]
            ? Object.values(filters[selectedCategory]).filter(
                  (v) => v !== "all" && v !== "" && !(Array.isArray(v) && v.length === 0)
              )
            : [];
        return basicFilters.length > 0 || categoryFilters.length > 0;
    }, [filters, selectedCategory]);

    const filterChips = useMemo(() => {
        const chips: string[] = [];
        if (filters.vehicleYear !== "all") chips.push(`연식:${filters.vehicleYear}`);
        if (filters.vehicleType !== "all") chips.push(`차종:${filters.vehicleType}`);
        if (filters.mileage !== "all") chips.push(`주행:${filters.mileage}`);
        if (filters.visitHistory !== "all") chips.push(`방문:${filters.visitHistory}`);
        if (filters.serviceHistory !== "all") chips.push(`정비:${filters.serviceHistory}`);
        if (filters.customerGrade !== "all") chips.push(`등급:${filters.customerGrade}`);

        // 카테고리별 필터 칩 추가
        const categoryFilter = filters[selectedCategory];
        Object.entries(categoryFilter).forEach(([key, value]) => {
            // 내부 제어용 필드는 표시하지 않음
            const skipKeys = ["dateType", "vehicleNameSelect", "type"];
            if (skipKeys.includes(key)) return;

            if (value !== "all" && value !== "" && !(Array.isArray(value) && value.length === 0)) {
                // 사용자 친화적인 라벨로 변경
                const friendlyLabels: { [key: string]: string } = {
                    dateValue: "날짜",
                    visitCountMin: "방문수",
                    vehicleName: "차량명",
                    registrationStartDate: "등록시작일",
                    registrationEndDate: "등록종료일",
                    modelYear: "연식",
                    mileageFrom: "최소주행거리",
                    mileageTo: "최대주행거리",
                    deliveryStartDate: "출고시작일",
                    deliveryEndDate: "출고종료일",
                    preventiveItems: "예방항목",
                    startDate: "시작일",
                    endDate: "종료일",
                    type: "유형",
                };

                const label = friendlyLabels[key] || key;
                const displayValue = Array.isArray(value) ? value.join(", ") : value;
                chips.push(`${label}: ${displayValue}`);
            }
        });
        return chips;
    }, [filters, selectedCategory]);

    // counts
    const totalTargetCount = filteredCount ?? 0;

    // 발송 가능 여부
    const canSend = totalTargetCount > 0 && message.trim().length > 0 && (sendMode === "now" || !isScheduleInvalid);

    // events
    const handleCategoryChange = (category: CategoryType) => {
        setSelectedCategory(category);
        setFilteredCount(null); // 카테고리 변경 시 결과 초기화
    };

    const handleApplyFilters = () => {
        const basicFilterCount = Object.entries(filters).filter(
            ([key, value]) => typeof value === "string" && key !== selectedCategory && value !== "all"
        ).length;
        const categoryFilterCount = Object.values(filters[selectedCategory]).filter((v) => v !== "all").length;
        const totalFilterCount = basicFilterCount + categoryFilterCount;
        const mock = Math.max(0, 500 - totalFilterCount * 60);
        setFilteredCount(mock);
    };

    const handleResetFilters = () => {
        setFilters({ ...DEFAULT_FILTERS });
        setFilteredCount(null);
    };

    const handleBasicFilterChange = (field: keyof Omit<Filters, CategoryType>, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleCategoryFilterChange = (field: string, value: string | string[]) => {
        setFilters((prev) => ({
            ...prev,
            [selectedCategory]: {
                ...prev[selectedCategory],
                [field]: value,
            },
        }));
    };

    const handleSend = () => {
        if (!canSend) return;
        if (sendMode === "now") {
            // TODO: send-now API
            console.info("SEND NOW", { message, targetCount: totalTargetCount, category: selectedCategory });
            return {
                type: "send" as const,
                data: { message, targetCount: totalTargetCount, category: selectedCategory, filters },
            };
        } else {
            // TODO: schedule API
            console.info("SCHEDULE SEND", {
                message,
                scheduleAt,
                targetCount: totalTargetCount,
                category: selectedCategory,
            });
            return {
                type: "schedule" as const,
                data: { message, scheduleAt, targetCount: totalTargetCount, category: selectedCategory, filters },
            };
        }
    };

    const handleSaveTemplate = () => {
        if (!message.trim()) return null;

        const template = {
            title: `사용자 템플릿 ${new Date().toLocaleDateString()}`,
            body: message.trim(),
        };

        console.log("발송문구 저장:", template);
        return template;
    };

    const handleDeleteMessage = () => {
        if (confirm("작성된 메시지를 삭제하시겠습니까?")) {
            setMessage("");
            return true;
        }
        return false;
    };

    const handleTemplateUse = (templateBody: string) => {
        setMessage((prev) => (prev ? prev + "\n" + templateBody : templateBody));
    };

    return {
        // State
        selectedCategory,
        filters,
        filteredCount,
        message,
        sendMode,
        scheduleAt,
        minScheduleInput,
        isScheduleInvalid,
        hasFiltersApplied,
        filterChips,
        totalTargetCount,
        canSend,

        // Actions
        setSelectedCategory: handleCategoryChange,
        setFilters,
        setMessage,
        setSendMode,
        setScheduleAt,
        handleApplyFilters,
        handleResetFilters,
        handleBasicFilterChange,
        handleCategoryFilterChange,
        handleSend,
        handleSaveTemplate,
        handleDeleteMessage,
        handleTemplateUse,
    };
}

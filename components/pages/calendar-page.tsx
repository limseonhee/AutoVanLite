"use client";

import { Container } from "@/components/layout/container";
import CalendarSection from "@/app/components/calendar-section";
import { CalendarData } from "@/types/calendar";
import { SAMPLE_CALENDAR_DATA } from "@/mocks";

interface CalendarPageProps {
    year?: number;
    month?: number;
    totalSmsCount?: number;
    totalPushCount?: number;
    dailyData?: { [key: number]: CalendarData };
}

export function CalendarPage({
    year = 2025,
    month = 9,
    totalSmsCount = 850,
    totalPushCount = 559,
    dailyData = SAMPLE_CALENDAR_DATA,
}: CalendarPageProps) {
    // 날짜 클릭 핸들러
    const handleDateClick = (day: number, data: CalendarData) => {
        console.log(`날짜 선택: ${year}-${month}-${day}`, data);
        // TODO: 날짜별 상세 정보 모달 또는 페이지 이동
        // 예: router.push(`/calendar/${year}/${month}/${day}`);
    };

    // 월 변경 핸들러
    const handleMonthChange = (newYear: number, newMonth: number) => {
        console.log(`월 변경: ${newYear}-${newMonth}`);
        // TODO: URL 업데이트 또는 상태 관리
        // 예: router.push(`/calendar/${newYear}/${newMonth}`);
    };

    return (
        <div className="min-h-screen bg-[#F9FAFC] dark:bg-gray-900">
            <Container className="py-8">
                <CalendarSection
                    year={year}
                    month={month}
                    totalSmsCount={totalSmsCount}
                    totalPushCount={totalPushCount}
                    dailyData={dailyData}
                    onDateClick={handleDateClick}
                    onMonthChange={handleMonthChange}
                />
            </Container>
        </div>
    );
}

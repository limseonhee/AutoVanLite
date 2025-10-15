"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { CalendarNavigation } from "@/components/ui/calendar-navigation";
import { CalendarGrid } from "@/components/ui/calendar-grid";
import { useCalendar } from "@/hooks/use-calendar";
import { CalendarProps, CalendarData } from "@/types/calendar";

export default function CalendarSection({
    year = 2025,
    month = 9,
    totalSmsCount = 850,
    totalPushCount = 559,
    dailyData = {},
    onDateClick,
    onMonthChange,
}: CalendarProps) {
    const {
        currentYear,
        currentMonth,
        navigateMonth,
        handleYearChange,
        handleMonthChange: handleMonthChangeInternal,
    } = useCalendar(year, month);

    // 월 변경 시 외부 콜백 호출
    const handleMonthChangeWithCallback = (newMonth: number) => {
        handleMonthChangeInternal(newMonth);
        onMonthChange?.(currentYear, newMonth);
    };

    // 년도 변경 시 외부 콜백 호출
    const handleYearChangeWithCallback = (newYear: number) => {
        handleYearChange(newYear);
        onMonthChange?.(newYear, currentMonth);
    };

    // 날짜 클릭 핸들러
    const handleDateClick = (day: number, data: CalendarData) => {
        console.log(`날짜 클릭: ${currentYear}-${currentMonth}-${day}`, data);
        onDateClick?.(day, data);
    };

    return (
        <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <div>
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Calendar className="h-6 w-6 text-purple-600" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">캘린더 뷰</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">월별 활동 현황을 확인하세요</p>
                        </div>
                    </div>

                    {/* SMS/Push 총계 */}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            SMS: {totalSmsCount.toLocaleString()}건
                        </span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="font-medium text-blue-600">Push: {totalPushCount.toLocaleString()}건</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                            총 {(totalSmsCount + totalPushCount).toLocaleString()}건
                        </span>
                    </div>
                </div>

                {/* 캘린더 네비게이션 */}
                <CalendarNavigation
                    currentYear={currentYear}
                    currentMonth={currentMonth}
                    onNavigate={navigateMonth}
                    onYearChange={handleYearChangeWithCallback}
                    onMonthChange={handleMonthChangeWithCallback}
                />

                {/* 캘린더 그리드 */}
                <CalendarGrid
                    year={currentYear}
                    month={currentMonth}
                    dailyData={dailyData}
                    onDateClick={handleDateClick}
                />
            </div>
        </Card>
    );
}

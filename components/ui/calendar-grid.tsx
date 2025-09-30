"use client";

import { CalendarGridProps } from "@/types/calendar";
import { useCalendar } from "@/hooks/use-calendar";
import { SAMPLE_CALENDAR_DATA } from "@/mocks";

export function CalendarGrid({ year, month, dailyData, onDateClick }: CalendarGridProps) {
    const { calendarDays, weekDays, getDayData, isSunday, isSaturday } = useCalendar(year, month);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800">
                {weekDays.map((day, index) => (
                    <div
                        key={day}
                        className={`p-3 text-center text-sm font-medium ${
                            index === 0
                                ? "text-red-600"
                                : index === 6
                                ? "text-blue-600"
                                : "text-gray-600 dark:text-gray-400"
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                    const dayData = getDayData(day, dailyData);
                    const isClickable = day !== null;

                    return (
                        <div
                            key={index}
                            className={`
                                min-h-[90px] p-2 border-b border-r border-gray-200 dark:border-gray-700 
                                ${
                                    day
                                        ? "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        : "bg-gray-50 dark:bg-gray-800"
                                }
                                ${isClickable && onDateClick ? "cursor-pointer" : ""}
                            `}
                            onClick={() => {
                                if (isClickable && onDateClick && day) {
                                    onDateClick(day, dayData);
                                }
                            }}
                        >
                            {day && (
                                <div className="h-full flex flex-col">
                                    <div
                                        className={`text-sm font-medium mb-1 ${
                                            isSunday(index)
                                                ? "text-red-600"
                                                : isSaturday(index)
                                                ? "text-blue-600"
                                                : "text-gray-900 dark:text-white"
                                        }`}
                                    >
                                        {day}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs text-gray-600 font-medium">SMS: {dayData.sms}건</div>
                                        <div className="text-xs text-blue-600 font-medium">Push: {dayData.push}건</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

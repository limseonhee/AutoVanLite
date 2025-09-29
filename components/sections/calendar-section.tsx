"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useState } from "react";

interface CalendarSectionProps {
    year?: number;
    month?: number;
    totalSmsCount?: number;
    totalPushCount?: number;
    dailyData?: { [key: number]: { sms: number; push: number } };
}

export function CalendarSection({
    year = 2025,
    month = 9,
    totalSmsCount = 850,
    totalPushCount = 559,
    dailyData = {},
}: CalendarSectionProps) {
    const [currentYear, setCurrentYear] = useState(year);
    const [currentMonth, setCurrentMonth] = useState(month);

    // 월 이름
    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

    // 해당 월의 첫 번째 날과 마지막 날
    const firstDay = new Date(currentYear, currentMonth - 1, 1);
    const lastDay = new Date(currentYear, currentMonth, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay(); // 0 = 일요일

    // 캘린더 날짜 배열 생성
    const calendarDays = [];

    // 이전 월의 빈 칸들
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null);
    }

    // 현재 월의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    const navigateMonth = (direction: "prev" | "next") => {
        if (direction === "prev") {
            if (currentMonth === 1) {
                setCurrentMonth(12);
                setCurrentYear(currentYear - 1);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else {
            if (currentMonth === 12) {
                setCurrentMonth(1);
                setCurrentYear(currentYear + 1);
            } else {
                setCurrentMonth(currentMonth + 1);
            }
        }
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
                    <div className="text-right">
                        <div className="space-y-1">
                            <div className="text-lg font-bold text-gray-600">
                                SMS: {totalSmsCount.toLocaleString()}건
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                                Push: {totalPushCount.toLocaleString()}건
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                            총 {(totalSmsCount + totalPushCount).toLocaleString()}건
                        </div>
                    </div>
                </div>

                {/* 캘린더 네비게이션 */}
                <div className="flex items-center justify-between mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth("prev")}
                        className="p-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] border border-[#E5E7EB] focus:ring-2 focus:ring-[rgba(62,123,250,0.30)] focus:outline-none"
                    >
                        <ChevronLeft className="h-4 w-4 text-[#64748B] hover:text-[#334155]" />
                    </Button>

                    <div className="flex items-center gap-4">
                        <select
                            value={currentYear}
                            onChange={(e) => setCurrentYear(Number(e.target.value))}
                            className="bg-[#F1F5F9] hover:bg-[#E2E8F0] focus:bg-[#E2E8F0] border border-[#E5E7EB] rounded px-3 py-1 text-sm text-[#64748B] focus:text-[#334155] focus:ring-2 focus:ring-[rgba(62,123,250,0.30)] focus:outline-none dark:bg-gray-800"
                        >
                            {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map((year) => (
                                <option key={year} value={year}>
                                    {year}년
                                </option>
                            ))}
                        </select>

                        <select
                            value={currentMonth}
                            onChange={(e) => setCurrentMonth(Number(e.target.value))}
                            className="bg-[#F1F5F9] hover:bg-[#E2E8F0] focus:bg-[#E2E8F0] border border-[#E5E7EB] rounded px-3 py-1 text-sm text-[#64748B] focus:text-[#334155] focus:ring-2 focus:ring-[rgba(62,123,250,0.30)] focus:outline-none dark:bg-gray-800"
                        >
                            {monthNames.map((name, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth("next")}
                        className="p-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] border border-[#E5E7EB] focus:ring-2 focus:ring-[rgba(62,123,250,0.30)] focus:outline-none"
                    >
                        <ChevronRight className="h-4 w-4 text-[#64748B] hover:text-[#334155]" />
                    </Button>
                </div>

                {/* 캘린더 그리드 */}
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
                            const isWeekend = index % 7 === 0 || index % 7 === 6;
                            const dayData = day
                                ? dailyData[day] || {
                                      sms: Math.floor(Math.random() * 30) + 5,
                                      push: Math.floor(Math.random() * 40) + 10,
                                  }
                                : { sms: 0, push: 0 };

                            return (
                                <div
                                    key={index}
                                    className={`
                                        min-h-[90px] p-2 border-b border-r border-gray-200 dark:border-gray-700 
                                        ${
                                            day
                                                ? "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                                                : "bg-gray-50 dark:bg-gray-800"
                                        }
                                    `}
                                >
                                    {day && (
                                        <div className="h-full flex flex-col">
                                            <div
                                                className={`text-sm font-medium mb-1 ${
                                                    isWeekend
                                                        ? index % 7 === 0
                                                            ? "text-red-600"
                                                            : "text-blue-600"
                                                        : "text-gray-900 dark:text-white"
                                                }`}
                                            >
                                                {day}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-xs text-gray-600 font-medium">
                                                    SMS: {dayData.sms}건
                                                </div>
                                                <div className="text-xs text-blue-600 font-medium">
                                                    Push: {dayData.push}건
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
}

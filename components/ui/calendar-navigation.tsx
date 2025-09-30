"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarNavigationProps } from "@/types/calendar";

export function CalendarNavigation({
    currentYear,
    currentMonth,
    onNavigate,
    onYearChange,
    onMonthChange,
}: CalendarNavigationProps) {
    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

    return (
        <div className="flex items-center justify-between mb-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("prev")}
                className="p-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] border border-[#E5E7EB] focus:ring-2 focus:ring-[rgba(62,123,250,0.30)] focus:outline-none"
            >
                <ChevronLeft className="h-4 w-4 text-[#64748B] hover:text-[#334155]" />
            </Button>

            <div className="flex items-center gap-4">
                <select
                    value={currentYear}
                    onChange={(e) => onYearChange(Number(e.target.value))}
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
                    onChange={(e) => onMonthChange(Number(e.target.value))}
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
                onClick={() => onNavigate("next")}
                className="p-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] border border-[#E5E7EB] focus:ring-2 focus:ring-[rgba(62,123,250,0.30)] focus:outline-none"
            >
                <ChevronRight className="h-4 w-4 text-[#64748B] hover:text-[#334155]" />
            </Button>
        </div>
    );
}

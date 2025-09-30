import { useState, useMemo } from "react";
import { CalendarData } from "@/types/calendar";

export function useCalendar(initialYear: number = 2025, initialMonth: number = 9) {
    const [currentYear, setCurrentYear] = useState(initialYear);
    const [currentMonth, setCurrentMonth] = useState(initialMonth);

    // 월 이름 배열
    const monthNames = useMemo(
        () => ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        []
    );

    // 요일 배열
    const weekDays = useMemo(() => ["일", "월", "화", "수", "목", "금", "토"], []);

    // 캘린더 날짜 계산
    const calendarDays = useMemo(() => {
        const firstDay = new Date(currentYear, currentMonth - 1, 1);
        const lastDay = new Date(currentYear, currentMonth, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay(); // 0 = 일요일

        const days = [];

        // 이전 월의 빈 칸들
        for (let i = 0; i < startDay; i++) {
            days.push(null);
        }

        // 현재 월의 날짜들
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    }, [currentYear, currentMonth]);

    // 월 네비게이션
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

    // 년도 변경
    const handleYearChange = (year: number) => {
        setCurrentYear(year);
    };

    // 월 변경
    const handleMonthChange = (month: number) => {
        setCurrentMonth(month);
    };

    // 날짜 데이터 가져오기
    const getDayData = (day: number | null, dailyData: { [key: number]: CalendarData }): CalendarData => {
        if (!day) return { sms: 0, push: 0 };
        return dailyData[day] || { sms: 0, push: 0 };
    };

    // 주말 여부 확인
    const isWeekend = (index: number): boolean => {
        return index % 7 === 0 || index % 7 === 6;
    };

    // 일요일 여부 확인
    const isSunday = (index: number): boolean => {
        return index % 7 === 0;
    };

    // 토요일 여부 확인
    const isSaturday = (index: number): boolean => {
        return index % 7 === 6;
    };

    return {
        currentYear,
        currentMonth,
        monthNames,
        weekDays,
        calendarDays,
        navigateMonth,
        handleYearChange,
        handleMonthChange,
        getDayData,
        isWeekend,
        isSunday,
        isSaturday,
    };
}

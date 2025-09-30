export interface CalendarData {
    sms: number;
    push: number;
}

export interface CalendarDayData extends CalendarData {
    day: number;
}

export interface CalendarProps {
    year?: number;
    month?: number;
    totalSmsCount?: number;
    totalPushCount?: number;
    dailyData?: { [key: number]: CalendarData };
    onDateClick?: (day: number, data: CalendarData) => void;
    onMonthChange?: (year: number, month: number) => void;
}

export interface CalendarNavigationProps {
    currentYear: number;
    currentMonth: number;
    onNavigate: (direction: "prev" | "next") => void;
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
}

export interface CalendarGridProps {
    year: number;
    month: number;
    dailyData: { [key: number]: CalendarData };
    onDateClick?: (day: number, data: CalendarData) => void;
}

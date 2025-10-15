import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, BarChart3 } from "lucide-react";
import CalendarSection from "@/app/components/calendar-section";
import { SAMPLE_DAILY_CHART_DATA } from "@/mocks";
import { useModal } from "@/hooks/use-modal";

interface DailyChartSectionProps {
    year?: number;
    month?: number;
    totalSmsCount?: number;
    totalPushCount?: number;
}

export default function DailyChartSection({
    year = 2025,
    month = 9,
    totalSmsCount = 0,
    totalPushCount = 0,
}: DailyChartSectionProps) {
    const { isOpen: showCalendarModal, openModal, closeModal } = useModal();

    const dailyData = SAMPLE_DAILY_CHART_DATA;
    const maxValue = Math.max(...dailyData.map((d) => d.sms + d.push));

    return (
        <>
            <Card className="p-6 bg-white dark:bg-gray-900 border-0 rounded-lg shadow-md">
                <div>
                    {/* 헤더 */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <BarChart3 className="h-6 w-6 text-purple-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                    일별 메시지 발송 현황
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <span className="font-bold text-purple-600 mr-2">{month}월 </span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        SMS: {totalSmsCount.toLocaleString()}건
                                    </span>
                                    <span className="mx-2 text-gray-400">•</span>
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        Push: {totalPushCount.toLocaleString()}건
                                    </span>
                                    <span className="mx-2 text-gray-400">•</span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                                        총 {(totalSmsCount + totalPushCount).toLocaleString()}건
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* 캘린더뷰 버튼 */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openModal()}
                            className="flex items-center gap-2 rounded-[3px] bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-700"
                        >
                            <Calendar className="h-4 w-4" />
                            캘린더뷰
                        </Button>
                    </div>

                    {/* 차트 섹션 */}
                    <div className="space-y-4 mt-8">
                        {/* 일별 메시지 발송 현황 차트 */}
                        <div className="relative">
                            {/* Y축 라벨 (좌측) */}
                            <div className="absolute left-0 top-0 h-56 flex flex-col justify-between text-xs text-gray-500 pr-2">
                                {Array.from({ length: Math.ceil(maxValue / 20) + 1 }, (_, i) => {
                                    const value = i * 20;
                                    const position = (value / maxValue) * 100;
                                    return (
                                        <div
                                            key={value}
                                            className="text-right"
                                            style={{
                                                position: "absolute",
                                                bottom: `${position}%`,
                                                transform: "translateY(50%)",
                                            }}
                                        >
                                            {value}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* 차트 본체 */}
                            <div className="ml-8 relative">
                                {/* 격자 배경 */}
                                <div className="absolute inset-0 h-56 px-2">
                                    {Array.from({ length: Math.ceil(maxValue / 20) + 1 }, (_, i) => {
                                        const value = i * 20;
                                        const position = (value / maxValue) * 100;
                                        return (
                                            <div
                                                key={`grid-${value}`}
                                                className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                                                style={{
                                                    bottom: `${position}%`,
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                {/* 선형 그래프 */}
                                <div className="relative h-56 px-2">
                                    <svg
                                        width="100%"
                                        height="180"
                                        viewBox="0 0 1000 180"
                                        preserveAspectRatio="none"
                                        className="relative z-10"
                                    >
                                        {/* SMS 라인 */}
                                        <polyline
                                            points={dailyData
                                                .map((data, index) => {
                                                    const x = (index / (dailyData.length - 1)) * 1000;
                                                    const y = 180 - (data.sms / maxValue) * 180;
                                                    return `${x},${y}`;
                                                })
                                                .join(" ")}
                                            fill="none"
                                            stroke="#FFD991"
                                            strokeWidth="3"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        {/* Push 라인 */}
                                        <polyline
                                            points={dailyData
                                                .map((data, index) => {
                                                    const x = (index / (dailyData.length - 1)) * 1000;
                                                    const y = 180 - (data.push / maxValue) * 180;
                                                    return `${x},${y}`;
                                                })
                                                .join(" ")}
                                            fill="none"
                                            stroke="#3B82F6"
                                            strokeWidth="3"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        {/* 포인트 */}
                                        {dailyData.map((data, index) => {
                                            const x = (index / (dailyData.length - 1)) * 1000;
                                            const smsY = 180 - (data.sms / maxValue) * 180;
                                            const pushY = 180 - (data.push / maxValue) * 180;
                                            return (
                                                <g key={data.day}>
                                                    <circle
                                                        cx={x}
                                                        cy={smsY}
                                                        r="4"
                                                        fill="#FFD991"
                                                        className="cursor-pointer"
                                                    />
                                                    <circle
                                                        cx={x}
                                                        cy={pushY}
                                                        r="4"
                                                        fill="#3B82F6"
                                                        className="cursor-pointer"
                                                    />
                                                </g>
                                            );
                                        })}
                                    </svg>
                                    {/* 날짜 라벨 */}
                                    <div className="flex justify-between items-end px-2 mt-4">
                                        {dailyData.map((data) => (
                                            <div key={data.day} className="text-xs text-gray-500 flex-1 text-center">
                                                {data.day}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 범례 (하단으로 이동) */}
                        <div className="flex items-center justify-center gap-6 text-sm mb-6 mt-32">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: "#FFD991" }}></div>
                                <span className="text-gray-600">SMS</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-3 bg-blue-500 rounded-sm"></div>
                                <span className="text-gray-600">Push</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* 캘린더 모달 */}
            {showCalendarModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">캘린더 뷰</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={closeModal}
                                className="rounded-[3px] bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-700"
                            >
                                닫기
                            </Button>
                        </div>
                        <div className="p-4">
                            <CalendarSection
                                year={year}
                                month={month}
                                totalSmsCount={totalSmsCount}
                                totalPushCount={totalPushCount}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

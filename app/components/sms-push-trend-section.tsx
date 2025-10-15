"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface TrendData {
    period: string;
    smsPercent: number;
    pushPercent: number;
    description: string;
}

interface SmsushTrendSectionProps {
    trendData: readonly TrendData[];
}

export default function SmsPushTrendSection({ trendData }: SmsushTrendSectionProps) {
    // 최신 데이터 (첫 번째 항목) 사용
    const latestData = trendData[0];

    // 도넛 차트 설정
    const size = 178;
    const strokeWidth = 60;
    const center = size / 2;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // SMS와 Push 비율 계산
    const smsPercent = latestData.smsPercent;
    const pushPercent = latestData.pushPercent;

    // 각 세그먼트의 길이 계산
    const smsLength = (smsPercent / 100) * circumference;
    const pushLength = (pushPercent / 100) * circumference;

    // SMS는 12시 방향부터 시계방향으로, Push는 그 다음부터
    const smsOffset = -circumference / 4; // 12시 방향에서 시작
    const pushOffset = smsOffset - smsLength; // SMS 다음부터 시작

    return (
        <Card className="p-6 border-0 rounded-lg shadow-sm h-full" style={{ backgroundColor: "#3B82F6" }}>
            <div className="h-full flex flex-col">
                {/* 헤더 */}
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-6 w-6 text-white" />
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">SMS vs 푸시메시지 사용율 추이</h3>
                        <p className="text-sm text-white">차계부 설치율 증가에 따른 메시지 채널 변화</p>
                    </div>
                </div>

                {/* 도넛 차트 및 범례 */}
                <div className="flex items-center justify-end flex-1" style={{ gap: "50px" }}>
                    {/* 차트 */}
                    <div className="relative">
                        <svg width={size} height={size} className="transform -rotate-90">
                            {/* 배경 원 (전체 흰색) */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="none"
                                stroke="white"
                                strokeWidth={strokeWidth}
                                strokeOpacity="1"
                            />
                            {/* SMS 세그먼트 (상단, 주황색) */}
                            <circle
                                cx={center}
                                cy={center}
                                r={radius}
                                fill="none"
                                stroke="#FFD991"
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${smsLength} ${circumference}`}
                                strokeDashoffset={smsOffset}
                                strokeLinecap="butt"
                            />
                        </svg>
                    </div>

                    {/* 범례 */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-3 rounded-sm" style={{ backgroundColor: "#FFD991" }}></div>
                            <span className="text-white text-sm">SMS</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-3 bg-white rounded-sm"></div>
                            <span className="text-white text-sm">Push</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

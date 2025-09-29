"use client";

import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

// 애니메이션 키프레임 정의
const animationStyles = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideFromLeft {
    from { 
        opacity: 0;
        transform: translateX(-20px);
    }
    to { 
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes popIn {
    from { 
        opacity: 0;
        transform: scale(0.5);
    }
    to { 
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes highlight {
    0% { 
        opacity: 0;
        transform: scale(0.8);
    }
    50% { 
        opacity: 1;
        transform: scale(1.2);
    }
    100% { 
        opacity: 1;
        transform: scale(1);
    }
}
`;

interface TrendData {
    period: string;
    smsPercent: number;
    pushPercent: number;
    description: string;
}

interface SmsushTrendSectionProps {
    trendData: readonly TrendData[];
}

export function SmsPushTrendSection({ trendData }: SmsushTrendSectionProps) {
    // SVG 차트 설정 (여백 확장)
    const chartWidth = 700;
    const chartHeight = 420;
    const leftMargin = 120;
    const rightMargin = 120;
    const visualPadding = 0.03; // 2-3% 시각 패딩
    const topY = 50;
    const bottomY = 300;

    // 5개 포인트 X 좌표 계산
    const pointCount = trendData.length;
    const chartAreaWidth = chartWidth - leftMargin - rightMargin;
    const getPointX = (index: number) => leftMargin + (index * chartAreaWidth) / (pointCount - 1);

    // Y축 0-100% 고정, 시각적 패딩 적용
    const percentToY = (percent: number) => {
        const adjustedPercent = (percent / 100) * (1 - 2 * visualPadding) + visualPadding;
        return bottomY - adjustedPercent * (bottomY - topY);
    };

    // 모든 포인트의 좌표 계산
    const smsPoints = trendData.map((data, index) => ({
        x: getPointX(index),
        y: percentToY(data.smsPercent),
        percent: data.smsPercent,
        period: data.period,
    }));

    const pushPoints = trendData.map((data, index) => ({
        x: getPointX(index),
        y: percentToY(data.pushPercent),
        percent: data.pushPercent,
        period: data.period,
    }));

    // 교차점 찾기 (2단계: 50-50)
    const crossoverIndex = trendData.findIndex((data) => data.smsPercent === 50 && data.pushPercent === 50);
    const crossoverPoint =
        crossoverIndex !== -1
            ? {
                  x: getPointX(crossoverIndex),
                  y: percentToY(50),
                  period: trendData[crossoverIndex].period,
              }
            : null;

    // 리본 영역을 위한 패스 생성
    const createRibbonPath = () => {
        let pathD = `M ${smsPoints[0].x} ${smsPoints[0].y}`;
        // SMS 라인 (상단)
        for (let i = 1; i < smsPoints.length; i++) {
            pathD += ` L ${smsPoints[i].x} ${smsPoints[i].y}`;
        }
        // Push 라인 (하단, 역순)
        for (let i = pushPoints.length - 1; i >= 0; i--) {
            pathD += ` L ${pushPoints[i].x} ${pushPoints[i].y}`;
        }
        pathD += " Z";
        return pathD;
    };

    // 현재와 목표 데이터 (호환성을 위해 유지)
    const currentData = trendData[0];
    const targetData = trendData[trendData.length - 1];

    return (
        <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <style jsx>{animationStyles}</style>
            <div>
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <TrendingUp className="h-6 w-6 text-blue-600" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                SMS vs 푸시메시지 사용률 추이
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                차계부 설치율 증가에 따른 메시지 채널 변화
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                            -{Math.round((currentData.smsPercent - targetData.smsPercent) * 0.9)}%
                        </div>
                        <div className="text-xs text-gray-500">비용 절감 가능</div>
                    </div>
                </div>

                {/* 메인 콘텐츠: 중앙 정렬 차트 */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                            {/* 25% 간격 옅은 점선 그리드 */}
                            {[0, 25, 50, 75, 100].map((percent) => (
                                <g key={percent}>
                                    <line
                                        x1={leftMargin - 15}
                                        y1={percentToY(percent)}
                                        x2={chartWidth - rightMargin + 15}
                                        y2={percentToY(percent)}
                                        stroke="#F3F4F6"
                                        strokeWidth="1"
                                        strokeDasharray="1,3"
                                        opacity="0.6"
                                    />
                                    <text
                                        x={leftMargin - 25}
                                        y={percentToY(percent) + 4}
                                        textAnchor="end"
                                        className="text-xs fill-gray-400"
                                        fontWeight="500"
                                    >
                                        {percent}%
                                    </text>
                                </g>
                            ))}

                            {/* 음영 리본 (단계적 투명도) */}
                            <defs>
                                <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#6B7280" stopOpacity="0.24" />
                                    <stop offset="25%" stopColor="#6B7280" stopOpacity="0.18" />
                                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.12" />
                                    <stop offset="75%" stopColor="#3B82F6" stopOpacity="0.18" />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.24" />
                                </linearGradient>
                            </defs>
                            <path
                                d={createRibbonPath()}
                                fill="url(#ribbonGradient)"
                                className="animate-[fadeIn_450ms_ease-out]"
                            />

                            {/* SMS 라인 (뉴트럴 그레이) */}
                            <path
                                d={`M ${smsPoints.map((p) => `${p.x},${p.y}`).join(" L ")}`}
                                stroke="#6B7280"
                                strokeWidth="3"
                                fill="none"
                                className="drop-shadow-sm animate-[slideFromLeft_450ms_ease-out]"
                            />

                            {/* 푸시 라인 (브랜드 블루) */}
                            <path
                                d={`M ${pushPoints.map((p) => `${p.x},${p.y}`).join(" L ")}`}
                                stroke="#3B82F6"
                                strokeWidth="3"
                                fill="none"
                                className="drop-shadow-sm animate-[slideFromLeft_450ms_ease-out_150ms]"
                            />

                            {/* 설치율 얇은 점선 보조 라인 */}
                            <path
                                d={`M ${trendData
                                    .map((_, index) => `${getPointX(index)},${percentToY(5 + index * 22.5)}`)
                                    .join(" L ")}`}
                                stroke="#F59E0B"
                                strokeWidth="1.5"
                                strokeDasharray="3,6"
                                fill="none"
                                opacity="0.5"
                                className="animate-[slideFromLeft_450ms_ease-out_300ms]"
                            />

                            {/* SMS 포인트들 */}
                            {smsPoints.map((point, index) => {
                                const isCurrentPosition = index === 0; // 첫 번째(초기)가 현재 위치
                                return (
                                    <g key={`sms-${index}`}>
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
                                            r={isCurrentPosition ? "8" : "5"}
                                            fill={isCurrentPosition ? "#EF4444" : "#6B7280"}
                                            className="drop-shadow-sm animate-[popIn_300ms_ease-out]"
                                            style={{ animationDelay: `${index * 100 + 600}ms` }}
                                        />
                                        {isCurrentPosition && (
                                            <circle
                                                cx={point.x}
                                                cy={point.y}
                                                r="12"
                                                fill="none"
                                                stroke="#EF4444"
                                                strokeWidth="2"
                                                strokeDasharray="4,4"
                                                opacity="0.6"
                                                className="animate-pulse"
                                            />
                                        )}
                                    </g>
                                );
                            })}

                            {/* 푸시 포인트들 */}
                            {pushPoints.map((point, index) => {
                                const isCurrentPosition = index === 0; // 첫 번째(초기)가 현재 위치
                                return (
                                    <g key={`push-${index}`}>
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
                                            r={isCurrentPosition ? "8" : "5"}
                                            fill={isCurrentPosition ? "#EF4444" : "#3B82F6"}
                                            className="drop-shadow-sm animate-[popIn_300ms_ease-out]"
                                            style={{ animationDelay: `${index * 100 + 700}ms` }}
                                        />
                                        {isCurrentPosition && (
                                            <circle
                                                cx={point.x}
                                                cy={point.y}
                                                r="12"
                                                fill="none"
                                                stroke="#EF4444"
                                                strokeWidth="2"
                                                strokeDasharray="4,4"
                                                opacity="0.6"
                                                className="animate-pulse"
                                            />
                                        )}
                                    </g>
                                );
                            })}

                            {/* 현재 위치 배경 밴드 및 헤어라인 */}
                            <g>
                                {/* 현재 위치 배경 밴드 */}
                                <rect
                                    x={getPointX(0) - 25}
                                    y={topY}
                                    width="50"
                                    height={bottomY - topY}
                                    fill="#E5F0FF"
                                    opacity="0.2"
                                />
                                {/* 현재 위치 세로 헤어라인 */}
                                <line
                                    x1={getPointX(0)}
                                    y1={topY}
                                    x2={getPointX(0)}
                                    y2={bottomY + 35}
                                    stroke="#EF4444"
                                    strokeWidth="1.5"
                                    strokeDasharray="2,3"
                                    opacity="0.6"
                                />
                            </g>

                            {/* 교차 스포트라이트 */}
                            {crossoverPoint && (
                                <g className="animate-[highlight_600ms_ease-out_1200ms]">
                                    {/* 세로 가이드 라인 */}
                                    <line
                                        x1={crossoverPoint.x}
                                        y1={topY}
                                        x2={crossoverPoint.x}
                                        y2={bottomY}
                                        stroke="#F59E0B"
                                        strokeWidth="2"
                                        strokeDasharray="6,3"
                                        opacity="0.8"
                                    />
                                    {/* 교차점 강조 원 */}
                                    <circle
                                        cx={crossoverPoint.x}
                                        cy={crossoverPoint.y}
                                        r="8"
                                        fill="none"
                                        stroke="#F59E0B"
                                        strokeWidth="3"
                                        opacity="0.9"
                                    />
                                    <circle
                                        cx={crossoverPoint.x}
                                        cy={crossoverPoint.y}
                                        r="4"
                                        fill="#F59E0B"
                                        opacity="0.9"
                                    />
                                    {/* 콜아웃 메시지 */}
                                    <foreignObject x={crossoverPoint.x - 100} y={topY - 55} width="200" height="45">
                                        <div className="bg-amber-100 border border-amber-300 rounded-lg px-4 py-2 text-xs font-semibold text-amber-800 text-center shadow-lg">
                                            <div>🎯 설치율 50% 돌파</div>
                                            <div>→ Push 비중 역전</div>
                                        </div>
                                    </foreignObject>
                                </g>
                            )}

                            {/* 퍼센트 라벨들 (중간 포인트만 표시) */}
                            {smsPoints.map((point, index) => {
                                const isFirst = index === 0;
                                const isLast = index === smsPoints.length - 1;

                                // 첫 번째와 마지막은 표시하지 않음
                                if (!isFirst && !isLast) {
                                    return (
                                        <text
                                            key={`sms-label-${index}`}
                                            x={point.x}
                                            y={point.y - 12}
                                            textAnchor="middle"
                                            className="text-xs font-medium fill-gray-500"
                                        >
                                            {point.percent}%
                                        </text>
                                    );
                                }
                                return null;
                            })}

                            {pushPoints.map((point, index) => {
                                const isFirst = index === 0;
                                const isLast = index === pushPoints.length - 1;

                                // 첫 번째와 마지막은 표시하지 않음
                                if (!isFirst && !isLast) {
                                    return (
                                        <text
                                            key={`push-label-${index}`}
                                            x={point.x}
                                            y={point.y + 20}
                                            textAnchor="middle"
                                            className="text-xs font-medium fill-blue-500"
                                        >
                                            {point.percent}%
                                        </text>
                                    );
                                }
                                return null;
                            })}

                            {/* 기간 라벨들 */}
                            {trendData.map((data, index) => (
                                <text
                                    key={`period-${index}`}
                                    x={getPointX(index)}
                                    y={bottomY + 25}
                                    textAnchor="middle"
                                    className="text-xs font-medium fill-gray-500"
                                >
                                    {data.period}
                                </text>
                            ))}
                        </svg>

                        {/* 범례 (그래프 바로 아래) */}
                        <div className="flex items-center justify-center gap-6 mt-2 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-gray-500"></div>
                                <span>SMS</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-blue-500"></div>
                                <span>푸시메시지</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 border-t-2 border-dashed border-amber-500"></div>
                                <span>설치율</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 액션 유도 */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-semibold text-blue-700 dark:text-blue-400 mb-1">
                                💡 차계부 설치율을 늘려 푸시 메시지 활용을 극대화하세요!
                            </div>
                            <div className="text-sm text-blue-600 dark:text-blue-400">
                                설치율 증가 → 푸시 사용률 증가 → 메시지 비용 대폭 절감
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">최대 80%</div>
                            <div className="text-xs text-blue-500">비용 절감</div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

"use client";

import { Card } from "@/components/ui/card";
import { Target, Users } from "lucide-react";

interface SimpleInstallationGaugeProps {
    currentInstalls: number;
    targetInstalls: number;
}

// 마일스톤 배지 정의
const MILESTONES = [
    { threshold: 100, name: "브론즈", color: "#CD7F32", icon: "🥉" },
    { threshold: 500, name: "실버", color: "#C0C0C0", icon: "🥈" },
    { threshold: 1000, name: "골드", color: "#FFD700", icon: "🥇" },
    { threshold: 2000, name: "플래티넘", color: "#E5E4E2", icon: "💎" },
    { threshold: 5000, name: "다이아몬드", color: "#B9F2FF", icon: "💠" },
    { threshold: 10000, name: "마스터", color: "#9932CC", icon: "👑" },
];

export function SimpleInstallationGauge({ currentInstalls, targetInstalls }: SimpleInstallationGaugeProps) {
    const progressPercentage = Math.min((currentInstalls / targetInstalls) * 100, 100);

    // 현재 달성한 배지 찾기
    const currentBadge = MILESTONES.filter((milestone) => currentInstalls >= milestone.threshold).pop();

    // 다음 목표 배지 찾기
    const nextBadge = MILESTONES.find((milestone) => currentInstalls < milestone.threshold);

    // 다음 목표까지 남은 수량 계산 (다음 배지 목표 - 현재 수량)
    const remainingToNextBadge = nextBadge ? Math.max(nextBadge.threshold - currentInstalls, 0) : 0;

    return (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 rounded-lg">
            <div className="space-y-4">
                {/* 헤더 */}
                <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">설치목표</span>
                </div>

                {/* 달성률 표시 */}
                <div className="text-right mb-3">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">달성률</div>
                </div>

                {/* 프로그레스 바 */}
                <div className="space-y-3">
                    {/* 게이지 위 배지 표시 */}
                    <div className="relative">
                        {/* 현재 달성 배지 위치 */}
                        {currentBadge && (
                            <div
                                className="absolute -top-10 transform -translate-x-1/2 flex flex-col items-center"
                                style={{
                                    left: `${Math.min(
                                        (currentBadge.threshold / Math.max(...MILESTONES.map((m) => m.threshold))) *
                                            100,
                                        100
                                    )}%`,
                                }}
                            >
                                <div className="flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 w-8 h-8 rounded-full shadow-lg border-2 border-white animate-pulse">
                                    <span className="text-base">{currentBadge.icon}</span>
                                </div>
                                <div className="w-1 h-3 bg-yellow-500 mt-1 rounded-full"></div>
                            </div>
                        )}

                        {/* 다음 목표 배지 위치 */}
                        {nextBadge && (
                            <div
                                className="absolute -top-10 transform -translate-x-1/2 flex flex-col items-center"
                                style={{
                                    left: `${Math.min(
                                        (nextBadge.threshold / Math.max(...MILESTONES.map((m) => m.threshold))) * 100,
                                        100
                                    )}%`,
                                }}
                            >
                                <div className="flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 w-8 h-8 rounded-full shadow-lg border-2 border-white opacity-80 hover:opacity-100 transition-opacity">
                                    <span className="text-base text-white">{nextBadge.icon}</span>
                                </div>
                                <div className="w-1 h-3 bg-blue-500 mt-1 rounded-full opacity-80"></div>
                            </div>
                        )}

                        {/* 프로그레스 바 */}
                        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-6">
                            <div
                                className="h-full bg-green-500 transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            />

                            {/* 마일스톤 눈금 표시 */}
                            {MILESTONES.map((milestone) => {
                                const position =
                                    (milestone.threshold / Math.max(...MILESTONES.map((m) => m.threshold))) * 100;
                                const isAchieved = currentInstalls >= milestone.threshold;
                                const isCurrent = currentBadge?.threshold === milestone.threshold;
                                const isNext = nextBadge?.threshold === milestone.threshold;

                                return (
                                    <div
                                        key={milestone.threshold}
                                        className="absolute top-0 w-0.5 h-full transform -translate-x-1/2"
                                        style={{ left: `${Math.min(position, 100)}%` }}
                                    >
                                        <div
                                            className={`w-full h-full ${
                                                isAchieved ? "bg-green-600" : isNext ? "bg-blue-400" : "bg-gray-300"
                                            }`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>현재: {currentInstalls.toLocaleString()}건</span>
                        <span>목표: {targetInstalls.toLocaleString()}건</span>
                    </div>
                </div>

                {/* 하단 정보 - 현재 배지와 다음 목표 */}
                <div className="flex items-center justify-between pt-3 border-t border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">이번 달 목표 달성률</span>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                        {remainingToNextBadge > 0
                            ? `${remainingToNextBadge.toLocaleString()}건 남음`
                            : "최고 등급 달성!"}
                    </div>
                </div>
            </div>
        </Card>
    );
}

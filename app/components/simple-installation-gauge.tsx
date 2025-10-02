import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SimpleInstallationGaugeProps {
    currentInstalls: number;
    targetInstalls: number;
}

export default function SimpleInstallationGauge({ currentInstalls, targetInstalls }: SimpleInstallationGaugeProps) {
    // 마일스톤 배지 정의
    const MILESTONES = [
        { threshold: 100, name: "브론즈", color: "#CD7F32", icon: "🥉" },
        { threshold: 500, name: "실버", color: "#C0C0C0", icon: "🥈" },
        { threshold: 1000, name: "골드", color: "#FFD700", icon: "🥇" },
        { threshold: 2000, name: "플래티넘", color: "#E5E4E2", icon: "💎" },
    ];
    const progressPercentage = Math.min((currentInstalls / targetInstalls) * 100, 100);
    // 현재 달성한 배지 찾기
    const currentBadge = MILESTONES.filter((milestone) => currentInstalls >= milestone.threshold).pop();
    // 다음 목표 배지 찾기
    const nextBadge = MILESTONES.find((milestone) => currentInstalls < milestone.threshold);
    // 남은 수량 계산
    const remainingToTarget = targetInstalls - currentInstalls;

    return (
        <div>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                {/* 1행: 제목 + 달성률 + 버튼 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">차계부 설치 현황</h2>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            전체 달성률{" "}
                            <span className="text-cyan-500 font-semibold">{Math.round(progressPercentage)}%</span>
                        </div>
                    </div>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 text-sm rounded-[3px] whitespace-nowrap">
                        내 인증 배지 확인
                    </Button>
                </div>

                {/* 2행: 프로그레스 바 */}
                <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative py-2">
                        {/* 현재 달성 배지 위치 */}
                        {currentBadge && (
                            <div
                                className="absolute -top-8 transform -translate-x-1/2 flex flex-col items-center z-10"
                                style={{
                                    left: `${Math.min(
                                        (currentBadge.threshold / Math.max(...MILESTONES.map((m) => m.threshold))) *
                                            100,
                                        100
                                    )}%`,
                                }}
                            >
                                <div
                                    className="flex items-center justify-center w-7 h-7 rounded-full shadow-md border-2 border-white"
                                    style={{ backgroundColor: currentBadge.color }}
                                >
                                    <span className="text-sm">{currentBadge.icon}</span>
                                </div>
                                <div className="w-0.5 h-2 bg-gray-400 mt-0.5"></div>
                            </div>
                        )}

                        {/* 다음 목표 배지 위치 */}
                        {nextBadge && (
                            <div
                                className="absolute -top-8 transform -translate-x-1/2 flex flex-col items-center z-10"
                                style={{
                                    left: `${Math.min(
                                        (nextBadge.threshold / Math.max(...MILESTONES.map((m) => m.threshold))) * 100,
                                        100
                                    )}%`,
                                }}
                            >
                                <div
                                    className="flex items-center justify-center w-7 h-7 rounded-full shadow-md border-2 border-white opacity-40"
                                    style={{ backgroundColor: nextBadge.color }}
                                >
                                    <span className="text-sm">{nextBadge.icon}</span>
                                </div>
                                <div className="w-0.5 h-2 bg-gray-300 mt-0.5 opacity-40"></div>
                            </div>
                        )}

                        {/* 프로그레스 바 */}
                        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-4">
                            <div
                                className="h-full bg-cyan-500 transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progressPercentage}%` }}
                            />

                            {/* 마일스톤 눈금 표시 */}
                            {MILESTONES.map((milestone) => {
                                const position =
                                    (milestone.threshold / Math.max(...MILESTONES.map((m) => m.threshold))) * 100;
                                const isAchieved = currentInstalls >= milestone.threshold;

                                return (
                                    <div
                                        key={milestone.threshold}
                                        className="absolute top-0 w-0.5 h-full transform -translate-x-1/2"
                                        style={{ left: `${Math.min(position, 100)}%` }}
                                    >
                                        <div
                                            className={`w-full h-full ${
                                                isAchieved ? "bg-cyan-700" : "bg-gray-300 dark:bg-gray-600"
                                            }`}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        {/* 현재값 표시 */}
                        <div
                            className="absolute top-6 transform -translate-x-1/2 bg-cyan-500 text-white px-2.5 py-0.5 rounded-md text-base font-bold shadow-lg"
                            style={{ left: `${Math.min(progressPercentage, 100)}%` }}
                        >
                            {currentInstalls.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* 3행: 통계 텍스트 */}
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2">
                    <span>
                        이번달 목표: {targetInstalls.toLocaleString()}건 / 현재: {currentInstalls.toLocaleString()}건
                    </span>
                    <span>이번달 목표까지: {remainingToTarget.toLocaleString()}건</span>
                </div>
            </Card>
        </div>
    );
}

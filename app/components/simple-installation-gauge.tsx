import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SimpleInstallationGaugeProps {
    currentInstalls: number;
    targetInstalls: number;
}

export default function SimpleInstallationGauge({ currentInstalls, targetInstalls }: SimpleInstallationGaugeProps) {
    // 마일스톤 배지 정의
    const MILESTONES = [
        { threshold: 500, name: "브론즈", color: "#CD7F32", icon: "🥉" },
        { threshold: 2000, name: "실버", color: "#C0C0C0", icon: "🥈" },
        { threshold: 10000, name: "골드", color: "#FFD700", icon: "🥇" },
        { threshold: 20000, name: "플래티넘", color: "#E5E4E2", icon: "💎" },
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
            <Card className="p-6 px-16 border-0 shadow-md" style={{ backgroundColor: "#F9FAFC" }}>
                {/* 1행: 제목 + 달성률 + 버튼 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">차계부 설치 현황</h2>
                        <div className="text-base text-gray-500 dark:text-gray-400">
                            전체 달성률{" "}
                            <span className="font-semibold" style={{ color: "#2DDADB" }}>
                                {Math.round(progressPercentage)}%
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="border-2 bg-white hover:bg-cyan-50 px-4 py-1.5 text-xs font-bold rounded-full whitespace-nowrap"
                        style={{ borderColor: "#2DDADB", color: "#2DDADB" }}
                    >
                        내 인증 배지 확인
                    </Button>
                </div>

                {/* 2행: 프로그레스 바 */}
                <div className="mb-6 pb-7 border-b border-gray-200 dark:border-gray-700">
                    <div className="relative py-8">
                        {/* 모든 마일스톤 배지 표시 */}
                        {MILESTONES.map((milestone) => {
                            const position = (milestone.threshold / targetInstalls) * 100;
                            const isAchieved = currentInstalls >= milestone.threshold;

                            return (
                                <div
                                    key={milestone.threshold}
                                    className="absolute -top-0 transform -translate-x-1/2 flex flex-col items-center z-10"
                                    style={{
                                        left: `${Math.min(position, 100)}%`,
                                    }}
                                >
                                    <div
                                        className={`flex items-center justify-center w-7 h-7 rounded-full shadow-md border-2 border-white ${
                                            isAchieved ? "" : "opacity-40"
                                        }`}
                                        style={{ backgroundColor: milestone.color }}
                                    >
                                        <span className="text-sm">{milestone.icon}</span>
                                    </div>
                                </div>
                            );
                        })}

                        {/* 프로그레스 바 */}
                        <div className="relative h-6 bg-white rounded-full overflow-visible mt-1 shadow-lg">
                            <div
                                className="h-full transition-all duration-500 ease-out rounded-l-full"
                                style={{ width: `${progressPercentage}%`, backgroundColor: "#2DDADB" }}
                            />

                            {/* 도달 지점 삼각형 */}
                            <div
                                className="absolute transform -translate-x-1/2"
                                style={{ left: `${Math.min(progressPercentage, 100)}%`, top: "-15px" }}
                            >
                                <div
                                    className="w-0 h-0"
                                    style={{
                                        borderLeft: "6px solid transparent",
                                        borderRight: "6px solid transparent",
                                        borderTop: "8px solid #2DDADB",
                                    }}
                                />
                            </div>

                            {/* 마일스톤 눈금 표시 (마지막 제외) */}
                            {MILESTONES.slice(0, -1).map((milestone) => {
                                const position = (milestone.threshold / targetInstalls) * 100;

                                return (
                                    <div
                                        key={milestone.threshold}
                                        className="absolute top-0 w-0.5 h-full transform -translate-x-1/2"
                                        style={{ left: `${Math.min(position, 100)}%`, backgroundColor: "#E1E1E1" }}
                                    />
                                );
                            })}
                        </div>

                        {/* 현재값 표시 */}
                        <div
                            className="absolute transform -translate-x-1/2 bg-white px-3 py-1 rounded-md text-xl font-bold"
                            style={{ left: `${Math.min(progressPercentage, 100)}%`, top: "70px", color: "#2DDADB" }}
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

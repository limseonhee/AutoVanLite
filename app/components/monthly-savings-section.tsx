import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

interface MonthlySavingsSectionProps {
    savingsAmount: number;
    originalCost: number;
    savingsPercentage: number;
    onAddSavings?: () => void;
}

export default function MonthlySavingsSection({
    savingsAmount,
    originalCost,
    savingsPercentage,
    onAddSavings,
}: MonthlySavingsSectionProps) {
    return (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-0 shadow-md h-full">
            <div className="flex flex-col h-full">
                {/* 이달 절감액 라벨 */}
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">이달 절감액</h3>
                </div>

                {/* 절감액 금액 */}
                <div className="mb-3">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {savingsAmount.toLocaleString()}원
                    </span>
                </div>

                {/* 절감 설명 */}
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1">
                    기존 SMS 비용 <span className="font-medium">{originalCost.toLocaleString()}원</span>
                    {" → SMS 대신 "}
                    <span className="font-medium text-blue-600">{savingsPercentage}% 절감</span>
                </div>

                {/* 추가절감하기 버튼 */}
                <Button
                    onClick={onAddSavings}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm rounded-[3px] w-full"
                >
                    {/* <TrendingUp className="h-4 w-4 mr-1" /> */}
                    추가절감하기
                </Button>
            </div>
        </Card>
    );
}

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Send, Users } from "lucide-react";
import { CommonSendPopup } from "@/components/modals/common-send-popup";
import { generateCustomers, BULK_REPORT_PREVIEW } from "@/mocks";

interface BulkReportSendSectionProps {
    todayInboundCount: number;
    todaySentCount: number;
    onViewAll?: () => void;
    onBulkSend?: () => void;
}

export function BulkReportSendSection({
    todayInboundCount,
    todaySentCount,
    onViewAll,
    onBulkSend,
}: BulkReportSendSectionProps) {
    const [showBulkSendPopup, setShowBulkSendPopup] = useState(false);

    // 샘플 데이터 생성
    const remainingCount = todayInboundCount - todaySentCount;
    const sampleCustomers = generateCustomers("statements", remainingCount);

    return (
        <>
            <Card className="p-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div>
                    {/* 헤더 */}
                    <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                            점검정비명세서 일괄발송
                        </h3>
                    </div>

                    {/* 통계 카드들 */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* 오늘 입고 건 */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                {todayInboundCount}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">오늘 입고 건</div>
                        </div>

                        {/* 오늘 발송 건 */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {todaySentCount}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">오늘 발송 건</div>
                        </div>
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex items-center justify-between gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowBulkSendPopup(true)}
                            className="text-xs px-3 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 flex-1  rounded-[3px]"
                        >
                            <Eye className="h-3 w-3 mr-1" />
                            발송 전 확인
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => setShowBulkSendPopup(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 flex-1 rounded-[3px]"
                        >
                            <Send className="h-3 w-3 mr-1" />
                            일괄발송
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 공통 발송 팝업 */}
            <CommonSendPopup
                isOpen={showBulkSendPopup}
                onClose={() => setShowBulkSendPopup(false)}
                title="점검정비명세서 일괄발송"
                icon={<Users className="h-5 w-5 text-blue-600" />}
                description="오늘 작업 완료된 차량들의 점검정비명세서를 고객들에게 일괄로 발송합니다."
                totalTargets={remainingCount}
                targetButtonText="발송 대상"
                previewContent={BULK_REPORT_PREVIEW}
                onPreview={() => {
                    console.log("명세서 미리보기");
                }}
                onSend={() => {
                    console.log("점검정비명세서 일괄발송 실행");
                    onBulkSend?.();
                    setShowBulkSendPopup(false);
                }}
                customerList={sampleCustomers}
            />
        </>
    );
}

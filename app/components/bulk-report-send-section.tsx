import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Send, Users } from "lucide-react";
import { CommonSendPopup } from "@/components/modals/common-send-popup";
import { generateCustomers, BULK_REPORT_PREVIEW } from "@/mocks";
import { useModal } from "@/hooks/use-modal";

interface BulkReportSendSectionProps {
    todayInboundCount: number;
    todaySentCount: number;
    onViewAll?: () => void;
    onBulkSend?: () => void;
}

export default function BulkReportSendSection({
    todayInboundCount,
    todaySentCount,
    onViewAll,
    onBulkSend,
}: BulkReportSendSectionProps) {
    const { isOpen: showBulkSendPopup, openModal, closeModal } = useModal();
    // 샘플 데이터 생성
    const remainingCount = todayInboundCount - todaySentCount;
    const sampleCustomers = generateCustomers("statements", remainingCount);

    return (
        <>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm h-full">
                <div className="flex flex-col h-full">
                    {/* 헤더 */}
                    <div className="flex items-center gap-2 mb-6">
                        <FileText className="h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">점검정비명세서 일괄발송</h3>
                    </div>

                    {/* 통계 카드들 */}
                    <div className="grid grid-cols-2 gap-3 mb-4 flex-1">
                        {/* 오늘 입고 건 */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 text-center flex flex-col justify-center">
                            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                {todayInboundCount}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">오늘 입고 건</div>
                        </div>

                        {/* 오늘 발송 건 */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 flex flex-col justify-center">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                {todaySentCount}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">오늘 발송 건</div>
                        </div>
                    </div>

                    {/* 액션 버튼들 */}
                    <div className="flex items-center justify-between gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-sm px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex-1 rounded-[3px]"
                        >
                            {/* <Eye className="h-4 w-4 mr-1" /> */}
                            발송 전 확인
                        </Button>
                        <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 flex-1 rounded-[3px]"
                        >
                            {/* <Send className="h-4 w-4 mr-1" /> */}
                            일괄발송
                        </Button>
                    </div>
                </div>
            </Card>

            {/* 공통 발송 팝업 */}
            <CommonSendPopup
                isOpen={showBulkSendPopup}
                onClose={closeModal}
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
                    closeModal();
                }}
                customerList={sampleCustomers}
            />
        </>
    );
}

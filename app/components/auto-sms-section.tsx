import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Users, Eye } from "lucide-react";
import { CommonSendPopup } from "@/components/modals/common-send-popup";
import { generateCustomers, getSegmentMessage } from "@/mocks";

interface AutoSmsSectionProps {
    smsTargets: number;
    pushTargets: number;
    segments: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly condition: string;
        readonly targetCount: number;
        readonly status: "ready" | "sending" | "completed";
        readonly channels: readonly ("SMS" | "Push")[];
    }>;
    onSendSegment?: (segmentId: string) => void;
    onViewTargets?: (segmentId: string) => void;
}
export default function AutoSmsSection({
    smsTargets,
    pushTargets,
    segments,
    onSendSegment,
    onViewTargets,
}: AutoSmsSectionProps) {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSegment, setSelectedSegment] = useState<any>(null);
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ready":
                return "text-green-600 bg-green-50";
            case "sending":
                return "text-blue-600 bg-blue-50";
            case "completed":
                return "text-gray-600 bg-gray-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "ready":
                return "발송";
            case "sending":
                return "발송중";
            case "completed":
                return "완료";
            default:
                return "대기";
        }
    };
    return (
        <>
            <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <div className="space-y-6">
                    {/* 헤더 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <MessageSquare className="h-6 w-6 text-blue-600" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                    대기 메시지 관리
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    컨텐츠 내용을 확인하고, 각 컨텐츠별로 바로 발송 전 확인이 설정하세요.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 세그먼트 요약은 제거 - 이미지에 없음 */}

                    {/* 세그먼트 리스트 - 2열 그리드 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {segments.map((segment) => (
                            <div
                                key={segment.id}
                                className="flex items-center justify-between p-4"
                                style={{ backgroundColor: "#EEFAFF" }}
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                                            {segment.name}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        문자대상자: {Math.floor(segment.targetCount * 0.6).toLocaleString()}명 ·
                                        푸시메시지 대상자: {Math.floor(segment.targetCount * 0.4).toLocaleString()}명
                                    </div>
                                </div>

                                {/* 오른쪽: 버튼들 */}
                                <div className="flex items-center gap-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedSegment(segment);
                                            setShowPopup(true);
                                        }}
                                        className="text-sm px-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-[3px]"
                                    >
                                        발송 전 확인
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setSelectedSegment(segment);
                                            setShowPopup(true);
                                        }}
                                        disabled={segment.status === "sending"}
                                        className="text-white text-sm px-6 rounded-[3px]"
                                        style={{ backgroundColor: "#0AA5ED" }}
                                    >
                                        발송
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* 공통 발송 팝업 */}
            {selectedSegment && (
                <CommonSendPopup
                    isOpen={showPopup}
                    onClose={() => {
                        setShowPopup(false);
                        setSelectedSegment(null);
                    }}
                    title="대기 메시지 발송"
                    icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
                    description={`'${selectedSegment.name}' 세그먼트에 해당하는 고객들에게 메시지를 발송합니다.`}
                    totalTargets={selectedSegment.targetCount}
                    targetButtonText="발송 대상"
                    previewContent={getSegmentMessage(
                        selectedSegment.id,
                        selectedSegment.name,
                        selectedSegment.channels
                    )}
                    onPreview={() => {
                        console.log("미리보기:", selectedSegment.id);
                    }}
                    onSend={() => {
                        console.log("메시지 발송:", selectedSegment.id);
                        onSendSegment?.(selectedSegment.id);
                        setShowPopup(false);
                        setSelectedSegment(null);
                    }}
                    customerList={generateCustomers(selectedSegment.id, selectedSegment.targetCount)}
                />
            )}
        </>
    );
}

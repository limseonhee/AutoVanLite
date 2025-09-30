"use client";

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

export function AutoSmsSection({
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

                    {/* 세그먼트 리스트 */}
                    <div className="space-y-3">
                        {segments.map((segment) => (
                            <div
                                key={segment.id}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {segment.name}
                                        </span>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        문자대상자: {Math.floor(segment.targetCount * 0.6).toLocaleString()}명 ·
                                        푸시메시지 대상자: {Math.floor(segment.targetCount * 0.4).toLocaleString()}명
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setSelectedSegment(segment);
                                            setShowPopup(true);
                                        }}
                                        disabled={segment.status === "sending"}
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4  rounded-[3px]"
                                    >
                                        <Send className="h-4 w-4 mr-1" />
                                        발송
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedSegment(segment);
                                            setShowPopup(true);
                                        }}
                                        className="text-sm px-4 border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-[3px]"
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        확인
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

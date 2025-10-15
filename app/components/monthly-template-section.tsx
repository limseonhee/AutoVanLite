"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";
import { useManualSendModal } from "@/contexts/manual-send-modal-context";

interface Template {
    id: string;
    name: string;
    description: string;
    targetSegment: string;
    effectTag: string;
    previewText: string;
}

interface MonthlyTemplateSectionProps {
    templates: readonly Template[];
    onSendTemplate?: (templateId: string) => void;
}

export default function MonthlyTemplateSection({ templates, onSendTemplate }: MonthlyTemplateSectionProps) {
    const { openModal } = useManualSendModal();

    return (
        <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <div>
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="h-6 w-6 text-purple-600" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">이달의 추천 메시지발송문구</h3>
                    </div>

                    {/* 수동 발송 버튼 */}
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => openModal()}
                        className="rounded-[3px] bg-purple-500 hover:bg-purple-600"
                    >
                        {/* <Send className="h-4 w-4 mr-1" /> */}
                        수동 발송
                    </Button>
                </div>

                {/* 템플릿 리스트 - 전체를 하나의 배경색으로 묶음 */}
                <div className="rounded-lg" style={{ backgroundColor: "#FBF8FF" }}>
                    {templates.map((template, index) => (
                        <div
                            key={template.id}
                            className={`px-6 py-5 ${
                                index !== templates.length - 1 ? "border-b border-gray-200 dark:border-gray-300" : ""
                            }`}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-2">
                                        {template.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        "{template.previewText}"
                                    </p>
                                </div>

                                {/* 각 항목별 수동 발송 버튼 */}
                                <Button
                                    size="sm"
                                    onClick={() => openModal(template.previewText, true, true)}
                                    className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-4 rounded-[3px] whitespace-nowrap flex-shrink-0"
                                >
                                    {/* <Send className="h-3 w-3 mr-1" /> */}
                                    수동 발송
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

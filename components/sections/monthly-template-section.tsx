"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, TrendingUp, Users, Star } from "lucide-react";
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

export function MonthlyTemplateSection({ templates, onSendTemplate }: MonthlyTemplateSectionProps) {
    const { openModal } = useManualSendModal();

    const getEffectIcon = (effectTag: string) => {
        switch (effectTag) {
            case "재방문↑":
                return <TrendingUp className="h-3 w-3" />;
            case "이탈↓":
                return <Users className="h-3 w-3" />;
            case "리뷰↑":
                return <Star className="h-3 w-3" />;
            default:
                return <TrendingUp className="h-3 w-3" />;
        }
    };

    const getEffectColor = (effectTag: string) => {
        switch (effectTag) {
            case "재방문↑":
                return "bg-green-100 text-green-700 hover:bg-green-100";
            case "이탈↓":
                return "bg-red-100 text-red-700 hover:bg-red-100";
            case "리뷰↑":
                return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
            default:
                return "bg-blue-100 text-blue-700 hover:bg-blue-100";
        }
    };

    return (
        <Card className="p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <div>
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="h-6 w-6 text-purple-600" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                이달의 추천 메시지발송문구
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                새로운 템플릿으로 고객 참여도를 높여보세요
                            </p>
                        </div>
                    </div>

                    {/* 수동 발송 버튼 */}
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => openModal()}
                        className="rounded-[3px] bg-purple-500 hover:bg-purple-600"
                    >
                        <Send className="h-4 w-4 mr-1" />
                        수동 발송
                    </Button>
                </div>

                {/* 템플릿 리스트 */}
                <div className="space-y-2">
                    {templates.map((template, index) => (
                        <div
                            key={template.id}
                            className="flex items-center justify-between p-4"
                            style={{ backgroundColor: '#F5F0FF' }}
                        >
                            {/* 템플릿 정보 */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    {template.name}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {template.previewText}
                                </p>
                            </div>

                            {/* 발송 버튼 */}
                            <div className="flex-shrink-0 ml-4">
                                <Button
                                    size="sm"
                                    onClick={() => openModal(template.previewText, true)}
                                    className="text-white text-xs px-4 py-2 h-8 rounded-[3px] whitespace-nowrap"
                                    style={{ backgroundColor: '#9333EA' }}
                                >
                                    <Send className="h-3 w-3 mr-1" />
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

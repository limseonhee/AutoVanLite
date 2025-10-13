"use client";

import { useManualSendModal } from "@/contexts/manual-send-modal-context";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ManualSendSection } from "@/components/sections/manual-send-section";

export function ManualSendModal() {
    const { isOpen, initialMessage, hideTemplates, restrictToGuidance, closeModal } = useManualSendModal();

    if (!isOpen) return null;

    const handleSend = (data: any) => {
        console.log("수동 발송:", data);
        // TODO: 실제 발송 로직 구현
        closeModal();
    };

    const handleSchedule = (data: any) => {
        console.log("예약 발송:", data);
        // TODO: 실제 예약 발송 로직 구현
        closeModal();
    };

    const handleSaveTemplate = (template: any) => {
        console.log("템플릿 저장:", template);
        // TODO: 실제 템플릿 저장 로직 구현
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-auto">
                {/* 헤더 */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">수동 발송</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeModal}
                        className="rounded-full hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                {/* 내용 */}
                <div className="p-6">
                    <ManualSendSection
                        onSend={handleSend}
                        onSchedule={handleSchedule}
                        onSaveTemplate={handleSaveTemplate}
                        initialMessage={initialMessage}
                        hideTemplates={hideTemplates}
                        restrictToGuidance={restrictToGuidance}
                    />
                </div>
            </div>
        </div>
    );
}

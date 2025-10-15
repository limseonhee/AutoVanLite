"use client";

import { Container } from "@/components/layout/container";
import ManualSendSection from "@/app/components/manual-send-section";
import { SendData, ScheduleData, MessageTemplate } from "@/types/manual-send";

interface ManualSendPageProps {
    onSend?: (data: SendData) => void;
    onSchedule?: (data: ScheduleData) => void;
    onSaveTemplate?: (template: Omit<MessageTemplate, "id">) => void;
    initialMessage?: string;
    hideTemplates?: boolean;
}

export function ManualSendPage({
    onSend,
    onSchedule,
    onSaveTemplate,
    initialMessage,
    hideTemplates,
}: ManualSendPageProps) {
    // 즉시 발송 핸들러
    const handleSend = (data: SendData) => {
        console.log("즉시 발송:", data);
        // TODO: API 호출
        // 예: await sendMessageAPI(data);
        onSend?.(data);
    };

    // 예약 발송 핸들러
    const handleSchedule = (data: ScheduleData) => {
        console.log("예약 발송:", data);
        // TODO: API 호출
        // 예: await scheduleMessageAPI(data);
        onSchedule?.(data);
    };

    // 템플릿 저장 핸들러
    const handleSaveTemplate = (template: Omit<MessageTemplate, "id">) => {
        console.log("템플릿 저장:", template);
        // TODO: API 호출
        // 예: await saveTemplateAPI(template);
        onSaveTemplate?.(template);
    };

    return (
        <div className="bg-[#F9FAFC] dark:bg-gray-900">
            <div className="max-w-6xl mx-auto p-6">
                <ManualSendSection
                    onSend={handleSend}
                    onSchedule={handleSchedule}
                    onSaveTemplate={handleSaveTemplate}
                    initialMessage={initialMessage}
                    hideTemplates={hideTemplates}
                />
            </div>
        </div>
    );
}

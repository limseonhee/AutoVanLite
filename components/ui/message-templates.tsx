"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageTemplate } from "@/types/manual-send";

interface MessageTemplatesProps {
    templates: MessageTemplate[];
    onTemplateUse: (templateBody: string) => void;
}

export function MessageTemplates({ templates, onTemplateUse }: MessageTemplatesProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {templates.map((template) => (
                <Card key={template.id} className="rounded-2xl hover:shadow-md">
                    <CardContent className="px-3 py-2">
                        <h4 className="font-medium text-[14px] leading-tight mb-1">{template.title}</h4>
                        <p className="text-[13px] leading-snug text-muted-foreground line-clamp-2">{template.body}</p>
                        <div className="mt-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-8 px-2 text-xs"
                                onClick={() => onTemplateUse(template.body)}
                            >
                                이 템플릿 사용
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

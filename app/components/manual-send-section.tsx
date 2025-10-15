"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Filter, Clock, Send } from "lucide-react";
import { CategoryFilters } from "@/components/ui/category-filters";
import { MessageTemplates } from "@/components/ui/message-templates";
import { useManualSend } from "@/hooks/use-manual-send";
import { CategoryInfo, ManualSendProps } from "@/types/manual-send";
import { MESSAGE_TEMPLATES } from "@/mocks";

const CATEGORIES: CategoryInfo[] = [
    { id: "guidance", name: "안내문", description: "일반 안내 메시지" },
    { id: "happyCall", name: "해피콜", description: "서비스 만족도 조사" },
    { id: "preventive", name: "예방점검", description: "정기점검 및 예방정비" },
    { id: "inspectionInsurance", name: "검사/보험 만기", description: "검사 및 보험 만료 안내" },
    { id: "birthday", name: "생일", description: "고객 생일 축하" },
];

export default function ManualSendSection({
    onSend,
    onSchedule,
    onSaveTemplate,
    initialMessage,
    hideTemplates,
    restrictToGuidance,
}: ManualSendProps) {
    const {
        selectedCategory,
        filters,
        message,
        sendMode,
        scheduleAt,
        minScheduleInput,
        isScheduleInvalid,
        filterChips,
        totalTargetCount,
        canSend,
        setSelectedCategory,
        setMessage,
        setSendMode,
        setScheduleAt,
        handleApplyFilters,
        handleBasicFilterChange,
        handleCategoryFilterChange,
        handleSend,
        handleSaveTemplate,
        handleDeleteMessage,
        handleTemplateUse,
    } = useManualSend(initialMessage);

    const handleSendClick = () => {
        const result = handleSend();
        if (result) {
            if (result.type === "send") {
                onSend?.(result.data);
            } else {
                onSchedule?.(result.data);
            }
        }
    };

    const handleSaveTemplateClick = () => {
        const template = handleSaveTemplate();
        if (template) {
            onSaveTemplate?.(template);
        }
    };

    return (
        <div className="space-y-6">
            {/* 안내 */}
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-orange-900">수동 발송 모드 안내</h3>
                <p className="text-sm text-orange-700 mt-1">
                    즉시 발송하거나 예약 발송할 수 있습니다. <br />
                    차계부가 설치된 고객은 푸시메시지로, 미설치 고객은 문자로 전송됩니다.
                </p>
            </div>

            {/* 대상 선택 */}
            <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">발송 대상 선택</CardTitle>
                    </div>

                    {filterChips.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {filterChips.map((chip) => (
                                <Badge key={chip} variant="outline">
                                    {chip}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardHeader>

                <CardContent className="pt-0 space-y-4">
                    {/* 카테고리 칩 탭 */}
                    <div className="flex flex-wrap gap-2">
                        {(restrictToGuidance ? CATEGORIES.filter(c => c.id === "guidance") : CATEGORIES).map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                size="sm"
                                className="h-8"
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>

                    {/* 선택된 카테고리 설명 */}
                    <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                        <strong>{CATEGORIES.find((c) => c.id === selectedCategory)?.name}</strong>:{" "}
                        {CATEGORIES.find((c) => c.id === selectedCategory)?.description}
                    </div>

                    {/* 필터 폼 */}
                    <div className="rounded-2xl border p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* 안내문, 해피콜, 예방점검, 생일, 검사/보험 만기 카테고리가 아닌 경우에만 기본 필터들 표시 */}
                            {selectedCategory !== "guidance" &&
                                selectedCategory !== "happyCall" &&
                                selectedCategory !== "preventive" &&
                                selectedCategory !== "birthday" &&
                                selectedCategory !== "inspectionInsurance" && (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">
                                                차량 연식
                                            </label>
                                            <Select
                                                value={filters.vehicleYear}
                                                onValueChange={(v) => handleBasicFilterChange("vehicleYear", v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="전체" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">전체</SelectItem>
                                                    <SelectItem value="2025+">2025~</SelectItem>
                                                    <SelectItem value="2020-2024">2020–2024</SelectItem>
                                                    <SelectItem value="2015-2019">2015–2019</SelectItem>
                                                    <SelectItem value="2010-2014">2010–2014</SelectItem>
                                                    <SelectItem value="-2009">~2009</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">차종</label>
                                            <Select
                                                value={filters.vehicleType}
                                                onValueChange={(v) => handleBasicFilterChange("vehicleType", v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="전체" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">전체</SelectItem>
                                                    <SelectItem value="sedan">세단</SelectItem>
                                                    <SelectItem value="suv">SUV</SelectItem>
                                                    <SelectItem value="hatchback">해치백</SelectItem>
                                                    <SelectItem value="ev-hybrid">전기/하이브리드</SelectItem>
                                                    <SelectItem value="commercial">상용(트럭/밴/버스)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">
                                                주행거리
                                            </label>
                                            <Select
                                                value={filters.mileage}
                                                onValueChange={(v) => handleBasicFilterChange("mileage", v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="전체" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">전체</SelectItem>
                                                    <SelectItem value="~30000">~30,000km</SelectItem>
                                                    <SelectItem value="30001-60000">30,001–60,000km</SelectItem>
                                                    <SelectItem value="60001-100000">60,001–100,000km</SelectItem>
                                                    <SelectItem value="100000+">100,000km~</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">
                                                방문이력
                                            </label>
                                            <Select
                                                value={filters.visitHistory}
                                                onValueChange={(v) => handleBasicFilterChange("visitHistory", v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="전체" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">전체</SelectItem>
                                                    <SelectItem value="RECENT_3M">최근 3개월 내 방문</SelectItem>
                                                    <SelectItem value="NO_VISIT_6M">6개월 내 방문 없음</SelectItem>
                                                    <SelectItem value="NO_VISIT_12M">1년 이상 미방문</SelectItem>
                                                    <SelectItem value="FOLLOWUP_7_30D">
                                                        최근 7~30일 후속 안내
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">
                                                정비 이력
                                            </label>
                                            <Select
                                                value={filters.serviceHistory}
                                                onValueChange={(v) => handleBasicFilterChange("serviceHistory", v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="전체" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">전체</SelectItem>
                                                    <SelectItem value="OIL_6M">오일/필터 교체(6개월)</SelectItem>
                                                    <SelectItem value="BRAKE_12M">브레이크 작업(12개월)</SelectItem>
                                                    <SelectItem value="TIRE_12M">타이어 작업(12개월)</SelectItem>
                                                    <SelectItem value="NO_WIPER_12M">
                                                        와이퍼 교체 이력 없음(12개월)
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs font-medium text-muted-foreground">
                                                고객 등급
                                            </label>
                                            <Select
                                                value={filters.customerGrade}
                                                onValueChange={(v) => handleBasicFilterChange("customerGrade", v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="전체" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">전체</SelectItem>
                                                    <SelectItem value="VIP">VIP</SelectItem>
                                                    <SelectItem value="Gold">Gold</SelectItem>
                                                    <SelectItem value="Silver">Silver</SelectItem>
                                                    <SelectItem value="Bronze">Bronze</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                )}

                            {/* 카테고리별 전용 필터들 */}
                            <CategoryFilters
                                selectedCategory={selectedCategory}
                                filters={filters}
                                onFilterChange={handleCategoryFilterChange}
                            />
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-2">
                            <Button onClick={handleApplyFilters}>
                                <Filter className="mr-1 h-4 w-4" />
                                필터 적용
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 템플릿 - hideTemplates가 true이면 숨김 */}
            {!hideTemplates && (
                <Card className="rounded-2xl">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">메시지 템플릿</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <MessageTemplates templates={MESSAGE_TEMPLATES} onTemplateUse={handleTemplateUse} />
                    </CardContent>
                </Card>
            )}

            {/* 메시지 & 발송/예약발송 */}
            <Card className="rounded-2xl">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg">메시지 내용</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="발송할 메시지 내용을 입력하세요…"
                        className="min-h-[9rem]"
                    />

                    {/* 발송문구 저장/삭제 버튼 */}
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleSaveTemplateClick}
                            disabled={!message.trim()}
                        >
                            발송문구 저장
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleDeleteMessage}
                            disabled={!message.trim()}
                        >
                            삭제
                        </Button>
                    </div>

                    {/* 예약발송 컨트롤 */}
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-sm">
                        <div className="text-muted-foreground">
                            현재 대상자:{" "}
                            <span className="font-medium text-foreground">{totalTargetCount.toLocaleString()}명</span>
                            {selectedCategory && (
                                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">발송 방식</span>
                                <Select value={sendMode} onValueChange={(v) => setSendMode(v as "now" | "schedule")}>
                                    <SelectTrigger className="w-36 h-9">
                                        <SelectValue placeholder="선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="now">즉시 발송</SelectItem>
                                        <SelectItem value="schedule">예약 발송</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {sendMode === "schedule" && (
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="datetime-local"
                                        value={scheduleAt}
                                        onChange={(e) => setScheduleAt(e.target.value)}
                                        min={minScheduleInput}
                                        className="h-9 w-56"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {sendMode === "schedule" && (
                        <div className="flex items-center justify-between">
                            {!isScheduleInvalid && scheduleAt && (
                                <p className="text-xs text-muted-foreground">
                                    예약 시각: {scheduleAt.replace("T", " ").slice(0, 16)}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-2">
                        {sendMode === "schedule" ? (
                            <Button onClick={handleSendClick} disabled={!canSend} className="min-w-32">
                                <Clock className="mr-1 h-4 w-4" />
                                예약 발송
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => {
                                        // SMS 발송 로직
                                        const result = handleSend();
                                        if (result && result.type === "send") {
                                            onSend?.({ ...result.data, channel: "SMS" });
                                        }
                                    }}
                                    disabled={!canSend}
                                    className="min-w-24 bg-blue-500 hover:bg-blue-600"
                                >
                                    <Send className="mr-1 h-4 w-4" />
                                    SMS 발송
                                </Button>
                                <Button
                                    onClick={() => {
                                        // PUSH 발송 로직
                                        const result = handleSend();
                                        if (result && result.type === "send") {
                                            onSend?.({ ...result.data, channel: "PUSH" });
                                        }
                                    }}
                                    disabled={!canSend}
                                    className="min-w-24 bg-purple-500 hover:bg-purple-600"
                                >
                                    <Send className="mr-1 h-4 w-4" />
                                    PUSH 발송
                                </Button>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

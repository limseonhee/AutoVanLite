"use client";

import { Container } from "@/components/layout/container";

import { SmsPushTrendSection } from "@/components/sections/sms-push-trend-section";
import { useNavigation } from "@/hooks/use-navigation";
import { DASHBOARD_DATA } from "@/mocks";
import Image from "next/image";
import { useEffect, useState } from "react";

import Hero from "./components/hero";
import PreView from "./components/preView";
import SimpleInstallationGauge from "./components/simple-installation-gauge";
import BulkReportSendSection from "./components/bulk-report-send-section";
import MonthlySavingsSection from "./components/monthly-savings-section";
import DailyChartSection from "./components/daily-chart-section";
import MonthlyTemplateSection from "./components/monthly-template-section";
import AutoSmsSection from "./components/auto-sms-section";

const HEADER_IMAGE_STATE_KEY = "header-main-image-state";

export default function Home() {
    const { navigateToCharge } = useNavigation();
    const [showMainImage, setShowMainImage] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    const handleSendSegment = (segmentId: string) => {
        console.log("발송 세그먼트:", segmentId);
        // TODO: 세그먼트별 메시지 발송 로직 구현
    };

    const handleViewTargets = (segmentId: string) => {
        console.log("대상자 확인:", segmentId);
        // TODO: 대상자 리스트 모달 표시 로직 구현
    };

    const handleViewAllReports = () => {
        console.log("발송 전 확인");
        // TODO: 발송 전 확인 로직 구현
    };

    const handleBulkSend = () => {
        console.log("일괄발송");
        // TODO: 일괄발송 로직 구현
    };

    const handleSendTemplate = (templateId: string) => {
        console.log("템플릿 발송:", templateId);
        // TODO: 템플릿 발송 로직 구현
    };

    // 클라이언트에서만 localStorage 상태 복원
    useEffect(() => {
        try {
            const savedState = localStorage.getItem(HEADER_IMAGE_STATE_KEY);
            if (savedState) {
                setShowMainImage(JSON.parse(savedState));
            }
        } catch (error) {
            console.warn("Failed to restore header image state:", error);
        }
        setIsHydrated(true);
    }, []);

    // 이미지 상태가 변경될 때 localStorage에 저장 (hydration 후에만)
    useEffect(() => {
        if (!isHydrated) return;
        try {
            localStorage.setItem(HEADER_IMAGE_STATE_KEY, JSON.stringify(showMainImage));
        } catch (error) {
            console.warn("Failed to save header image state:", error);
        }
    }, [showMainImage, isHydrated]);

    return (
        <div className="min-h-screen bg-[#F9FAFC] dark:bg-gray-900">
            {/* 차계부 둘러보기 버튼 영역 - 적당히 연한 내부 그림자 효과 */}
            <PreView showMainImage={showMainImage} setShowMainImage={setShowMainImage} />

            {/* 히어로 섹션 */}
            <Hero />

            <Container className="py-8">
                {/* 첫 번째 행: 차계부 설치현황 (풀 너비) */}
                <div className="mb-6">
                    <SimpleInstallationGauge
                        currentInstalls={DASHBOARD_DATA.installationGoal.currentInstalls}
                        targetInstalls={DASHBOARD_DATA.installationGoal.targetInstalls}
                    />
                </div>

                {/* 두 번째 행: 이달의 절감액 + 점검정비명세서 일괄발송 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* 이달의 절감액 섹션 */}
                    <MonthlySavingsSection
                        savingsAmount={DASHBOARD_DATA.monthlySavings.savingsAmount}
                        originalCost={DASHBOARD_DATA.monthlySavings.originalCost}
                        savingsPercentage={DASHBOARD_DATA.monthlySavings.savingsPercentage}
                        onAddSavings={navigateToCharge}
                    />

                    {/* 점검정비명세서 일괄발송 */}
                    <BulkReportSendSection
                        todayInboundCount={DASHBOARD_DATA.bulkReportSend.todayInboundCount}
                        todaySentCount={DASHBOARD_DATA.bulkReportSend.todaySentCount}
                        onViewAll={handleViewAllReports}
                        onBulkSend={handleBulkSend}
                    />
                </div>

                {/* 세 번째 행: 대기 메시지 관리 (풀 너비) */}
                <div className="mb-6">
                    <AutoSmsSection
                        smsTargets={DASHBOARD_DATA.autoSms.smsTargets}
                        pushTargets={DASHBOARD_DATA.autoSms.pushTargets}
                        segments={DASHBOARD_DATA.autoSms.segments}
                        onSendSegment={handleSendSegment}
                        onViewTargets={handleViewTargets}
                    />
                </div>

                {/* 네 번째 행: 이달의 추천 메시지발송문구 (풀 너비) */}
                <div className="mb-6">
                    <MonthlyTemplateSection
                        templates={DASHBOARD_DATA.monthlyTemplates}
                        onSendTemplate={handleSendTemplate}
                    />
                </div>

                {/* 다섯 번째 행: SMS vs 푸시메시지 사용률 추이 */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <SmsPushTrendSection trendData={DASHBOARD_DATA.smsPushTrend} />
                </div>

                {/* 여섯 번째 행: 일별 차트 */}
                <div className="grid grid-cols-1 gap-6">
                    <DailyChartSection year={2025} month={9} totalSmsCount={850} totalPushCount={559} />
                </div>
            </Container>
        </div>
    );
}

"use client";

import { Container } from "@/components/layout/container";

import { useNavigation } from "@/hooks/use-navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { DASHBOARD_DATA } from "@/mocks";
import Image from "next/image";
import { useEffect, useState } from "react";

import HeroSection from "./components/hero-section";
import PreviewSection from "./components/preview-section";
import SimpleInstallationGauge from "./components/simple-installation-gauge";
import BulkReportSendSection from "./components/bulk-report-send-section";
import MonthlySavingsSection from "./components/monthly-savings-section";
import DailyChartSection from "./components/daily-chart-section";
import MonthlyTemplateSection from "./components/monthly-template-section";
import AutoSmsSection from "./components/auto-sms-section";
import SmsPushTrendSection from "./components/sms-push-trend-section";

const HEADER_IMAGE_STATE_KEY = "header-main-image-state";

export default function Home() {
    const { navigateToCharge } = useNavigation();
    const [showMainImage, setShowMainImage] = useLocalStorage(HEADER_IMAGE_STATE_KEY, false);

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

    return (
        <div className="min-h-screen bg-[#F9FAFC] dark:bg-gray-900">
            {/* 차계부 둘러보기 버튼 영역 - 적당히 연한 내부 그림자 효과 */}
            <PreviewSection showMainImage={showMainImage} setShowMainImage={setShowMainImage} />

            {/* 히어로 섹션 */}
            <HeroSection />

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

                {/* 다섯 번째 행: SMS vs 푸시메시지 사용율 추이 + 일별 메시지 발송 현황 (4:6 비율) */}
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
                    <div className="lg:col-span-4">
                        <SmsPushTrendSection trendData={DASHBOARD_DATA.smsPushTrend} />
                    </div>
                    <div className="lg:col-span-6">
                        <DailyChartSection year={2025} month={9} totalSmsCount={850} totalPushCount={559} />
                    </div>
                </div>
            </Container>
        </div>
    );
}

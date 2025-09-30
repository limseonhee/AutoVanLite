"use client";

import { Container } from "@/components/layout/container";
import { HeroSection } from "@/components/sections/hero-section";
import { MonthlySavingsSection } from "@/components/sections/monthly-savings-section";
import { SimpleInstallationGauge } from "@/components/sections/simple-installation-gauge";
import { AutoSmsSection } from "@/components/sections/auto-sms-section";
import { BulkReportSendSection } from "@/components/sections/bulk-report-send-section";
import { MonthlyTemplateSection } from "@/components/sections/monthly-template-section";
import { SmsPushTrendSection } from "@/components/sections/sms-push-trend-section";
import { DailyChartSection } from "@/components/sections/daily-chart-section";
import { useNavigation } from "@/hooks/use-navigation";
import { DASHBOARD_DATA } from "@/mocks";

export default function Home() {
    const { navigateToCharge } = useNavigation();

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
            {/* 히어로 섹션 */}
            <HeroSection />

            <Container className="py-8">
                {/* 첫 번째 행: 이달의 절감액 + 설치목표 게이지 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* 이달의 절감액 섹션 */}
                    <MonthlySavingsSection
                        savingsAmount={DASHBOARD_DATA.monthlySavings.savingsAmount}
                        originalCost={DASHBOARD_DATA.monthlySavings.originalCost}
                        savingsPercentage={DASHBOARD_DATA.monthlySavings.savingsPercentage}
                        onAddSavings={navigateToCharge}
                    />

                    {/* 간단한 설치목표 게이지 */}
                    <SimpleInstallationGauge
                        currentInstalls={DASHBOARD_DATA.installationGoal.currentInstalls}
                        targetInstalls={DASHBOARD_DATA.installationGoal.targetInstalls}
                    />
                </div>

                {/* 두 번째 행: 대기 메시지 관리 + 우측 컬럼 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* 대기 메시지 관리 (좌측 50%) */}
                    <AutoSmsSection
                        smsTargets={DASHBOARD_DATA.autoSms.smsTargets}
                        pushTargets={DASHBOARD_DATA.autoSms.pushTargets}
                        segments={DASHBOARD_DATA.autoSms.segments}
                        onSendSegment={handleSendSegment}
                        onViewTargets={handleViewTargets}
                    />

                    {/* 우측 컬럼 (점검정비명세서 + 템플릿, 50%) */}
                    <div className="space-y-6">
                        <BulkReportSendSection
                            todayInboundCount={DASHBOARD_DATA.bulkReportSend.todayInboundCount}
                            todaySentCount={DASHBOARD_DATA.bulkReportSend.todaySentCount}
                            onViewAll={handleViewAllReports}
                            onBulkSend={handleBulkSend}
                        />
                        <MonthlyTemplateSection
                            templates={DASHBOARD_DATA.monthlyTemplates}
                            onSendTemplate={handleSendTemplate}
                        />
                    </div>
                </div>

                {/* 세 번째 행: SMS vs 푸시메시지 사용률 추이 */}
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <SmsPushTrendSection trendData={DASHBOARD_DATA.smsPushTrend} />
                </div>

                {/* 네 번째 행: 일별 차트 */}
                <div className="grid grid-cols-1 gap-6">
                    <DailyChartSection year={2025} month={9} totalSmsCount={850} totalPushCount={559} />
                </div>
            </Container>
        </div>
    );
}

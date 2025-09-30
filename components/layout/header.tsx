"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigation } from "@/hooks/use-navigation";
import { useDropdown } from "@/hooks/use-dropdown";
import { HeaderDropdown } from "@/components/layout/header-dropdown";
import { ManualSendPage } from "@/components/pages/manual-send-page";
import { useManualSendModal } from "@/contexts/manual-send-modal-context";
import { useState, useEffect } from "react";

const HEADER_IMAGE_STATE_KEY = "header-main-image-state";

export function Header() {
    const { navigateToCharge, navigateToMessage, navigateToProgramming, navigateToHome } = useNavigation();
    const { isDropdownOpen, toggleDropdown, closeDropdown } = useDropdown();
    const { isOpen: showManualSendModal, openModal, closeModal, initialMessage, hideTemplates } = useManualSendModal();
    const [showMainImage, setShowMainImage] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

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
        <div className="sticky top-0 z-40">
            {/* 헤더 - 여기까지가 실제 헤더 영역 */}
            <header className="bg-[#F9FAFC] dark:bg-gray-900">
                <div className="h-14 flex items-center justify-between px-6">
                    {/* 로고 영역 */}
                    <Link href="/" onClick={navigateToHome} className="flex items-center space-x-2">
                        <div className="relative h-8 w-8">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="36" height="36" rx="4" fill="url(#paint0_linear_3_12)" />
                                <path
                                    d="M15.234 27.6564L8.966 16.8C8.5811 16.1333 9.06223 15.3 9.83203 15.3H16.1C16.6523 15.3 17.1 15.7477 17.1 16.3V27.1564C17.1 28.1795 15.7455 28.5424 15.234 27.6564Z"
                                    fill="white"
                                />
                                <path
                                    d="M18.9 26.919V7.91802C18.9 7.17464 19.6823 6.69114 20.3472 7.02359L27.0564 10.3782C27.5301 10.615 27.737 11.1801 27.5283 11.6668L20.819 27.3131C20.3905 28.3124 18.9 28.0063 18.9 26.919Z"
                                    fill="white"
                                />
                                <defs>
                                    <linearGradient
                                        id="paint0_linear_3_12"
                                        x1="0"
                                        y1="0"
                                        x2="36"
                                        y2="36"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#00E3D7" />
                                        <stop offset="1" stopColor="#0072B9" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="font-semibold">아우토반(AutoVan)</span>
                    </Link>

                    {/* 우측 영역: 네비게이션 메뉴 + 설정 + 다크모드 */}
                    <div className="flex items-center gap-6">
                        {/* 네비게이션 메뉴 */}
                        <nav className="hidden md:flex gap-8 text-sm text-gray-600 dark:text-gray-300">
                            <button
                                onClick={navigateToCharge}
                                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                차계부 관리
                            </button>
                            <button
                                onClick={navigateToMessage}
                                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                메시지 관리
                            </button>
                            <button
                                onClick={navigateToProgramming}
                                className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                프리미엄 AI 고객관리
                            </button>
                        </nav>

                        {/* 우측 버튼 영역 */}
                        <div className="flex items-center gap-3">
                            {/* 설정 버튼 */}
                            <button
                                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                title="설정"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-gray-600 dark:text-gray-300"
                                >
                                    <path
                                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* 다크모드 토글 */}
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* 차계부 둘러보기 버튼 영역 - 적당히 연한 내부 그림자 효과 */}
            <div
                className="w-full bg-[#F9FAFC] dark:bg-gray-900"
                style={{ boxShadow: "inset 0 3px 6px -1px rgba(0, 0, 0, 0.07)" }}
            >
                {!showMainImage ? (
                    /* open.png 버튼 */
                    <div className="flex justify-center">
                        <button onClick={() => setShowMainImage(true)} className="hover:opacity-80 transition-opacity">
                            <Image
                                src="/images/open.png"
                                alt="차계부 둘러보기"
                                width={120}
                                height={40}
                                priority={true}
                                style={{ width: "auto", height: "auto" }}
                            />
                        </button>
                    </div>
                ) : (
                    /* main.png 이미지 + close.png 버튼 오버레이 - 가로 풀 사용 */
                    <div className="w-full">
                        <div className="w-full animate-in slide-in-from-top-5 duration-300 relative">
                            <Image
                                src="/images/main.png"
                                alt="차계부 상세 안내"
                                width={1920}
                                height={600}
                                className="w-full h-auto"
                                priority
                            />
                            {/* close.png 버튼을 main.png 위에 오버레이로 하단 배치 */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                                <button
                                    onClick={() => setShowMainImage(false)}
                                    className="hover:opacity-80 transition-opacity"
                                >
                                    <Image
                                        src="/images/close.png"
                                        alt="차계부 닫기"
                                        width={120}
                                        height={40}
                                        priority={true}
                                        style={{ width: "auto", height: "auto" }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <HeaderDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />

            {/* 수동 발송 모달 */}
            {showManualSendModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">수동 발송</h2>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => closeModal()}
                                className="rounded-[3px] bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-700"
                            >
                                닫기
                            </Button>
                        </div>
                        <div className="p-0">
                            <ManualSendPage
                                initialMessage={initialMessage}
                                hideTemplates={hideTemplates}
                                onSend={(data) => {
                                    console.log("발송 완료:", data);
                                    // TODO: 발송 완료 후 모달 닫기 또는 결과 표시
                                    closeModal();
                                }}
                                onSchedule={(data) => {
                                    console.log("예약 완료:", data);
                                    // TODO: 예약 완료 후 모달 닫기 또는 결과 표시
                                    closeModal();
                                }}
                                onSaveTemplate={(template) => {
                                    console.log("템플릿 저장:", template);
                                    // TODO: 템플릿 저장 완료 알림
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

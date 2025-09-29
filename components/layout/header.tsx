"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useNavigation } from "@/hooks/use-navigation";
import { useDropdown } from "@/hooks/use-dropdown";
import { HeaderDropdown } from "@/components/layout/header-dropdown";
import { useState } from "react";

export function Header() {
    const { navigateToCharge, navigateToMessage, navigateToProgramming, navigateToHome } = useNavigation();
    const { isDropdownOpen, toggleDropdown, closeDropdown } = useDropdown();
    const [showMainImage, setShowMainImage] = useState(false);

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
                            푸시 메시지 관리
                        </button>
                        <button
                            onClick={navigateToProgramming}
                            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        >
                            프리미엄 AI 고객관리
                        </button>
                    </nav>

                    {/* 우측 버튼 영역 */}
                    <ThemeToggle />
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
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <HeaderDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
        </div>
    );
}

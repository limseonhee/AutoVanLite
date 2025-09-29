"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNavigation() {
    const router = useRouter();

    const navigateToCharge = useCallback(() => {
        router.push("/charge");
    }, [router]);

    const navigateToMessage = useCallback(() => {
        router.push("/message");
    }, [router]);

    const navigateToProgramming = useCallback(() => {
        router.push("/programming");
    }, [router]);

    const navigateToHome = useCallback(() => {
        router.push("/");
    }, [router]);

    const handleGetStarted = useCallback(() => {
        // 시작하기 버튼 클릭 시 차계부 관리 페이지로 이동
        router.push("/charge");
    }, [router]);

    return {
        navigateToCharge,
        navigateToMessage,
        navigateToProgramming,
        navigateToHome,
        handleGetStarted,
    };
}

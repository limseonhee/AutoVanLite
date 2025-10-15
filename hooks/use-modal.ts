import { useState, useCallback } from "react";

/**
 * 모달 상태와 관련 데이터를 관리하는 hook
 *
 * @template T - 모달에 전달할 데이터 타입
 * @returns { isOpen, data, openModal, closeModal }
 */
export function useModal<T = any>() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<T | null>(null);

    const openModal = useCallback((modalData?: T) => {
        setData(modalData ?? null);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        // 애니메이션이 끝난 후 데이터 정리 (300ms는 일반적인 모달 애니메이션 시간)
        setTimeout(() => setData(null), 300);
    }, []);

    return {
        isOpen,
        data,
        openModal,
        closeModal,
    } as const;
}

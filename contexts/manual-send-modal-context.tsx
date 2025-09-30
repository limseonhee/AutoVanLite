"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ManualSendModalContextType {
    isOpen: boolean;
    initialMessage: string | undefined;
    hideTemplates: boolean;
    openModal: (message?: string, hideTemplates?: boolean) => void;
    closeModal: () => void;
}

const ManualSendModalContext = createContext<ManualSendModalContextType | undefined>(undefined);

export function ManualSendModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [initialMessage, setInitialMessage] = useState<string | undefined>(undefined);
    const [hideTemplates, setHideTemplates] = useState(false);

    const openModal = (message?: string, shouldHideTemplates: boolean = false) => {
        setInitialMessage(message);
        setHideTemplates(shouldHideTemplates);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        // 모달이 완전히 닫힌 후 상태 초기화
        setTimeout(() => {
            setInitialMessage(undefined);
            setHideTemplates(false);
        }, 300);
    };

    return (
        <ManualSendModalContext.Provider value={{ isOpen, initialMessage, hideTemplates, openModal, closeModal }}>
            {children}
        </ManualSendModalContext.Provider>
    );
}

export function useManualSendModal() {
    const context = useContext(ManualSendModalContext);
    if (context === undefined) {
        throw new Error("useManualSendModal must be used within a ManualSendModalProvider");
    }
    return context;
}

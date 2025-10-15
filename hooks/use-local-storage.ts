import { useState, useEffect } from "react";

/**
 * localStorage와 동기화되는 상태를 관리하는 hook
 * SSR 환경에서 hydration 이슈를 해결하기 위해 isHydrated 상태를 포함
 *
 * @param key - localStorage 키
 * @param initialValue - 초기값
 * @returns [storedValue, setStoredValue, isHydrated]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    // 클라이언트에서만 localStorage 상태 복원
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.warn(`Error loading ${key} from localStorage:`, error);
        }
        setIsHydrated(true);
    }, [key]);

    // 이미지 상태가 변경될 때 localStorage에 저장 (hydration 후에만)
    useEffect(() => {
        if (!isHydrated) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.warn(`Error saving ${key} to localStorage:`, error);
        }
    }, [key, storedValue, isHydrated]);

    return [storedValue, setStoredValue, isHydrated] as const;
}

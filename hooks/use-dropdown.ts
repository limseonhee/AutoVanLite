"use client";

import { useState, useCallback } from "react";

export function useDropdown() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen((prev) => !prev);
    }, []);

    const openDropdown = useCallback(() => {
        setIsDropdownOpen(true);
    }, []);

    const closeDropdown = useCallback(() => {
        setIsDropdownOpen(false);
    }, []);

    return {
        isDropdownOpen,
        toggleDropdown,
        openDropdown,
        closeDropdown,
    };
}

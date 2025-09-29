"use client";

import { HeaderDropdown } from "@/components/layout/header-dropdown";
import { useDropdown } from "@/hooks/use-dropdown";

export function SubHeader() {
    const { isDropdownOpen, toggleDropdown, closeDropdown } = useDropdown();

    return (
        <div
            className="relative bg-[#F9FAFC] dark:bg-gray-900"
            style={{ boxShadow: "inset 0 3px 6px -1px rgba(0, 0, 0, 0.07)" }}
        >
            {/* 드롭다운 영역 */}
            <HeaderDropdown isOpen={isDropdownOpen} onClose={closeDropdown} />
        </div>
    );
}

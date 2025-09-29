"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface HeaderDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HeaderDropdown({ isOpen, onClose }: HeaderDropdownProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* 배경 오버레이 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 z-40"
                    />

                    {/* 드롭다운 콘텐츠 */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 bg-white shadow-lg z-50"
                    >
                        <Container className="py-0">
                            <div className="w-full">
                                <Image
                                    src="/images/main.png"
                                    alt="차계부 둘러보기 상세"
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto"
                                    priority
                                />
                            </div>
                        </Container>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

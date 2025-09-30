"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Users, FileText, Send } from "lucide-react";
import { CommonSendPopupProps } from "@/types/common-send-popup";

export function CommonSendPopup({
    isOpen,
    onClose,
    title,
    icon,
    description,
    totalTargets,
    expectedAmount,
    targetButtonText = "대상자 보기",
    onTargetView,
    onPreview,
    onSend,
    isLoading = false,
    previewContent,
    customerList = [],
}: CommonSendPopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-xl max-h-[650px] flex flex-col">
                {/* 헤더 */}
                <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {icon}
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        className="rounded-[3px] bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-700"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* 컨텐츠 */}
                <div className="flex-1 overflow-hidden p-4 pb-0">
                    <div className="space-y-3 h-full flex flex-col">
                        {/* 발송 문구 영역 */}
                        {previewContent && (
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                                <div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {previewContent.message}
                                </div>
                            </div>
                        )}

                        {/* 대상자 목록 */}
                        <div className="flex flex-col pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    대상자
                                </h3>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    총 {customerList.length}명 (최대 20명까지 표시)
                                </span>
                            </div>

                            {/* 테이블 - 스크롤 영역 */}
                            <div className="border border-gray-200 dark:border-gray-700 overflow-hidden">
                                <div className="max-h-[220px] overflow-y-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                                            <tr>
                                                <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                                                    이름
                                                </th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                                                    차량
                                                </th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                                                    차량번호
                                                </th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                                                    연락처
                                                </th>
                                                <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">
                                                    최근방문
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {customerList.slice(0, 20).map((customer) => (
                                                <tr
                                                    key={customer.id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                                >
                                                    <td className="px-3 py-2 text-gray-900 dark:text-white">
                                                        {customer.name}
                                                    </td>
                                                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                                                        {customer.vehicle}
                                                    </td>
                                                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                                                        {customer.plateNo}
                                                    </td>
                                                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                                                        {customer.phone}
                                                    </td>
                                                    <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                                                        {customer.lastVisit}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* 더 있음 표시 - 스크롤해서 보이도록 */}
                                    {customerList.length > 20 && (
                                        <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-3 px-4 text-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                + {customerList.length - 20}명 더 있음
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {customerList.length === 0 && (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    발송 대상자가 없습니다.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 푸터 */}
                <div className="bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-2">
                    <Button variant="outline" onClick={onClose} className="rounded-[3px]">
                        취소
                    </Button>
                    <Button
                        onClick={onSend}
                        disabled={isLoading || totalTargets === 0}
                        className="rounded-[3px] bg-blue-600 hover:bg-blue-700"
                    >
                        <Send className="h-4 w-4 mr-1" />
                        {isLoading ? "발송 중..." : "발송"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

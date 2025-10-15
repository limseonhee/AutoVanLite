import Image from "next/image";

interface PreViewProps {
    showMainImage: boolean;
    setShowMainImage: (showMainImage: boolean) => void;
}

export default function PreView({ showMainImage, setShowMainImage }: PreViewProps) {
    return (
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
                    <div
                        className="w-full animate-in slide-in-from-top-5 duration-300 relative"
                        style={{ boxShadow: "inset 0 3px 6px -1px rgba(0, 0, 0, 0.07)" }}
                    >
                        <Image
                            src="/images/main.png"
                            alt="차계부 상세 안내"
                            width={1920}
                            height={600}
                            className="w-full h-auto"
                            priority
                        />
                        {/* close.png 버튼을 main.png 위에 오버레이로 하단 배치 */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[32px]">
                            <button
                                onClick={() => setShowMainImage(false)}
                                className="hover:opacity-80 transition-opacity"
                            >
                                <Image
                                    src="/images/close.png"
                                    alt="차계부 닫기"
                                    width={120}
                                    height={32}
                                    priority={true}
                                    style={{ width: "auto", height: "auto" }}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

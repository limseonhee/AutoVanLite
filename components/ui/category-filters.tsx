"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryType, Filters } from "@/types/manual-send";

interface CategoryFiltersProps {
    selectedCategory: CategoryType;
    filters: Filters;
    onFilterChange: (field: string, value: string | string[]) => void;
}

export function CategoryFilters({ selectedCategory, filters, onFilterChange }: CategoryFiltersProps) {
    const renderCategoryFilters = () => {
        switch (selectedCategory) {
            case "guidance":
                return (
                    <>
                        {/* 날짜 유형 라디오 박스 */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">날짜 유형</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="dateType"
                                        value="admission"
                                        checked={filters.guidance.dateType === "admission"}
                                        onChange={(e) => onFilterChange("dateType", e.target.value)}
                                        className="text-blue-600"
                                    />
                                    <span className="text-sm">입고일자</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="dateType"
                                        value="lastVisit"
                                        checked={filters.guidance.dateType === "lastVisit"}
                                        onChange={(e) => onFilterChange("dateType", e.target.value)}
                                        className="text-blue-600"
                                    />
                                    <span className="text-sm">최종방문일자</span>
                                </label>
                            </div>
                        </div>

                        {/* 날짜 선택 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">
                                {filters.guidance.dateType === "admission" ? "입고일자" : "최종방문일자"}
                            </label>
                            <Input
                                type="date"
                                value={filters.guidance.dateValue}
                                onChange={(e) => onFilterChange("dateValue", e.target.value)}
                                placeholder="날짜 선택"
                            />
                        </div>

                        {/* 방문수 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">방문수 (이상)</label>
                            <Input
                                type="number"
                                value={filters.guidance.visitCountMin}
                                onChange={(e) => onFilterChange("visitCountMin", e.target.value)}
                                placeholder="예: 5회 이상"
                                min="0"
                            />
                        </div>

                        {/* 차량명 (인라인) */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">차량명</label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={filters.guidance.vehicleName}
                                    onChange={(e) => onFilterChange("vehicleName", e.target.value)}
                                    placeholder="예: 아반떼, 소나타"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="px-2"
                                    onClick={() => {
                                        // TODO: 차량명 선택 모달 또는 드롭다운 구현
                                        console.log("차량명 선택 버튼 클릭");
                                    }}
                                >
                                    !
                                </Button>
                            </div>
                        </div>

                        {/* 등록 시작일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">등록 시작일</label>
                            <Input
                                type="date"
                                value={filters.guidance.registrationStartDate}
                                onChange={(e) => onFilterChange("registrationStartDate", e.target.value)}
                                placeholder="등록 시작일"
                            />
                        </div>

                        {/* 등록 종료일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">등록 종료일</label>
                            <Input
                                type="date"
                                value={filters.guidance.registrationEndDate}
                                onChange={(e) => onFilterChange("registrationEndDate", e.target.value)}
                                placeholder="등록 종료일"
                            />
                        </div>

                        {/* 연식 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">연식</label>
                            <Input
                                type="number"
                                value={filters.guidance.modelYear}
                                onChange={(e) => onFilterChange("modelYear", e.target.value)}
                                placeholder="예: 2023"
                                min="1990"
                                max="2030"
                            />
                        </div>

                        {/* 주행거리 최소 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">주행거리 최소 (km)</label>
                            <Input
                                type="number"
                                value={filters.guidance.mileageFrom}
                                onChange={(e) => onFilterChange("mileageFrom", e.target.value)}
                                placeholder="예: 0"
                                min="0"
                            />
                        </div>

                        {/* 주행거리 최대 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">주행거리 최대 (km)</label>
                            <Input
                                type="number"
                                value={filters.guidance.mileageTo}
                                onChange={(e) => onFilterChange("mileageTo", e.target.value)}
                                placeholder="예: 100000"
                                min="0"
                            />
                        </div>
                    </>
                );
            case "happyCall":
                return (
                    <>
                        {/* 출고 시작일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">출고 시작일</label>
                            <Input
                                type="date"
                                value={filters.happyCall.deliveryStartDate}
                                onChange={(e) => onFilterChange("deliveryStartDate", e.target.value)}
                                placeholder="출고 시작일"
                            />
                        </div>

                        {/* 출고 종료일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">출고 종료일</label>
                            <Input
                                type="date"
                                value={filters.happyCall.deliveryEndDate}
                                onChange={(e) => onFilterChange("deliveryEndDate", e.target.value)}
                                placeholder="출고 종료일"
                            />
                        </div>

                        {/* 방문수 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">방문수 (이상)</label>
                            <Input
                                type="number"
                                value={filters.happyCall.visitCountMin}
                                onChange={(e) => onFilterChange("visitCountMin", e.target.value)}
                                placeholder="예: 5회 이상"
                                min="0"
                            />
                        </div>

                        {/* 차량명 (인라인) */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">차량명</label>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    value={filters.happyCall.vehicleName}
                                    onChange={(e) => onFilterChange("vehicleName", e.target.value)}
                                    placeholder="예: 아반떼, 소나타"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="px-2"
                                    onClick={() => {
                                        // TODO: 차량명 선택 모달 또는 드롭다운 구현
                                        console.log("차량명 선택 버튼 클릭");
                                    }}
                                >
                                    !
                                </Button>
                            </div>
                        </div>

                        {/* 등록 시작일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">차량등록 시작일</label>
                            <Input
                                type="date"
                                value={filters.happyCall.registrationStartDate}
                                onChange={(e) => onFilterChange("registrationStartDate", e.target.value)}
                                placeholder="등록 시작일"
                            />
                        </div>

                        {/* 등록 종료일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">차량등록 종료일</label>
                            <Input
                                type="date"
                                value={filters.happyCall.registrationEndDate}
                                onChange={(e) => onFilterChange("registrationEndDate", e.target.value)}
                                placeholder="등록 종료일"
                            />
                        </div>

                        {/* 연식 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">연식</label>
                            <Input
                                type="number"
                                value={filters.happyCall.modelYear}
                                onChange={(e) => onFilterChange("modelYear", e.target.value)}
                                placeholder="예: 2023"
                                min="1990"
                                max="2030"
                            />
                        </div>

                        {/* 주행거리 최소 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">주행거리 최소 (km)</label>
                            <Input
                                type="number"
                                value={filters.happyCall.mileageFrom}
                                onChange={(e) => onFilterChange("mileageFrom", e.target.value)}
                                placeholder="예: 0"
                                min="0"
                            />
                        </div>

                        {/* 주행거리 최대 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">주행거리 최대 (km)</label>
                            <Input
                                type="number"
                                value={filters.happyCall.mileageTo}
                                onChange={(e) => onFilterChange("mileageTo", e.target.value)}
                                placeholder="예: 100000"
                                min="0"
                            />
                        </div>
                    </>
                );
            case "preventive":
                const preventiveItemsList = [
                    "엔진오일",
                    "엔진오일필터",
                    "에어필터",
                    "연료필터",
                    "에어컨필터",
                    "브레이크 패드",
                    "브레이크 오일",
                    "브레이크 디스크",
                    "브레이크 드럼",
                    "브레이크 호스",
                    "타이어",
                    "타이어 밸런스",
                    "휠 얼라인먼트",
                    "배터리",
                    "배터리 단자",
                    "점화플러그",
                    "점화코일",
                    "점화선",
                    "냉각수",
                    "라디에이터",
                    "냉각팬",
                    "워터펌프",
                    "서모스탯",
                    "냉각호스",
                    "파워스티어링 오일",
                    "파워스티어링 벨트",
                    "미션오일",
                    "디퍼렌셜 오일",
                    "CVT오일",
                    "클러치",
                    "클러치 오일",
                    "타이밍벨트",
                    "팬벨트",
                    "에어컨벨트",
                    "구동벨트",
                    "와이퍼",
                    "와이퍼 모터",
                    "워셔액",
                    "헤드라이트",
                    "테일라이트",
                    "브레이크등",
                    "방향지시등",
                    "실내등",
                    "번호판등",
                    "안개등",
                    "후진등",
                    "경고등",
                    "HID램프",
                    "LED램프",
                    "할로겐램프",
                    "퓨즈",
                    "릴레이",
                    "발전기",
                    "시동모터",
                    "에어컨 컴프레서",
                    "에어컨 콘덴서",
                    "에어컨 증발기",
                    "에어컨 호스",
                    "에어컨 가스",
                    "머플러",
                    "촉매변환기",
                    "O2센서",
                    "EGR밸브",
                    "PCV밸브",
                    "연료펌프",
                    "연료인젝터",
                    "스로틀바디",
                ];

                const handlePreventiveItemToggle = (item: string) => {
                    const currentItems = filters.preventive.preventiveItems;
                    const newItems = currentItems.includes(item)
                        ? currentItems.filter((i) => i !== item)
                        : [...currentItems, item];
                    onFilterChange("preventiveItems", newItems);
                };

                const handleSelectAllPreventiveItems = () => {
                    onFilterChange("preventiveItems", preventiveItemsList);
                };

                const handleClearAllPreventiveItems = () => {
                    onFilterChange("preventiveItems", []);
                };

                return (
                    <>
                        {/* 차기점검일자 시작일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">차기점검 시작일</label>
                            <Input
                                type="date"
                                value={filters.preventive.startDate}
                                onChange={(e) => onFilterChange("startDate", e.target.value)}
                                placeholder="점검 시작일"
                            />
                        </div>

                        {/* 차기점검일자 종료일 */}
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">차기점검 종료일</label>
                            <Input
                                type="date"
                                value={filters.preventive.endDate}
                                onChange={(e) => onFilterChange("endDate", e.target.value)}
                                placeholder="점검 종료일"
                            />
                        </div>

                        {/* 예방항목 리스트 */}
                        <div className="col-span-full space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-medium text-muted-foreground">
                                    예방항목 ({filters.preventive.preventiveItems.length}/{preventiveItemsList.length}개
                                    선택)
                                </label>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSelectAllPreventiveItems}
                                        className="h-6 px-2 text-xs"
                                    >
                                        전체 선택
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleClearAllPreventiveItems}
                                        className="h-6 px-2 text-xs"
                                    >
                                        해제
                                    </Button>
                                </div>
                            </div>
                            {/* 윈도우 스타일 멀티컬럼 세로 스크롤 리스트 */}
                            <div className="border rounded-lg bg-white">
                                <div className="h-48 overflow-y-auto p-3">
                                    <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                                        {preventiveItemsList.map((item) => (
                                            <label
                                                key={item}
                                                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-muted/30 rounded text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={filters.preventive.preventiveItems.includes(item)}
                                                    onChange={() => handlePreventiveItemToggle(item)}
                                                    className="flex-shrink-0"
                                                />
                                                <span className="text-sm truncate">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case "inspectionInsurance":
                return (
                    <>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-muted-foreground">만료 유형</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="inspectionType"
                                        value="inspection"
                                        checked={filters.inspectionInsurance.type === "inspection"}
                                        onChange={(e) => onFilterChange("type", e.target.value)}
                                        className="text-blue-600"
                                    />
                                    <span className="text-sm">검사만료일</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="inspectionType"
                                        value="insurance"
                                        checked={filters.inspectionInsurance.type === "insurance"}
                                        onChange={(e) => onFilterChange("type", e.target.value)}
                                        className="text-blue-600"
                                    />
                                    <span className="text-sm">보험사만료일</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">만료 시작일</label>
                            <Input
                                type="date"
                                value={filters.inspectionInsurance.startDate}
                                onChange={(e) => onFilterChange("startDate", e.target.value)}
                                placeholder="시작일 선택"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">만료 종료일</label>
                            <Input
                                type="date"
                                value={filters.inspectionInsurance.endDate}
                                onChange={(e) => onFilterChange("endDate", e.target.value)}
                                placeholder="종료일 선택"
                            />
                        </div>
                    </>
                );
            case "birthday":
                return (
                    <>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">생일 시작일 (월-일)</label>
                            <Input
                                type="text"
                                value={filters.birthday.startDate}
                                onChange={(e) => onFilterChange("startDate", e.target.value)}
                                placeholder="MM-DD (예: 03-15)"
                                pattern="[0-9]{2}-[0-9]{2}"
                                maxLength={5}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-muted-foreground">생일 종료일 (월-일)</label>
                            <Input
                                type="text"
                                value={filters.birthday.endDate}
                                onChange={(e) => onFilterChange("endDate", e.target.value)}
                                placeholder="MM-DD (예: 03-31)"
                                pattern="[0-9]{2}-[0-9]{2}"
                                maxLength={5}
                            />
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return <>{renderCategoryFilters()}</>;
}

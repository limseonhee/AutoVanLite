// 한 달 일별 SMS/Push 데이터 생성
export const generateDailyChartData = () => {
    const data = [];
    for (let day = 1; day <= 30; day++) {
        data.push({
            day,
            sms: Math.floor(Math.random() * 40) + 10, // 10-50 범위
            push: Math.floor(Math.random() * 50) + 15, // 15-65 범위
        });
    }
    return data;
};

// 고정된 샘플 데이터 (개발용)
export const SAMPLE_DAILY_CHART_DATA = [
    { day: 1, sms: 85, push: 15 },
    { day: 2, sms: 80, push: 10 },
    { day: 3, sms: 45, push: 20 },
    { day: 4, sms: 30, push: 35 },
    { day: 5, sms: 38, push: 28 },
    { day: 6, sms: 42, push: 32 },
    { day: 7, sms: 48, push: 18 },
    { day: 8, sms: 25, push: 40 },
    { day: 9, sms: 50, push: 22 },
    { day: 10, sms: 32, push: 38 },
    { day: 11, sms: 44, push: 26 },
    { day: 12, sms: 36, push: 34 },
    { day: 13, sms: 41, push: 29 },
    { day: 14, sms: 39, push: 31 },
    { day: 15, sms: 24, push: 46 },
    { day: 16, sms: 36, push: 34 },
    { day: 17, sms: 27, push: 43 },
    { day: 18, sms: 33, push: 37 },
    { day: 19, sms: 21, push: 49 },
    { day: 20, sms: 39, push: 31 },
    { day: 21, sms: 23, push: 47 },
    { day: 22, sms: 37, push: 33 },
    { day: 23, sms: 25, push: 45 },
    { day: 24, sms: 30, push: 40 },
    { day: 25, sms: 28, push: 42 },
    { day: 26, sms: 35, push: 35 },
    { day: 27, sms: 26, push: 44 },
    { day: 28, sms: 32, push: 38 },
    { day: 29, sms: 29, push: 41 },
    { day: 30, sms: 31, push: 39 },
] as const;

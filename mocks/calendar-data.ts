// 캘린더 일별 데이터 생성
export const generateCalendarData = () => {
    const data: { [key: number]: { sms: number; push: number } } = {};
    for (let day = 1; day <= 30; day++) {
        data[day] = {
            sms: Math.floor(Math.random() * 30) + 5, // 5-35 범위
            push: Math.floor(Math.random() * 40) + 10, // 10-50 범위
        };
    }
    return data;
};

// 고정된 샘플 데이터 (개발용)
export const SAMPLE_CALENDAR_DATA = {
    1: { sms: 15, push: 25 },
    2: { sms: 20, push: 30 },
    3: { sms: 12, push: 35 },
    4: { sms: 25, push: 20 },
    5: { sms: 18, push: 28 },
    6: { sms: 22, push: 32 },
    7: { sms: 10, push: 38 },
    8: { sms: 30, push: 15 },
    9: { sms: 14, push: 40 },
    10: { sms: 28, push: 22 },
    11: { sms: 16, push: 34 },
    12: { sms: 24, push: 26 },
    13: { sms: 19, push: 31 },
    14: { sms: 21, push: 29 },
    15: { sms: 13, push: 36 },
    16: { sms: 26, push: 24 },
    17: { sms: 17, push: 33 },
    18: { sms: 23, push: 27 },
    19: { sms: 11, push: 39 },
    20: { sms: 29, push: 21 },
    21: { sms: 15, push: 35 },
    22: { sms: 27, push: 23 },
    23: { sms: 18, push: 32 },
    24: { sms: 20, push: 30 },
    25: { sms: 16, push: 34 },
    26: { sms: 25, push: 25 },
    27: { sms: 14, push: 36 },
    28: { sms: 22, push: 28 },
    29: { sms: 19, push: 31 },
    30: { sms: 21, push: 29 },
} as const;

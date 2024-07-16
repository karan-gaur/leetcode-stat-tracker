import { LEETCODE_API_URL } from './constants';
import { Activity, ApiErrorResponse, LeetcodeData, SubmissionCalendar } from './type';

export const transformData = (
    data: SubmissionCalendar,
    transformFn?: (data: SubmissionCalendar) => Array<Activity>,
  ): Array<Activity> => {
    if (!transformFn) {
        return Object.entries(data).map(([timestamp, count]) => ({
            date: new Date(parseInt(timestamp) * 1000).toISOString().split("T")[0],
            count: count,
            level: count > 4 ? 4 : (count < 0 ? 0 : count) as (0 | 1 | 2 | 3 | 4),
        }));
    }

    const transformedData = transformFn(data);

    // Validate transformed data
    transformedData.forEach(day => {
        if (typeof day.count !== 'number' || day.count < 0) {
        throw new Error(`Required property "count: number" missing or invalid. Got: ${day.count}`);
        }

        if (!/\d{4}-\d{2}-\d{2}/.test(day.date)) {
        throw new Error(`Required property "date: YYYY-MM-DD" missing or invalid. Got: ${day.date}`);
        }

        if (day.level !== 0 && day.level !== 1 && day.level !== 2 && day.level !== 3 && day.level !== 4) {
        throw new Error(`Required property "level: 0 | 1 | 2 | 3 | 4" missing or invalid. Got: ${day.level}.`);
        }
    });
    return transformedData;
};
export const fetchCalendarData = async (username: string): Promise<LeetcodeData> => {
    const response = await fetch(`${LEETCODE_API_URL}/${username}`);
    const data: LeetcodeData | ApiErrorResponse = await response.json();

    if (!response.ok) {
        throw Error(`Fetching LeetCode submission data for "${username}" failed: ${(data as ApiErrorResponse).error}`);
    }
    return data as LeetcodeData;
};

import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Calendar, {
  type Props as ActivityCalendarProps,
  Skeleton,
} from "react-activity-calendar";
import { DEFAULT_THEME } from "./constants";
import {
  Activity,
  LeetcodeData,
  SubmissionCalendar,
  ThemeInput,
  Year,
} from "./types";
import { fetchCalendarData, transformData } from "./utils";

export interface Props extends Omit<ActivityCalendarProps, "data" | "theme"> {
  username: string;
  errorMessage?: string;
  theme?: ThemeInput;
  throwOnError?: boolean;
  transformData?: (data: SubmissionCalendar) => Array<Activity>;
  transformTotalCount?: boolean;
  year?: Year;
}

const LeetcodeCalendar: FunctionComponent<Props> = ({
  username,
  labels,
  year = "last",
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error Fetching LeetCode submission data for "${username}" failed.`,
  ...props
}) => {
  const [data, setData] = useState<LeetcodeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchCalendarData(username)
      .then((data) => {
        setData(data);
        const total = Object.values(data.submissionCalendar).reduce(
          (sum: number, count: number) => sum + count,
          0
        );
        setTotalCount(total);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [username]);

  useEffect(fetchData, [fetchData]);

  if (error) {
    if (throwOnError) {
      throw error;
    } else {
      return <div>{errorMessage}</div>;
    }
  }

  if (loading || !data) {
    return <Skeleton {...props} loading />;
  }

  const theme = props.theme ?? DEFAULT_THEME;
  const defaultLabels = {
    totalCount: `${totalCount} submissions in the last year`,
  };

  return (
    <Calendar
      data={transformData(data.submissionCalendar, transformFn)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={totalCount}
      {...props}
      loading={Boolean(props.loading) || loading}
      maxLevel={4}
    />
  );
};

export default LeetcodeCalendar;

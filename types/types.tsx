export type DayStatus = {
    day: string;
    lap_goal: number;
    exercise_count: number;
    water_count: number;
    lap_count: number;
}

export type MetricData = {
    id: string;
    label: string;
    current: number;
    total: number;
    icon: React.ReactNode;
    color: string;
}

export type Category = {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}
export type StatBoxProps = {
    value: number,
    total?: number,
    label: string,
    color: string,
    iconColor: string,
    labelColor: string
}
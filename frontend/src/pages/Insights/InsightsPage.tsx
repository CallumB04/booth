import { useState } from "react";
import Button from "../../components/Button/Button";
import DatePicker from "../../components/DatePicker/DatePicker";
import Page from "../../components/Page/Page";
import usePageTitle from "../../hooks/usePageTitle";

// Jumps the range back by a set number of days, ending today
const RANGE_PRESETS = [30, 60, 90];

const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};

// Days the range spans. Rounded, so the hour a clock change adds or removes
// doesn't shift the count.
const daysBetween = (from: Date, to: Date) =>
    Math.max(
        0,
        Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
    );

const InsightsPage = () => {
    usePageTitle("insights / booth");

    // Defaults to the past 30 days
    const [from, setFrom] = useState<Date>(daysAgo(30));
    const [to, setTo] = useState<Date>(new Date());

    const selectPreset = (days: number) => {
        setFrom(daysAgo(days));
        setTo(new Date());
    };

    return (
        <Page
            title="insights"
            navigation={
                <>
                    <DatePicker
                        containerClassName="w-max"
                        className="w-48"
                        inlineLabel="from"
                        value={from}
                        onChange={setFrom}
                    />
                    <DatePicker
                        containerClassName="w-max"
                        className="w-48"
                        inlineLabel="to"
                        value={to}
                        onChange={setTo}
                    />
                    <span className="text-text-tertiary font-mono text-[11px] lowercase">
                        {daysBetween(from, to)}{" "}
                        {daysBetween(from, to) === 1 ? "day" : "days"}
                    </span>
                </>
            }
            actions={
                <>
                    {RANGE_PRESETS.map((days) => (
                        <Button
                            key={days}
                            variant="secondary"
                            size="sm"
                            onClick={() => selectPreset(days)}
                        >
                            {days}d
                        </Button>
                    ))}
                </>
            }
        />
    );
};

export default InsightsPage;

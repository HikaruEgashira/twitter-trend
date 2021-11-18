import React from "react";
import useSWR from "swr";
import { TrendV1 } from "twitter-api-v2";

export const Trends: React.FC = () => {
    const { data: trends } = useSWR<TrendV1[]>("/api/trends");

    return (
        <>
            {trends ? (
                <ul>
                    {trends.map((trend) => (
                        <li key={trend.url}>
                            {trend.name} {trend.tweet_volume}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>ちょっとまってね</div>
            )}
        </>
    );
};

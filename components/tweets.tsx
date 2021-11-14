import React from "react";
import useSWR from "swr";
import { TweetV2 } from "twitter-api-v2";

export const Tweets: React.FC<{ query: string | undefined }> = ({ query }) => {
    const { data: count } = useSWR<number>(
        query ? `/api/count?q=${encodeURIComponent(query)} -is:retweet` : null,
        // 60秒ごとに個数を取得
        { refreshInterval: 60 * 1000 }
    );

    return <>{count ? <div>{count}</div> : <div>ちょっとまってね</div>}</>;
};

export const TweetsDetail: React.FC<{ query: string | undefined }> = ({
    query,
}) => {
    const { data: tweets } = useSWR<TweetV2[]>(
        query ? `/api/tweets?q=${encodeURIComponent(query)} -is:retweet` : null,
        // 60秒ごとに個数を取得
        { refreshInterval: 60 * 1000 }
    );

    return (
        <ul>
            {tweets &&
                tweets.map((tweet) => <li key={tweet.id}>{tweet.text}</li>)}
        </ul>
    );
};

import { TwitterApi, TrendV1, TweetV2 } from "twitter-api-v2";
import { formatISO, subSeconds } from "date-fns";

// セキュリティー対策
if (typeof window !== "undefined") {
    throw new Error("[エラー] Twitter APIはフロントエンドで利用できません");
}
if (typeof process.env.TWITTER_BEARER_TOKEN === undefined) {
    throw new Error("[エラー] Twitter APIのキーが設定されていません");
}

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN || "").readOnly;

export const getTrends = async (): Promise<TrendV1[]> => {
    // 緯度経度を指定してトレンドを取得
    const trendLocations = await client.v1.trendsClosest(36.110143, 140.101354);
    const id = trendLocations[0].woeid;

    const trendMatch = await client.v1.trendsByPlace(id);
    return trendMatch[0].trends
        .filter((trend) => trend.tweet_volume)
        .sort((a, b) => b.tweet_volume - a.tweet_volume);
};

export const getTweet = async (
    query: string,
    max_results = 10
): Promise<TweetV2[]> => {
    const now = new Date();
    const tweets = await client.v2.search(query, {
        max_results,
        end_time: formatISO(subSeconds(now, 30)), // 制約上、30秒以内のツイートは取得できない
        start_time: formatISO(subSeconds(now, 60)),
    });
    return tweets.data.data;
};

/**
 * １分間に投稿されたツイートの個数を取得
 */
export const getTweetCount = async (query: string): Promise<number> => {
    const now = new Date();
    const res = await client.v2.tweetCountRecent(query, {
        end_time: formatISO(subSeconds(now, 30)), // 制約上、30秒以内のツイートは取得できない
        start_time: formatISO(subSeconds(now, 60)),
    });
    if (res.errors) {
        console.error(JSON.stringify(res.errors));
        return 0;
    }
    return res.data[0].tweet_count;
};

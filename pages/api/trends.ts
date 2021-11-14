import type { NextApiRequest, NextApiResponse } from "next";
import { TrendV1 } from "twitter-api-v2";
import { getTrends } from "../../lib/twitter";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TrendV1[]>
) {
    const trends = await getTrends();

    res.setHeader(
        "Cache-Control",
        "s-maxage=86400, stale-while-revalidate=3600"
    );
    res.status(200).json(trends);
}

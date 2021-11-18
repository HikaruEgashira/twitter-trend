import type { NextApiRequest, NextApiResponse } from "next";
import { getTrends } from "../../lib/twitter";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const trends = await getTrends();

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=300");
    res.status(200).json(trends);
}

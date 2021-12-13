import { cors, runMiddleware } from "lib/cors";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTrends } from "lib/twitter";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await runMiddleware(req, res, cors);

    const trends = await getTrends();

    res.setHeader("Cache-Control", "public, s-maxage=300");
    res.status(200).json(trends);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { getTweetCount } from "lib/twitter";
import { cors, runMiddleware } from "lib/cors";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await runMiddleware(req, res, cors);

    const { q } = req.query;
    if (typeof q !== "string") {
        return res.status(400).json({ error: "Missing query" });
    }

    const tweets = await getTweetCount(q);

    res.setHeader("Cache-Control", "public, s-maxage=30");
    res.status(200).json(tweets);
}

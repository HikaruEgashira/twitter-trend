import type { NextApiRequest, NextApiResponse } from "next";
import { getTweet } from "../../lib/twitter";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { q } = req.query;
    if (typeof q !== "string") {
        return res.status(400).json({ error: "Missing query" });
    }

    const tweets = await getTweet(q);

    res.setHeader("Cache-Control", "public, s-maxage=30");
    res.status(200).json(tweets);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import { getTweet } from "../../lib/twitter";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { q } = req.query;
    if (typeof q !== "string") {
        res.status(400).json({ error: "Missing query" });
        return;
    }

    const tweets = await getTweet(q);
    res.status(200).json(tweets);
}

import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// CORS のミドルウェアを初期化
export const cors = Cors({
    origin: "*",
});

export function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: (req: NextApiRequest, res: NextApiResponse, fn: any) => unknown
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

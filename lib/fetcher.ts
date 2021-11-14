import { Fetcher } from "swr";

export const fetcher: Fetcher<any> = (
    input: RequestInfo,
    init?: RequestInit | undefined
) => fetch(input, init).then((res) => res.json());

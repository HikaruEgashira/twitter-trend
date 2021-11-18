import "styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                // 5秒ごとに更新が走る
                refreshInterval: 5000,
                fetcher: (url: string) => fetch(url).then((r) => r.json()),
            }}
        >
            <Component {...pageProps} />
        </SWRConfig>
    );
}

export default MyApp;

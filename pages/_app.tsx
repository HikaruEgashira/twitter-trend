import "styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { fetcher } from "lib/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                fetcher,
            }}
        >
            <Component {...pageProps} />
        </SWRConfig>
    );
}

export default MyApp;

import type { NextPage } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import { TweetCount } from "components/tweets";
import useSWR from "swr/immutable";
import { TrendV1 } from "twitter-api-v2";

const Home: NextPage = () => {
    const { data: trends } = useSWR<TrendV1[]>("/api/trends", {
        refreshInterval: 1000 * 60,
    });
    return (
        <div className={styles.container}>
            <Head>
                <title>Twitter Trend</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://nextjs.org">Next.js!</a>
                </h1>

                <div>
                    <h2>トレンド毎のツイート</h2>
                    {trends?.splice(0, 3).map((trend) => (
                        <>
                            <h3>
                                <a
                                    href={trend.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {trend.name}
                                </a>
                            </h3>
                            <p className={styles.flex}>
                                {trend.tweet_volume}
                                <div>+</div>
                                <TweetCount
                                    key={trend.url}
                                    query={trend.name}
                                />
                            </p>
                        </>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;

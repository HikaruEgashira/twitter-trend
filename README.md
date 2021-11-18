# twitter-trend

SWRで更新します。

### 動的更新の仕組み

- see <https://swr.vercel.app/docs/revalidation#revalidate-on-interval>

### 開発環境の整備

```bash
yarn install
cp .env.example .env.local
code .env.local # TWITTER_BEARER_TOKENを入れる
yarn dev
```

### デプロイ

- [vercel](vercel.com)を使いましょう（推奨）
- 環境変数の欄にTWITTER_BEARER_TOKENを入れましょう

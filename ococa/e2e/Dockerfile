# Playwrightの公式Dockerイメージをベースに使用
FROM mcr.microsoft.com/playwright:v1.49.1-noble

# 作業ディレクトリを設定
WORKDIR /home/pwuser/project

# Playwrightプロジェクト全体をコピー
COPY playwright/ ./

# 依存関係をインストール
RUN npm install

# レポート出力ディレクトリの作成
RUN mkdir -p /reports/playwright-report

# Playwrightテストを実行するためのデフォルトコマンドを設定
CMD ["npx", "playwright", "test"]
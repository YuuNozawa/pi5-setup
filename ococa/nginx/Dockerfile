# ビルドステージでSSHを有効化
# SSHキーはpi5で　ssh-keygen -t ed25519 -C "your_email@example.com"を実行して取得
# docker-compose upする前にシェルでssh-addが必須(ないとcomposeに失敗する)
# syntax=docker/dockerfile:1.2

# フロントエンドのビルドステージ
FROM node:18-alpine AS build

# 作業ディレクトリを設定
WORKDIR /app

# Gitをインストール（Alpineベースのため）
RUN apk add --no-cache git openssh

# GitHubのホストキーをknown_hostsに追加
RUN mkdir -p /root/.ssh && ssh-keyscan github.com >> /root/.ssh/known_hosts

# BuildKitのSSHエージェントを使用
# Gitリポジトリからコードをクローン
RUN --mount=type=ssh git clone git@github.com:YuuNozawa/ococa-frontend.git ococa-frontend

# ococa-frontendディレクトリに移動
WORKDIR /app/ococa-frontend

# .env.production をコピー
COPY .env.production .env.production

# 依存関係をインストール
RUN npm install

# 残りのソースコードをコピーしてビルド
# 既にクローン済みのため、必要なファイルはすべて含まれている
RUN npm run build

# Nginxのランタイムステージ
FROM nginx:latest

# ビルド成果物をNginxの公開ディレクトリにコピー
COPY --from=build /app/ococa-frontend/build /var/www/html

# カスタムNginx設定ファイルをコピー
COPY ./nginx.conf /etc/nginx/nginx.conf

# NGINXの設定をテスト
# Dockerのビルド時には他のサービス（コンテナ）は起動しておらず、ネットワーク上に存在しないため
# nginx.confのproxy_pass http://backend:8080;でbackendというホスト名が解決できない
# よって、nginx単体の起動テスト以外ではコメントアウトしておく
# RUN nginx -t
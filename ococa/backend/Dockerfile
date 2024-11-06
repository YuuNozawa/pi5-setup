# ビルドステージでSSHを有効化
# SSHキーはpi5で　ssh-keygen -t ed25519 -C "your_email@example.com"を実行して取得
# docker-compose upする前にシェルでssh-addが必須(ないとcomposeに失敗する)
# syntax=docker/dockerfile:1.2

# ビルドステージ
FROM gradle:7.6.1-jdk17 AS build

# 作業ディレクトリを設定
WORKDIR /app

# GitHubのホストキーをknown_hostsに追加
RUN mkdir -p /root/.ssh && ssh-keyscan github.com >> /root/.ssh/known_hosts

# BuildKitのSSHエージェントを使用
# Gitリポジトリからコードをクローン
RUN --mount=type=ssh git clone git@github.com:YuuNozawa/ococa.git ococa

# serverディレクトリに移動
WORKDIR /app/ococa/server

# ローカルのapplication-dev.propertiesをコピー
COPY application-prod.properties src/main/resources/

# ローカルの keystore ディレクトリをコピー
COPY keystore src/main/resources/keystore

# アプリケーションをビルド
RUN ./gradlew build --no-daemon

# 実行ステージ
# openjdk:17-jre-slim は2021年から非推奨イメージ
FROM eclipse-temurin:17-jre

# 作業ディレクトリを設定
WORKDIR /app/ococa/server

# ビルドしたJARファイルをコピー
COPY --from=build /app/ococa/server/build/libs/*.jar app.jar

# ポートを公開
EXPOSE 8080

# JVMのタイムゾーンの設定(ログ出力の時刻を日本時間にするため)
ENV JAVA_OPTS="-Duser.timezone=Asia/Tokyo"


# アプリケーションを実行
ENTRYPOINT ["java", "-jar", "app.jar"]

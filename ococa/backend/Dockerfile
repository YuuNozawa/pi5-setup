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
RUN --mount=type=ssh git clone git@github.com:YuuNozawa/ococa-backend.git ococa-backend

# ococa-backendディレクトリに移動
WORKDIR /app/ococa-backend

# ローカルのapplication-prod.propertiesをコピー
COPY application-prod.properties src/main/resources/

# ローカルの keystore ディレクトリをコピー
# COPY keystore src/main/resources/keystore

# アプリケーションをビルド
RUN ./gradlew build --no-daemon

# 実行ステージ
# openjdk:17-jre-slim は2021年から非推奨イメージ
FROM eclipse-temurin:17-jre

# 作業ディレクトリを設定
WORKDIR /app/ococa-backend

# 証明書をコピー
COPY certs/raspberrypi.local.crt /usr/local/share/ca-certificates/raspberrypi.local.crt

# 必要なパッケージをインストールし、証明書をJavaの信頼ストアにインポート
RUN apt-get update && \
    apt-get install -y ca-certificates-java && \
    update-ca-certificates && \
    keytool -importcert -trustcacerts \
        -keystore $JAVA_HOME/lib/security/cacerts \
        -storepass changeit \
        -noprompt \
        -alias raspberrypi \
        -file /usr/local/share/ca-certificates/raspberrypi.local.crt

# ビルドしたJARファイルをコピー
COPY --from=build /app/ococa-backend/build/libs/*.jar app.jar

# ポートを公開
EXPOSE 8080

# JVMのタイムゾーンの設定(ログ出力の時刻を日本時間にするため)
ENV JAVA_OPTS="-Duser.timezone=Asia/Tokyo"


# アプリケーションを実行
ENTRYPOINT ["java", "-jar", "app.jar"]

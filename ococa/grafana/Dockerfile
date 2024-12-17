FROM grafana/grafana:latest

ENV GF_SERVER_ROOT_URL=https://raspberrypi.local/grafana/

# ENV GF_SERVER_SERVE_FROM_SUB_PATH=false

# ococaの画像イメージをコピー
COPY ococa.png /usr/share/grafana/public/images/ococa.png

# raspberrypiの画像イメージをコピー
COPY raspberrypi.png /usr/share/grafana/public/images/raspberrypi.png

# プロビジョニングファイルのコピー
COPY provisioning /etc/grafana/provisioning
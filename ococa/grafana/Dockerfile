FROM grafana/grafana:latest

# ococaの画像イメージをコピー
COPY ococa.png /usr/share/grafana/public/images/ococa.png

# raspberrypiの画像イメージをコピー
COPY raspberrypi.png /usr/share/grafana/public/images/raspberrypi.png

# プロビジョニングファイルのコピー
COPY provisioning /etc/grafana/provisioning
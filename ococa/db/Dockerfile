FROM mysql

# my.cnfをコンテナ内にコピー
COPY my.cnf /etc/mysql/conf.d/my.cnf

# 初期化スクリプトをコンテナ内にコピー
COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d


# 必要に応じて文字コードやその他の設定を追加
ENV LANG=C.UTF-8

CMD ["mysqld"]
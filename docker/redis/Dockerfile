FROM django:latest

MAINTAINER Samuel Kurath <skurath@hsr.ch>

ENV REDIS_PORT 40001
ENV DASHBOARD_PORT 40002

EXPOSE $REDIS_PORT $DASHBOARD_PORT

COPY entrypoint.sh /
COPY my_redis.conf /etc/redis/
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ENTRYPOINT ["./entrypoint.sh"]

RUN apt-get update -y \
&& apt-get upgrade -y \
&& apt-get install -y redis-server libevent-dev git vim build-essential supervisor\
&& pip install rq-dashboard \
&& mkdir /redis/ \
&& chmod +x /entrypoint.sh \





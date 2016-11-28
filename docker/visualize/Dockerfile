FROM node:7.2.0-wheezy

MAINTAINER Samuel Kurath <skurath@hsr.ch>

ENV REPOSITORY "https://github.com/geometalab/OSMDeepOD-Visualize.git"
ENV REPO_NAME "OSMDeepOD-Visualize"
ENV VISUALIZING_PORT 40003

EXPOSE $VISUALIZING_PORT

COPY entrypoint.sh /
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

ENTRYPOINT ["./entrypoint.sh"]

RUN apt-get update -y \
&& apt-get upgrade -y \
&& apt-get install -y git vim supervisor\
&& cd / \
&& git clone $REPOSITORY \
&& cd /$REPO_NAME \
&& npm install \
&& npm install @angular/compiler-cli@2.2.0 --save-dev \
&& npm install -g angular-cli \
&& ng build \
&& chmod +x /entrypoint.sh \


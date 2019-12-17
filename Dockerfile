FROM node:10.15-alpine

ENV NPM_CONFIG_LOGLEVEL warn

ARG API_BASE_URL=https://5g-dashboard.i2cat.net
ARG API_MONITORING=https://5g-dashboard.i2cat.net/ext/monitoring

ENV API_BASE_URL ${API_BASE_URL}
ENV API_MONITORING ${API_MONITORING}

RUN apk add --update --no-cache yarn && \
    mkdir /code && \
    npm install replace serve -g

EXPOSE 5000

COPY . /code

WORKDIR /code

RUN yarn install --silent && \
    yarn build:docker && \
    mkdir /www && \
    mv build/** /www && \
    rm -rf /code

WORKDIR /www

CMD ["serve","-s"]

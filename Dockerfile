FROM node:10.15-alpine

ENV NPM_CONFIG_LOGLEVEL warn

ARG API_BASE_URL=https://5g-dashboard.i2cat.net

ENV API_BASE_URL ${API_BASE_URL}

RUN apk add --update --no-cache yarn && \
    mkdir /code && \
    npm install replace serve -g

EXPOSE 5000

COPY . /code

WORKDIR /code

RUN yarn install && \
    yarn build:docker && \
    mkdir /www && \
    mv build/** /www && \
    rm -rf /code

WORKDIR /www

CMD ["serve","-s"]

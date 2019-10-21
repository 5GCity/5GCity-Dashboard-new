FROM node:10.15-alpine

ENV NPM_CONFIG_LOGLEVEL warn

ARG API_BASE_URL=http://206.189.7.202:8000
ARG AUTH_SERVER_URL=http://206.189.7.202:7070/auth
ARG API_BASE_SDK=http://10.10.7.51:8081

ENV API_BASE_URL ${API_BASE_URL}
ENV AUTH_SERVER_URL ${AUTH_SERVER_URL}
ENV API_BASE_SDK ${API_BASE_SDK}

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

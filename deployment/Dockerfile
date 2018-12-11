FROM node:9.6.1-alpine
ENV NPM_CONFIG_LOGLEVEL warn
RUN apk add --update --no-cache yarn && \
    rm /var/cache/apk/* && \
    mkdir /code

EXPOSE 5000
COPY ../ /code
WORKDIR /code

RUN yarn install && \
    yarn build

CMD ["yarn", "start:server"]

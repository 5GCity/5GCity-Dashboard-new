FROM node:10.15-alpine

ENV NPM_CONFIG_LOGLEVEL warn

ARG API_BASE_URL=https://5g-dashboard.i2cat.net
ARG API_MONITORING=https://5gcity-monitoring.i2cat.net

ENV API_BASE_URL ${API_BASE_URL}
ENV API_MONITORING ${API_MONITORING}

RUN mkdir /code
RUN npm install replace serve -g

EXPOSE 5000

COPY . /code

WORKDIR /code

RUN yarn install
RUN yarn build:docker
RUN mkdir /www
RUN mv build/** /www
RUN rm -rf /code

WORKDIR /www

CMD ["serve","-s"]

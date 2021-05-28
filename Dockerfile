FROM node:12.22-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community/

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn start:dev

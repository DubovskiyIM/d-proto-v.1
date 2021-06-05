FROM node:12.22-alpine As development
RUN mkdir -p /var/www/nest-app
WORKDIR /var/www/nest-app
ENV PATH /var/www/nest-app/node_modules/.bin:$PATH
RUN adduser --disabled-password user
COPY . /var/www/nest-app
COPY package.json /var/www/nest-app/package.json
RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community/
RUN yarn install
COPY . .
EXPOSE 3004
CMD [ "yarn", "start:dev" ]

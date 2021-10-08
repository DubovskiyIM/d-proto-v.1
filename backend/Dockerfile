FROM node:14.15-alpine As production

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

COPY ./.env .

RUN yarn build

CMD ["yarn", "start:dev"]

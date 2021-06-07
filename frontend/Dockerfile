FROM node:12.15.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/unique-fashion /usr/share/nginx/html

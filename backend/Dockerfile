FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
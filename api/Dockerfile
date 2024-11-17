FROM node:22.4.1-alpine AS node

RUN apk add --update python3 \
   && rm -rf /var/cache/apk/*

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

USER node

RUN yarn install

COPY --chown=node:node . .

EXPOSE 5000

CMD [ "node", "./bin/www" ]
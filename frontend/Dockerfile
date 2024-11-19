# Étape 1 : Construire l'application React
FROM node:22.4.1-alpine AS build

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./

COPY . ./

RUN yarn install
RUN yarn run build


# Étape 2 : Servir l'application React
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
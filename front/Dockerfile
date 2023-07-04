FROM node:16 as build
WORKDIR /front

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
RUN yarn build --configuration=production

# Serve Application using Nginx Server

FROM nginx:alpine

COPY --from=build /front/dist/front/ /usr/share/nginx/html

EXPOSE 80

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./api/package.json ./api/tsconfig.json /usr/src/app/api/

WORKDIR /usr/src/app/api

RUN npm install

COPY ./api ./

EXPOSE 5000

CMD [ "npm", "run", "dev" ]


FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json tsconfig.json /usr/src/app/api/

RUN cd api && npm install

COPY . ./api/

EXPOSE 5000

WORKDIR /usr/src/app/api

CMD [ "npm", "run", "dev" ]


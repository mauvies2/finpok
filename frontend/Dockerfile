FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./frontend/package.json ./frontend/tsconfig.json /usr/src/app/frontend/

WORKDIR /usr/src/app/frontend

RUN npm install

COPY ./frontend/ ./

EXPOSE 3000

CMD [ "npm", "run", "dev" ]


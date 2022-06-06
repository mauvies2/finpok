FROM node:16.14.0

WORKDIR /usr/src/app

COPY package.json tsconfig.json Makefile /usr/src/app/
RUN npm install

COPY ./frontend/package.json ./frontend/tsconfig.json ./frontend/yarn.lock /usr/src/app/frontend/
WORKDIR /usr/src/app/frontend
RUN npm install

COPY ./api/package.json ./api/tsconfig.json /usr/src/app/api/
WORKDIR /usr/src/app/api
RUN npm install

COPY ./core/tsconfig.json /usr/src/app/core/
COPY ./frontend /usr/src/app/frontend
COPY ./api /usr/src/app/api

EXPOSE 3000
EXPOSE 5000





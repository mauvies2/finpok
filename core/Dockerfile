FROM node:16.14.0

USER node

WORKDIR /usr/src/app

COPY ../tsconfig.json ../package.json /usr/src/app/
COPY tsconfig.json /usr/src/app/core/

RUN cd .. && npm install


FROM node:16.14.0

WORKDIR /usr/src/app

COPY ./api/package.json ./api/tsconfig.json /usr/src/app/api/

RUN cd api && npm install

COPY ./api/ ./api/
COPY ./core/ ./core/

EXPOSE 5000

WORKDIR /usr/src/app/api

CMD [ "npm", "run", "dev" ]


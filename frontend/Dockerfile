FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package.json tsconfig.json yarn.lock /usr/src/app/frontend/

RUN cd frontend && npm install

COPY . ./frontend/

EXPOSE 3000

WORKDIR /usr/src/app/frontend

CMD [ "npm", "run", "dev" ]


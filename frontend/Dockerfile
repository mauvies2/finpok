FROM node:16.14.0

WORKDIR /usr/src/app

COPY ./frontend/package.json ./frontend/tsconfig.json ./frontend/yarn.lock /usr/src/app/frontend/

RUN cd frontend && npm install

COPY ./frontend/ ./frontend/
COPY ./core/ ./core/

EXPOSE 3000

WORKDIR /usr/src/app/frontend

RUN npm -v

CMD [ "npm", "run", "dev" ]


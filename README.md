<!-- TITLE -->

## Finpoq

A great, quick and safe portfolio balance tracker!

<!-- ABOUT THE PROJECT -->

## About The Project

This is a personal project both to satisfy a personal need and to continue improving as a full stack developer. The problem that the application solves is that it allows you to keep track of your cryptocurrency portfolio balance without having to access each of the wallets where the tokens are stored.

<!-- GETTING STARTED -->

## Getting Started

The first step is to clone the repository using the following command.

```sh
git clone https://github.com/mauvies2/finpoq.git
```

If docker is installed in your machine you can run the following commmand from the root directory to lift the containers and start the app.

```sh
docker compose up
```

In case of not having docker installed, first install dependencies from the root directory.

```sh
npm install
```

Move into the api directory and install dependencies.

```sh
cd api && npm run install
```

Lift the server by running.

```sh
npm run dev
```

Now move into the frontend directory and follow the same procedure.

```sh
cd ../frontend && npm install
```

```sh
npm run dev
```

Fantastic! The app should be running on port 3000 of localhost!

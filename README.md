<h1 align="center">Start your next react typescript project in seconds</h1>

### Features

- **Latest versions**
- **Typescript**
- **Eslint with Typescript**
- **Jest setup with react-testing-library and mocks**
- **Styled with Prettier**
- **Typography, utility styles and mixins** in less
- **Docker ready**

## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [Docker](#-docker)
- [Related Projects](#-related-projects)
- [License](#-license)

---

## ❯ Getting Started

### Step 1: Set up the Development Environment

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env`-file.

Then setup your application environment.

```bash
npm install
```

> This installs all dependencies.

### Step 3: Serve your App

Go to the project dir and start your app with this npm script.

```bash
npm run start
```

> This starts a local express server with hot reloadable webpack middlewares, which will watch for any file changes(client code) and will restart the sever according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.

---

## ❯ Scripts and Tasks

### Install

- Install all dependencies with `npm install`

### Linting

- Run code quality analysis using `npm run lint`.
- Fix lint issues with `npm run lint:fix`.

### Tests

- Run the unit tests using `npm run test`.
- Run the unit tests in watch mode using `npm run test:watch`.
- Generate coverage using `npm run test:cov`.

### Running in dev mode

- Run `npm run start` to start webpack server in hot reloading mode.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `npm run start:production` to build optimized client bundle and start the express server.
- The built artefacts would be served by the express server.

---

## ❯ Docker

### Install Docker

Before you start, make sure you have a recent version of [Docker](https://docs.docker.com/engine/installation/) installed

### Build Docker image

```shell
docker build -t <your-image-name> .
```

### Run Docker image in container and map port

The port which runs your application inside Docker container is either configured as `PORT` property in your `.env` configuration file or passed to Docker container via environment variable `PORT`. Default port is `3000`.

#### Run image in detached mode

```shell
docker run -d -p <port-on-host>:<port-inside-docker-container> <your-image-name>
```

#### Run image in foreground mode

```shell
docker run -i -t -p <port-on-host>:<port-inside-docker-container> <your-image-name>
```

### Stop Docker container

#### Detached mode

```shell
docker stop <container-id>
```

You can get a list of all running Docker container and its ids by following command

```shell
docker images
```

#### Foreground mode

Go to console and press <CTRL> + C at any time.

### Docker environment variables

There are several options to configure your app inside a Docker container

#### project .env file

You can use `.env` file in project root folder which will be copied inside Docker image. If you want to change a property inside `.env` you have to rebuild your Docker image.

#### run options

You can also change app configuration by passing environment variables via `docker run` option `-e` or `--env`.

```shell
docker run --env DB_HOST=localhost -e DB_PORT=3306
```

#### environment file

Last but not least you can pass a config file to `docker run`.

```shell
docker run --env-file ./env.list
```

`env.list` example:

```
# this is a comment
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
```

---

## ❯ Related Projects

- [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)
- [react-boilerplate-typescript](https://github.com/Can-Sahin/react-boilerplate-typescript)
- [express-typescript-starter](https://github.com/nitishkr88/express-typescript-starter)

---

## ❯ License

[MIT](/LICENSE)

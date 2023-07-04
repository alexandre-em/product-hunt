# ProductHunt test app

## Installation

First, you have to save the .env file at the root of the project.

```
project
│   .env
│   generate_access_token.sh
│   package.json
│   README.md
│   ...
│
└───back
│   │   src
│   │   package.json
│   │   ...
│
└───front
    │   src
    │   package.json
    │   ...
```

Then you will need an `access token` to be able to call the PH API. To generate one please execute the shell script `generate_access_token.sh`

```sh
    $ chmod u+x ./generate_access_token.sh # give execution right if needed
    $ ./generate_access_token.sh
```

It will call the PH API with my application `KEY` and `SECRET` information to get the `access token` that will be automatically write on the `.env` file

## Run applications

### With Docker/Docker-compose

```sh
    $ docker-compose up -d --build
```

Then the front-end application will be available from [here](https://front.traefik.me) and the back-end from [here](https://back.traefik.me).
If you have one of these port busy (80 and $PORT defined in `.env` file), you can change the port mapping on the `docker-compose.yaml` file for the `front` and `.env` file for the `back` application

### Without Docker

```sh
    $ cd back && npm i && npm run start:dev
    $ cd ..
    $ cd front && yarn && yarn start
```

The front-end application will be available at the port 4200 : [here](http://localhost:4200)

## Front

### Test

To be able to launch the tests, make sure to have env var CHROME_BIN setted. For instance:

```sh
    $ export CHROME_BIN = '/absolute/path/to/org.chromium.Chromium/x86_64/stable/active/export/bin/org.chromium.Chromium'
```

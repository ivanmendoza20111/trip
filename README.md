# Trips

## Descripción

API para registrar viajes

## Dependencias

- [Git](https://git-scm.com/) Control Version
- [Docker](https://docs.docker.com/get-docker/) container and image manager
- [NodeJs](https://nodejs.org/) JavaScript runtime
- [NPM](https://www.npmjs.com/) package manager
- [Nest](https://nestjs.com/) framework

#### Clonar repositorio en su ordenador

**HTTPS:**

```bash
$ git clone https://github.com/ivanmendoza20111/trip.git
```

Luego debemos clonar el archivo **.env.example** a **.env**. Dentro de **.env** debemos definir la URL de nuestro **MONGO DB**


## Usar nuestro proyecto con Docker

```
$ docker-compose up -d --build
```

## Si no tienen Docker hay que hacer lo siguiente

## Instalación del Proyecto

```bash
$ npm install
```

## Para usar nuestra aplicación podemos correr en nuestro ordenador

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Para probar los Unit Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Uso del API
Para poder ver la documentacion de nuestra API vamos a la siguiente ruta en nuestro navegador:
```
http:localhost:3000/doc/
```

## License

Ivan Mendoza

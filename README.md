# Notifications Service - Clean Architecture

## Description

Application for sending notifications (email, sms, etc) using the CQRS pattern, clean architecture (DDD), clean code. Exposing an HTTP API / CLI / gRCP interface.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode (CLI Interface)
$ npm run start:prod send-email -e name@domain.com -n name -p "{\"NAME\":\"NombredeFerreteriaTEST\"}"
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Fernando Mahiler Chullo Mamani](https://pe.linkedin.com/in/fernando-mahiler-chullo-mamani/en)

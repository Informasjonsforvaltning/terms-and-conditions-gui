# FDK Terms and Conditions GUI

## Description

An interface for FDK terms and conditions.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

#### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run `npm start` to start local development server

#### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -t terms-and-conditions-gui .`
- Run the container using the following comand:
  - `docker run -d -p 8181:8080 -e ENV -e OIDC_ISSUER -e FDK_REGISTRATION_BASE_URI -e TERMS_AND_CONDITIONS_HOST terms-and-conditions-gui`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `ENV` - Environment
  - `development`
  - `production`
- `OIDC_ISSUER` - OIDC issuer URI
- `FDK_REGISTRATION_BASE_URI` - FDK registraion main page URL
- `TERMS_AND_CONDITIONS_HOST` - Terms and conditions API hostname
  
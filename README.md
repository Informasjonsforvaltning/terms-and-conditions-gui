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
  - `docker run -d -p 8181:8080 -e NAMESPACE -e OIDC_ISSUER -e FDK_REGISTRATION_BASE_URI -e TERMS_AND_CONDITIONS_HOST -e SEARCH_HOST -e ADMIN_GUI_HOST -e SKE_THEME_PROFILE terms-and-conditions-gui`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `NAMESPACE` - Environment namespace
  - `development`
  - `staging`
  - `demo`
  - `prod`
- `OIDC_ISSUER` - OIDC issuer URI
- `FDK_REGISTRATION_BASE_URI` - FDK registraion main page URL
- `TERMS_AND_CONDITIONS_HOST` - Terms and conditions API hostname
- `SEARCH_HOST` - FDK portal main page URL
- `ADMIN_GUI_HOST` - FDK admin main page URL
- `SKE_THEME_PROFILE` - comma-separated list of organization numbers

## Contributing

#### Branching Strategy

Whenever a new change is to be implemented, follow these steps:

- Create a new branch from the master branch
- Implement and commit changes
- Create a pull request for code review

#### Commits

This repository uses conventional commmit format. In order to commit, follow these steps:

- Stage files to be committed
- Run `npm run commit` script

Do not use `--no-verify` flag when making commits.

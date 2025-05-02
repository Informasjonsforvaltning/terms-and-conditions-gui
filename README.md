# Terms and Conditions GUI

## Description

A web application for accepting terms and conditions and part of the [registration solutions](https://catalog-portal.fellesdatakatalog.digdir.no/).

For a broader understanding of the system’s context, refer to the [architecture documentation](https://github.com/Informasjonsforvaltning/architecture-documentation) wiki. For more specific
context on this application, see the [Registration](https://github.com/Informasjonsforvaltning/architecture-documentation/wiki/Architecture-documentation#registration) subsystem section.

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) >=18.16
- [npm](https://www.npmjs.com/get-npm) >=10.2.3
- [Docker](https://www.docker.com/get-started)
- [docker-compose](https://docs.docker.com/compose/install/)

### Running locally (development)

Clone the repository:

```bash
git clone https://github.com/Informasjonsforvaltning/terms-and-conditions-gui.git
cd terms-and-conditions-gui
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

Go to http://localhost:8080

### Run locally using docker compose
```bash
docker compose up -d --build
```

Go to http://localhost:8181

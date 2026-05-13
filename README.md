# casework-task-ui

Frontend for the HMCTS caseworker task management system built with React, TypeScript and GOV.UK Design System.

## Stack

- React 18 / TypeScript
- GOV.UK Frontend
- Axios

## Running locally

```bash
npm install
npm start
```

Runs on `http://localhost:3000`

Requires the API running on `http://localhost:8001` — see [casework-task-api](https://github.com/kechyy/casework-task-api)

## Running with Docker

Start the API first:

```bash
cd casework-task-api
docker-compose up --build
```

Then start the frontend:

```bash
npm start
```

## Features

- Create, view, update and delete tasks
- Status tracking — To Do, In Progress, Done
- Overdue task detection
- GOV.UK Design System components
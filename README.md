# Accord Todo

A small todo app: a React frontend (Vite + TypeScript) served by a Node API.
Todos are kept in memory on the server.

Endpoints:

- `GET /health` returns `{ "status": "ok" }`
- `GET /api/info` returns hostname, uptime, and revision
- `GET | POST /api/todos`, `PATCH | DELETE /api/todos/:id`
- everything else serves the built frontend from `dist/`

Run it locally:

```
npm install
npm run build     # type-check and build the frontend into dist/
npm start         # serve API and frontend on http://localhost:3000
```

For frontend development with hot reload, run `npm run dev:api` in one terminal
and `npm run dev` in another. Vite proxies `/api` and `/health` to the API.

## Your task

Ship this app to Google Cloud Run in the `accord-sandbox` project, with the
cloud resources defined as infrastructure as code.

Confirm the app loads from the public URL and you can add a todo.

Stretch, if you have time: run the service under a dedicated service account with
the minimum roles it needs.

Use whatever tools you normally would, including AI assistants.

When you are done, be ready to walk through every resource you created and why.

## What you have

- Editor access to the `accord-sandbox` GCP project, granted to your Google account
- `gcloud` already authenticated on the interview machine, or your own laptop
- 45 minutes, then 15 minutes of walkthrough

## Notes

- Do not store anything sensitive in the project. It is wiped after the interview.

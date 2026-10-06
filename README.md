# Accord Status Service

A small Node HTTP service with two endpoints:

- `GET /` returns service metadata
- `GET /health` returns `{ "status": "ok" }`

Run it locally:

```
npm start
curl http://localhost:3000/health
```

## Your task

Ship this service to Google Cloud Run in the `accord-sandbox` project.

1. Containerize it. There is no Dockerfile. Write one.
2. Build the image and push it to the sandbox registry:
   `us-central1-docker.pkg.dev/accord-sandbox/interview/<your-name>`
   Build locally with Docker or remotely with Cloud Build, your choice.
3. Deploy it to Cloud Run as a service named `<your-name>-status`.
4. Run it under a dedicated service account with the minimum roles it needs.
5. Confirm `GET /health` works from the public URL.

Infrastructure as code (Terraform or Pulumi) is welcome but not required.
Use whatever tools you normally would, including AI assistants.

When you are done, be ready to walk through every resource you created and why.

## What you have

- Owner-free Editor access to `accord-sandbox`, granted to your Google account
- `gcloud` already authenticated on the interview machine, or your own laptop
- 45 minutes, then 15 minutes of walkthrough

## Notes

- Something about this app will not work as-is on Cloud Run. Finding and fixing it is part of the exercise.
- Do not store anything sensitive in the project. It is wiped after the interview.

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

Ship this service to Google Cloud Run in the `accord-sandbox` project, with the
cloud resources defined as infrastructure as code.

Confirm `GET /health` works from the public URL.

Stretch, if you have time: run the service under a dedicated service account with
the minimum roles it needs.

Use whatever tools you normally would, including AI assistants.

When you are done, be ready to walk through every resource you created and why.

## What you have

- Editor access to the `accord-sandbox` GCP project, granted to your Google account
- `gcloud` already authenticated on the interview machine, or your own laptop
- 45 minutes, then 15 minutes of walkthrough
- Terraform is on the interview machine; bring your own if you prefer Pulumi

## Notes

- Something about this app will not work as-is on Cloud Run. Finding and fixing it is part of the exercise.
- Do not store anything sensitive in the project. It is wiped after the interview.

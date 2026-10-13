# Rafi Ariq Maulana Portfolio

A responsive portfolio with Home, Services, and Contact pages. Contact messages
are validated and delivered over SMTP by the Express API server.

## Run in Replit

Start the **API Server** and **Rafi Ariq Maulana — Portfolio** workflows. The
site uses the shared `/api/contact` endpoint to deliver contact-form submissions.

For a standalone production run, build the site with
`pnpm --filter @workspace/rafi-portfolio run build`, then run
`pnpm --filter @workspace/rafi-portfolio run start`. The Express server reads
`PORT` and defaults to `3000`.

Provide the SMTP settings listed below in Replit Secrets/environment variables.
Keep local `.env` files private and never commit them.

## Required environment variables

- `SMTP_HOST` — SMTP server hostname
- `SMTP_PORT` — SMTP port (commonly `465` or `587`)
- `SMTP_USER` — SMTP account username
- `SMTP_PASS` — SMTP account password
- `CONTACT_TO` — destination email address for submissions

In Replit, add these using the project's environment variables and Secrets
settings; do not put credentials in source files.

## Files to replace

- `artifacts/rafi-portfolio/public/cv.pdf` — placeholder CV download
- Replace the neutral work and portrait placeholders in the portfolio with
  approved photos and project media.

# Current Form Backend Setup

The website must be deployed as a Cloudflare Worker, not as a static Pages
upload, because the intake forms need runtime bindings.

Use `WORKER-DEPLOYMENT.md` for the full deployment steps.

Current required bindings:

- D1 binding: `INTAKE_DB` connected to `ntuthukobiz_forms`
- R2 binding: `INTAKE_FILES` connected to `ntuthukobiz-intake-files`
- Static assets binding: `ASSETS` connected to `public/`

Email notifications are disabled for now. The Worker will still save form
submissions to D1 and uploaded documents to R2 when email secrets are not
configured.

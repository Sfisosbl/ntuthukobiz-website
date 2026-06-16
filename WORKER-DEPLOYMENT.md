# Deploy Ntuthuko Biz Connect As A Cloudflare Worker

This folder is no longer for Cloudflare Pages Direct Upload. It must be
deployed with Wrangler as a Cloudflare Worker so runtime bindings are accepted.

The existing website pages are copied into `site/` and are served as static
assets. `_worker.js` handles only `/api/intake` and then falls back to the
static site through `env.ASSETS.fetch(request)`.

## 1. Get the existing D1 database ID

In Cloudflare:

1. Open **Storage & Databases**.
2. Open **D1 SQL Database**.
3. Open `ntuthukobiz_forms`.
4. Copy the database ID.
5. Open `wrangler.toml` in this folder.
6. Replace:

```toml
database_id = "PASTE_NTUTHUKOBIZ_FORMS_DATABASE_ID_HERE"
```

with the real ID.

## 2. Confirm the R2 bucket exists

The Worker is configured for:

```toml
binding = "INTAKE_FILES"
bucket_name = "ntuthukobiz-intake-files"
```

No email secrets are required for now. Forms will save to D1 and R2 with
`notification: false`.

## 3. Apply the D1 schema if it has not already been applied

Open PowerShell in this folder:

```powershell
cd "C:\Users\arche\Documents\Codex\2026-06-06\chrome-navigate-to-https-www-godaddy\outputs\ntuthuko-biz-connect-cloudflare-corrected"
npx wrangler d1 execute ntuthukobiz_forms --remote --file .\cloudflare-intake-schema.sql
```

If Cloudflare says the tables already exist, that is fine.

## 4. Deploy as a Worker

Run this from the same folder:

```powershell
$env:NODE_OPTIONS="--use-system-ca"
npx wrangler deploy
```

If `npx` asks to install Wrangler, type `y`.

Wrangler reads `wrangler.toml`, deploys `_worker.js` as the Worker, and uploads
the static website from `site/`. This keeps Git internals, the Worker source
file, setup notes, and other non-website files out of the static asset upload.

If deploying through GitHub, these files must exist in the repository root:

- `wrangler.toml`
- `.assetsignore`
- `_worker.js`
- `site/`

The Cloudflare build command should be:

```text
npx wrangler deploy
```

The Cloudflare root directory should be:

```text
/
```

## 5. Cloudflare dashboard settings

After deployment:

1. Go to **Workers & Pages**.
2. Open the Worker named `ntuthukobiz-website`.
3. Go to **Settings**, then **Bindings**.
4. Confirm:
   - D1 database binding `INTAKE_DB` points to `ntuthukobiz_forms`.
   - R2 bucket binding `INTAKE_FILES` points to `ntuthukobiz-intake-files`.
   - Static Assets binding `ASSETS` is present.
5. Go to **Settings**, then **Domains & Routes**.
6. Add the custom domain `ntuthukobiz.co.za`.
7. Add `www.ntuthukobiz.co.za` too if you want the `www` version to work.

## 6. Test

Submit one harmless test form with a small image or PDF.

Then confirm D1:

```powershell
npx wrangler d1 execute ntuthukobiz_forms --remote --command "SELECT reference, created_at, service_name, full_name FROM intake_submissions ORDER BY created_at DESC LIMIT 5;"
```

Confirm the uploaded file in Cloudflare:

1. Open **R2 Object Storage**.
2. Open `ntuthukobiz-intake-files`.
3. Look for a date folder and the new submission ID.

## Important

Do not deploy this folder as a static Pages upload if you want forms to save.
Cloudflare Pages static assets alone will not keep the D1 and R2 runtime
bindings active for `_worker.js`.

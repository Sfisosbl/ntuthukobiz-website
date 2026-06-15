# Activate the client intake backend

The form pages are complete, but they deliberately show an error until secure storage and email notifications are configured. Do not advertise the forms as active before completing these steps.

## Required Cloudflare resources

1. Create a D1 database named `ntuthuko-intake`.
2. Run `cloudflare-intake-schema.sql` against that database.
3. Create a private R2 bucket named `ntuthuko-intake-files`.
4. In the deployed Pages/Workers project, add these bindings:
   - D1 binding: `INTAKE_DB`
   - R2 binding: `INTAKE_FILES`
5. Add these encrypted variables/secrets:
   - `RESEND_API_KEY`: API key from the Ntuthuko Biz Connect Resend account
   - `NOTIFICATION_FROM_EMAIL`: a verified sender such as `Ntuthuko Forms <forms@ntuthukobiz.co.za>`
6. Confirm that `ntuthukobiz.co.za` is verified in Resend and that notifications can be sent to `support@ntuthukobiz.co.za`.
7. Upload the rebuilt deployment ZIP and submit one harmless test form.
8. Confirm:
   - the browser displays a reference beginning with `NBC-`;
   - the D1 row exists;
   - uploaded test documents exist in the private R2 bucket;
   - the notification arrives at `support@ntuthukobiz.co.za`.

## Security notes

- Never place API keys in HTML or JavaScript files.
- Keep the R2 bucket private.
- Restrict Cloudflare dashboard access to authorised staff.
- Establish retention and deletion procedures before collecting real client documents.
- Do not ask clients to upload passwords, one-time PINs or banking login credentials.

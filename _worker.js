const MAX_FILES = 10;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png"]);

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function clean(value, max = 5000) {
  return String(value || "").trim().slice(0, max);
}

async function handleIntake(request, env) {
  if (!env.INTAKE_DB || !env.INTAKE_FILES) {
    return json({
      message: "Secure submissions are not active yet. The Cloudflare D1 and R2 bindings still need to be configured.",
      code: "INTAKE_BACKEND_NOT_CONFIGURED",
    }, 503);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
    return json({ message: "Expected a multipart form submission." }, 415);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ message: "The submitted form could not be read." }, 400);
  }

  const required = ["service_slug", "service_name", "full_name", "email", "phone", "business_name", "industry", "province", "support_request", "consent"];
  for (const field of required) {
    if (!clean(form.get(field))) return json({ message: `Please complete the required field: ${field.replaceAll("_", " ")}.` }, 400);
  }

  const files = form.getAll("documents").filter(value => value instanceof File && value.size);
  if (files.length > MAX_FILES) return json({ message: `Please upload no more than ${MAX_FILES} files.` }, 400);

  for (const file of files) {
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.has(extension)) return json({ message: `The file type for ${file.name} is not accepted.` }, 400);
    if (file.size > MAX_FILE_BYTES) return json({ message: `${file.name} is larger than 10 MB.` }, 400);
  }

  const id = crypto.randomUUID();
  const reference = `NBC-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${id.slice(0, 8).toUpperCase()}`;
  const createdAt = new Date().toISOString();
  const fields = {};

  for (const [key, value] of form.entries()) {
    if (!(value instanceof File)) fields[key] = clean(value);
  }

  try {
    await env.INTAKE_DB.prepare(
      `INSERT INTO intake_submissions
       (id, reference, created_at, service_slug, service_name, service_category, full_name, email, phone, business_name, status, payload_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`
    ).bind(
      id, reference, createdAt, fields.service_slug, fields.service_name, fields.service_category,
      fields.full_name, fields.email, fields.phone, fields.business_name, JSON.stringify(fields)
    ).run();

    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
      const objectKey = `${createdAt.slice(0, 10)}/${id}/${crypto.randomUUID()}-${safeName}`;
      await env.INTAKE_FILES.put(objectKey, file.stream(), {
        httpMetadata: { contentType: file.type || "application/octet-stream" },
        customMetadata: { submissionId: id, reference, originalName: file.name },
      });
      await env.INTAKE_DB.prepare(
        `INSERT INTO intake_files (id, submission_id, object_key, original_name, content_type, size_bytes)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(crypto.randomUUID(), id, objectKey, file.name, file.type || "", file.size).run();
    }
  } catch (error) {
    console.error("Intake persistence failed", error);
    return json({ message: "The secure storage service is not ready. Please contact support@ntuthukobiz.co.za." }, 503);
  }

  if (env.RESEND_API_KEY && env.NOTIFICATION_FROM_EMAIL) {
    try {
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          authorization: `Bearer ${env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: env.NOTIFICATION_FROM_EMAIL,
          to: ["support@ntuthukobiz.co.za"],
          reply_to: fields.email,
          subject: `${reference}: ${fields.service_name} intake`,
          text: [
            `New Ntuthuko Biz Connect client intake`,
            `Reference: ${reference}`,
            `Service: ${fields.service_name}`,
            `Client: ${fields.full_name}`,
            `Business: ${fields.business_name}`,
            `Email: ${fields.email}`,
            `Phone: ${fields.phone}`,
            `Files: ${files.length}`,
            ``,
            `Review the full record in the configured D1 database and R2 bucket.`,
          ].join("\n"),
        }),
      });

      if (!emailResponse.ok) {
        console.error("Submission saved but email notification failed", await emailResponse.text());
        return json({ reference, saved: true, notification: false }, 201);
      }

      return json({ reference, saved: true, notification: true }, 201);
    } catch (error) {
      console.error("Submission saved but email notification failed", error);
    }
  }

  return json({ reference, saved: true, notification: false }, 201);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/intake") {
      if (request.method !== "POST") return json({ message: "Method not allowed." }, 405);
      return handleIntake(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

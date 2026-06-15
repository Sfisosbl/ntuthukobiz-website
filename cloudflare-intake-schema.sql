CREATE TABLE IF NOT EXISTS intake_submissions (
  id TEXT PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL,
  service_slug TEXT NOT NULL,
  service_name TEXT NOT NULL,
  service_category TEXT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  payload_json TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_intake_created_at ON intake_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_intake_service_slug ON intake_submissions(service_slug);
CREATE INDEX IF NOT EXISTS idx_intake_status ON intake_submissions(status);

CREATE TABLE IF NOT EXISTS intake_files (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL,
  object_key TEXT NOT NULL UNIQUE,
  original_name TEXT NOT NULL,
  content_type TEXT,
  size_bytes INTEGER NOT NULL,
  FOREIGN KEY (submission_id) REFERENCES intake_submissions(id)
);

CREATE INDEX IF NOT EXISTS idx_intake_files_submission ON intake_files(submission_id);

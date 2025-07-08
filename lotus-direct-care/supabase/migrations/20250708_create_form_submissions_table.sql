CREATE TABLE IF NOT EXISTS form_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    preferred_contact TEXT,
    reason_for_visit TEXT,
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'new',
    CONSTRAINT unique_email UNIQUE (email)
);

-- Add comments to explain the purpose of the table and columns
COMMENT ON TABLE form_submissions IS 'Stores lead submissions from the website contact form.';
COMMENT ON COLUMN form_submissions.id IS 'Unique identifier for each submission.';
COMMENT ON COLUMN form_submissions.created_at IS 'Timestamp of when the submission was received.';
COMMENT ON COLUMN form_submissions.name IS 'Full name of the person submitting the form.';
COMMENT ON COLUMN form_submissions.email IS 'Email address of the person, used as a unique identifier.';
COMMENT ON COLUMN form_submissions.phone IS 'Phone number of the person.';
COMMENT ON COLUMN form_submissions.message IS 'The message or inquiry from the person.';
COMMENT ON COLUMN form_submissions.preferred_contact IS 'The preferred method of contact (e.g., email, phone).';
COMMENT ON COLUMN form_submissions.reason_for_visit IS 'The reason for the visit or inquiry.';
COMMENT ON COLUMN form_submissions.source IS 'The source of the lead (e.g., website, manual entry).';
COMMENT ON COLUMN form_submissions.status IS 'The current status of the lead (e.g., new, contacted, converted).';
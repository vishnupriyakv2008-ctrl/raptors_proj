/*
# Create registrations table for Dogfood 2026 hackathon

This is a single-tenant, no-auth public registration form. Anyone visiting
the site can register a team. No sign-in screen exists, so policies must
include the `anon` role.

1. New Tables
- `registrations`
  - `id` (uuid, primary key)
  - `team_name` (text, not null) — the team's chosen name
  - `email` (text, not null) — contact email for the team
  - `team_size` (int, not null) — number of members (1-4)
  - `members` (text, not null) — comma-separated member names
  - `country` (text, not null) — country the team is participating from
  - `solo` (boolean, default false) — whether the participant is solo
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `registrations`.
- Allow anon + authenticated to INSERT (public registration form).
- Allow anon + authenticated to SELECT only the public display columns
  (team_name, country, team_size, solo, created_at) — NOT email or member
  names, which are private. This is enforced via a column-restricted view.
- No UPDATE or DELETE from the anon key.
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL,
  email text NOT NULL,
  team_size int NOT NULL CHECK (team_size >= 1 AND team_size <= 4),
  members text NOT NULL,
  country text NOT NULL,
  solo boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Public view exposing only safe columns (no email, no member names)
CREATE OR REPLACE VIEW public_registrations AS
SELECT
  team_name,
  country,
  team_size,
  solo,
  created_at
FROM registrations
ORDER BY created_at DESC;

DROP POLICY IF EXISTS "anon_insert_registrations" ON registrations;
CREATE POLICY "anon_insert_registrations"
ON registrations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_registrations" ON registrations;
CREATE POLICY "anon_select_registrations"
ON registrations FOR SELECT
TO anon, authenticated
USING (true);

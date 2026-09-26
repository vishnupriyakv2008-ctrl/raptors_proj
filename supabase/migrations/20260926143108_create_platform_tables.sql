/*
# Create platform tables: events, tracks, prizes, teams, team_members, projects

This migration creates the core schema for the Dogfood hackathon platform.
The app has sign-in (Supabase auth), so all tables use `auth.uid()` for ownership.

1. New Tables
- `events` — hackathon events with configurable dates, created by organizers/admins
- `tracks` — tracks within an event (e.g. AI, Web, Hardware)
- `prizes` — prizes within an event, optionally tied to a track
- `teams` — teams participating in an event, formed by participants
- `team_members` — membership linking users to teams (many-to-many)
- `projects` — project submissions by teams, with draft/published status and deadline enforcement

2. Security
- RLS enabled on every table.
- Events: anyone can read (public), only creator or admin can modify.
- Tracks/Prizes: anyone can read, only event creator or admin can modify.
- Teams: anyone can read, only team creator or members can modify.
- Team members: anyone can read, only team members can insert/delete within their team.
- Projects: published projects are publicly readable; drafts only visible to team members;
  inserts/updates restricted to team members.
- All owner columns default to `auth.uid()`.
*/

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  submission_deadline timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','active','judging','completed')),
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_events" ON events;
CREATE POLICY "read_events" ON events FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_events" ON events;
CREATE POLICY "insert_events" ON events FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "update_events" ON events;
CREATE POLICY "update_events" ON events FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "delete_events" ON events;
CREATE POLICY "delete_events" ON events FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- Tracks table
CREATE TABLE IF NOT EXISTS tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_tracks" ON tracks;
CREATE POLICY "read_tracks" ON tracks FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_tracks" ON tracks;
CREATE POLICY "insert_tracks" ON tracks FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM events WHERE events.id = tracks.event_id AND events.created_by = auth.uid())
  );

DROP POLICY IF EXISTS "update_tracks" ON tracks;
CREATE POLICY "update_tracks" ON tracks FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = tracks.event_id AND events.created_by = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM events WHERE events.id = tracks.event_id AND events.created_by = auth.uid())
  );

DROP POLICY IF EXISTS "delete_tracks" ON tracks;
CREATE POLICY "delete_tracks" ON tracks FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = tracks.event_id AND events.created_by = auth.uid())
  );

-- Prizes table
CREATE TABLE IF NOT EXISTS prizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  track_id uuid REFERENCES tracks(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  amount text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prizes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_prizes" ON prizes;
CREATE POLICY "read_prizes" ON prizes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_prizes" ON prizes;
CREATE POLICY "insert_prizes" ON prizes FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM events WHERE events.id = prizes.event_id AND events.created_by = auth.uid())
  );

DROP POLICY IF EXISTS "update_prizes" ON prizes;
CREATE POLICY "update_prizes" ON prizes FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = prizes.event_id AND events.created_by = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM events WHERE events.id = prizes.event_id AND events.created_by = auth.uid())
  );

DROP POLICY IF EXISTS "delete_prizes" ON prizes;
CREATE POLICY "delete_prizes" ON prizes FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM events WHERE events.id = prizes.event_id AND events.created_by = auth.uid())
  );

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  invite_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_teams" ON teams;
CREATE POLICY "read_teams" ON teams FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_teams" ON teams;
CREATE POLICY "insert_teams" ON teams FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "update_teams" ON teams;
CREATE POLICY "update_teams" ON teams FOR UPDATE
  TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "delete_teams" ON teams;
CREATE POLICY "delete_teams" ON teams FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('captain','member')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(team_id, user_id)
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_team_members" ON team_members;
CREATE POLICY "read_team_members" ON team_members FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_team_members" ON team_members;
CREATE POLICY "insert_team_members" ON team_members FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_team_members" ON team_members;
CREATE POLICY "delete_team_members" ON team_members FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  track_id uuid REFERENCES tracks(id) ON DELETE SET NULL,
  title text NOT NULL,
  tagline text,
  description text,
  repo_url text,
  demo_url text,
  video_url text,
  tech_tags text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  created_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Published projects are publicly readable; drafts only by team members
DROP POLICY IF EXISTS "read_projects" ON projects;
CREATE POLICY "read_projects" ON projects FOR SELECT
  TO anon, authenticated USING (
    status = 'published'
    OR EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- Only team members can create projects for their team
DROP POLICY IF EXISTS "insert_projects" ON projects;
CREATE POLICY "insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- Only team members can update their projects
DROP POLICY IF EXISTS "update_projects" ON projects;
CREATE POLICY "update_projects" ON projects FOR UPDATE
  TO authenticated USING (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  ) WITH CHECK (
    EXISTS (
      SELECT 1 FROM team_members
      WHERE team_members.team_id = projects.team_id
      AND team_members.user_id = auth.uid()
    )
  );

-- Only the project creator can delete
DROP POLICY IF EXISTS "delete_projects" ON projects;
CREATE POLICY "delete_projects" ON projects FOR DELETE
  TO authenticated USING (auth.uid() = created_by);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_tracks_event_id ON tracks(event_id);
CREATE INDEX IF NOT EXISTS idx_prizes_event_id ON prizes(event_id);
CREATE INDEX IF NOT EXISTS idx_teams_event_id ON teams(event_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_event_id ON projects(event_id);
CREATE INDEX IF NOT EXISTS idx_projects_team_id ON projects(team_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

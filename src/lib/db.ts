import { PGlite } from '@electric-sql/pglite';

let dbInstance: PGlite | null = null;
let initPromise: Promise<PGlite> | null = null;

export async function getDb(): Promise<PGlite> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const db = new PGlite('idb://dogfood-portal');

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'participant',
        created_at TEXT DEFAULT (now()::text)
      );

      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        submission_deadline TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'upcoming',
        created_by TEXT NOT NULL,
        created_at TEXT DEFAULT (now()::text)
      );

      CREATE TABLE IF NOT EXISTS tracks (
        id TEXT PRIMARY KEY,
        event_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        created_at TEXT DEFAULT (now()::text)
      );

      CREATE TABLE IF NOT EXISTS prizes (
        id TEXT PRIMARY KEY,
        event_id TEXT NOT NULL,
        track_id TEXT,
        name TEXT NOT NULL,
        description TEXT,
        amount TEXT,
        created_at TEXT DEFAULT (now()::text)
      );

      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        event_id TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        invite_token TEXT NOT NULL UNIQUE,
        created_by TEXT NOT NULL,
        created_at TEXT DEFAULT (now()::text)
      );

      CREATE TABLE IF NOT EXISTS team_members (
        id TEXT PRIMARY KEY,
        team_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'member',
        joined_at TEXT DEFAULT (now()::text),
        UNIQUE(team_id, user_id)
      );

      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        event_id TEXT NOT NULL,
        team_id TEXT NOT NULL,
        track_id TEXT,
        title TEXT NOT NULL,
        tagline TEXT,
        description TEXT,
        repo_url TEXT,
        demo_url TEXT,
        video_url TEXT,
        tech_tags TEXT[] DEFAULT '{}',
        status TEXT NOT NULL DEFAULT 'draft',
        created_by TEXT NOT NULL,
        created_at TEXT DEFAULT (now()::text),
        updated_at TEXT DEFAULT (now()::text)
      );

      CREATE TABLE IF NOT EXISTS registrations (
        id TEXT PRIMARY KEY,
        team_name TEXT NOT NULL,
        email TEXT NOT NULL,
        team_size INTEGER NOT NULL DEFAULT 1,
        members TEXT NOT NULL,
        country TEXT NOT NULL,
        solo BOOLEAN NOT NULL DEFAULT false,
        created_at TEXT DEFAULT (now()::text)
      );
    `);

    // Seed data — only if events table is empty
    const { rows: existing } = await db.query('SELECT count(*) as cnt FROM events');
    if (existing[0].cnt === 0) {
      const now = new Date();
      const iso = (d: Date) => d.toISOString();
      const futureDate = (days: number) => iso(new Date(now.getTime() + days * 86400000));

      const seedUsers = [
        ['u-organizer', 'organizer@dogfood.dev', 'hash-admin', 'organizer'],
        ['u-participant1', 'alice@dogfood.dev', 'hash-alice', 'participant'],
        ['u-participant2', 'bob@dogfood.dev', 'hash-bob', 'participant'],
        ['u-judge1', 'judge@dogfood.dev', 'hash-judge', 'judge'],
      ];
      for (const u of seedUsers) {
        await db.query(`INSERT INTO users (id, email, password_hash, role) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, u);
      }

      await db.query(
        `INSERT INTO events (id, title, description, start_date, end_date, submission_deadline, status, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT DO NOTHING`,
        ['evt-1', 'Dogfood 2026', 'The self-hostable hackathon platform competition.', futureDate(-1), futureDate(2), futureDate(3), 'active', 'u-organizer']
      );

      await db.query(`INSERT INTO tracks (id, event_id, name, description) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, ['trk-1', 'evt-1', 'AI/ML', 'Machine learning and AI tools']);
      await db.query(`INSERT INTO tracks (id, event_id, name, description) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, ['trk-2', 'evt-1', 'Web', 'Web frameworks and frontends']);
      await db.query(`INSERT INTO tracks (id, event_id, name, description) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, ['trk-3', 'evt-1', 'Developer Tools', 'Tooling for developers']);

      await db.query(`INSERT INTO prizes (id, event_id, name, description, amount) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`, ['prz-1', 'evt-1', 'Best in Show', 'Overall best project', '$5,000']);
      await db.query(`INSERT INTO prizes (id, event_id, name, description, amount) VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`, ['prz-2', 'evt-1', 'Best AI/ML', 'Best AI/ML project', '$2,000']);

      await db.query(`INSERT INTO teams (id, event_id, name, description, invite_token, created_by) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`, ['tm-1', 'evt-1', 'The Raptors', 'Building a hackathon portal', 'invite-raptors-2026', 'u-participant1']);
      await db.query(`INSERT INTO team_members (id, team_id, user_id, role) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, ['tmem-1', 'tm-1', 'u-participant1', 'captain']);
      await db.query(`INSERT INTO team_members (id, team_id, user_id, role) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING`, ['tmem-2', 'tm-1', 'u-participant2', 'member']);

      await db.query(
        `INSERT INTO projects (id, event_id, team_id, track_id, title, tagline, description, repo_url, demo_url, video_url, tech_tags, status, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) ON CONFLICT DO NOTHING`,
        ['prj-1', 'evt-1', 'tm-1', 'trk-2', 'Dogfood Portal', 'A self-hostable hackathon platform', 'Runs offline with docker compose up. No cloud dependencies.', 'https://github.com/demo/dogfood-portal', 'https://demo.dev', '', ['React', 'TypeScript', 'PGlite'], 'published', 'u-participant1']
      );

      await db.query(`INSERT INTO registrations (id, team_name, email, team_size, members, country, solo) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING`, ['reg-1', 'The Raptors', 'alice@dogfood.dev', 2, 'Alice, Bob', 'United Kingdom', false]);
      await db.query(`INSERT INTO registrations (id, team_name, email, team_size, members, country, solo) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING`, ['reg-2', 'Solo Coder', 'solo@dogfood.dev', 1, 'Jane Doe', 'Germany', true]);
    }

    dbInstance = db;
    return db;
  })();

  return initPromise;
}

// Simple hash for demo auth — NOT for production, but this is a self-hosted demo
export function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'hash-' + Math.abs(hash).toString(36);
}

export function genId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function genToken(): string {
  return Math.random().toString(36).slice(2, 18);
}

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getDb, genId, genToken } from '@/lib/db';
import { Calendar, Plus, Users, FolderGit2, Search, Filter, Clock, ExternalLink, Copy, Check, Github, Video, Tag, AlertCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  submission_deadline: string;
  status: string;
}

interface Team {
  id: string;
  name: string;
  description: string | null;
  invite_token: string;
  event_id: string;
}

interface Project {
  id: string;
  title: string;
  tagline: string | null;
  description: string | null;
  repo_url: string | null;
  demo_url: string | null;
  video_url: string | null;
  tech_tags: string[];
  status: string;
  team_id: string;
  track_id: string | null;
}

interface Track {
  id: string;
  name: string;
  event_id: string;
}

type View = 'overview' | 'events' | 'teams' | 'submit' | 'gallery';

export default function Platform({ onSignInClick }: { onSignInClick: () => void }) {
  const { user, role } = useAuth();
  const [view, setView] = useState<View>('overview');
  const [events, setEvents] = useState<Event[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [gallerySearch, setGallerySearch] = useState('');
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    const db = await getDb();
    const { rows } = await db.query('SELECT * FROM events ORDER BY created_at DESC');
    setEvents(rows as Event[]);
  }

  async function fetchTeams(eventId: string) {
    const db = await getDb();
    const { rows } = await db.query('SELECT * FROM teams WHERE event_id = $1 ORDER BY created_at DESC', [eventId]);
    setTeams(rows as Team[]);
  }

  async function fetchProjects(eventId: string) {
    const db = await getDb();
    const { rows } = await db.query('SELECT * FROM projects WHERE event_id = $1 ORDER BY created_at DESC', [eventId]);
    setProjects(rows as Project[]);
  }

  async function fetchTracks(eventId: string) {
    const db = await getDb();
    const { rows } = await db.query('SELECT * FROM tracks WHERE event_id = $1', [eventId]);
    setTracks(rows as Track[]);
  }

  function selectEvent(eventId: string) {
    setSelectedEventId(eventId);
    fetchTeams(eventId);
    fetchProjects(eventId);
    fetchTracks(eventId);
  }

  function copyInvite(token: string) {
    const url = `${window.location.origin}?join=${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  }

  if (!user) {
    return (
      <section className="relative py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-2xl p-10 md:p-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Access the Platform</h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Sign in to create events, form teams, submit projects, and browse the gallery. The
              full hackathon lifecycle — from registration through results.
            </p>
            <button
              onClick={onSignInClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-cyan-400 transition-all"
            >
              Sign In or Create Account
            </button>
          </div>
        </div>
      </section>
    );
  }

  const navItems: { key: View; label: string; icon: typeof Calendar }[] = [
    { key: 'overview', label: 'Overview', icon: Calendar },
    { key: 'events', label: 'Events', icon: Plus },
    { key: 'teams', label: 'Teams', icon: Users },
    { key: 'submit', label: 'Submit', icon: FolderGit2 },
    { key: 'gallery', label: 'Gallery', icon: Search },
  ];

  return (
    <section id="platform" className="relative py-20 px-6">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-cyan-400 tracking-widest">// THE PLATFORM</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-3">
            Hackathon <span className="text-gradient">Control Center</span>
          </h2>
        </div>

        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  view === item.key
                    ? 'bg-white text-black'
                    : 'glass text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* OVERVIEW */}
        {view === 'overview' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Events', value: events.length, icon: Calendar },
              { label: 'Teams', value: teams.length, icon: Users },
              { label: 'Projects', value: projects.length, icon: FolderGit2 },
              { label: 'Published', value: projects.filter(p => p.status === 'published').length, icon: Check },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="glass rounded-xl p-6 text-center">
                  <Icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
            <div className="sm:col-span-2 lg:col-span-4 glass rounded-xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Your Role: <span className="text-cyan-400 font-mono capitalize">{role}</span></h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {role === 'organizer' && 'You can create events, manage tracks and prizes, and oversee the entire lifecycle.'}
                {role === 'participant' && 'You can join teams via invite links, submit projects, and browse the public gallery.'}
                {role === 'visitor' && 'Sign in to access platform features.'}
              </p>
            </div>
          </div>
        )}

        {/* EVENTS */}
        {view === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Events</h3>
              <button
                onClick={() => setShowCreateEvent(!showCreateEvent)}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-cyan-400 transition-all"
              >
                <Plus className="w-4 h-4" /> Create Event
              </button>
            </div>

            {showCreateEvent && <CreateEventForm userId={user.id} onCreated={() => { fetchEvents(); setShowCreateEvent(false); }} />}

            {events.length === 0 ? (
              <div className="glass rounded-xl p-10 text-center text-zinc-500">
                <Calendar className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No events yet. Create one to get started.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => { selectEvent(event.id); setView('teams'); }}
                    className="glass rounded-xl p-6 cursor-pointer hover:border-cyan-400/20 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors">{event.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        event.status === 'active' ? 'bg-lime-500/10 text-lime-400' :
                        event.status === 'upcoming' ? 'bg-cyan-500/10 text-cyan-400' :
                        event.status === 'judging' ? 'bg-orange-500/10 text-orange-400' :
                        'bg-zinc-500/10 text-zinc-400'
                      }`}>{event.status}</span>
                    </div>
                    {event.description && <p className="text-sm text-zinc-500 mb-3 line-clamp-2">{event.description}</p>}
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(event.start_date).toLocaleDateString()} → {new Date(event.end_date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-3 text-xs font-mono text-orange-400/70">
                      Deadline: {new Date(event.submission_deadline).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TEAMS */}
        {view === 'teams' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Teams {selectedEventId && `· ${events.find(e => e.id === selectedEventId)?.title}`}</h3>
              <button
                onClick={() => setShowCreateTeam(!showCreateTeam)}
                disabled={!selectedEventId}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-cyan-400 transition-all disabled:opacity-40"
              >
                <Plus className="w-4 h-4" /> Create Team
              </button>
            </div>

            {!selectedEventId && (
              <div className="glass rounded-xl p-6 text-center text-sm text-zinc-500 mb-6">
                Select an event first to view and create teams.
              </div>
            )}

            {showCreateTeam && selectedEventId && (
              <CreateTeamForm eventId={selectedEventId} userId={user.id} onCreated={() => { fetchTeams(selectedEventId); setShowCreateTeam(false); }} />
            )}

            {teams.length === 0 && selectedEventId ? (
              <div className="glass rounded-xl p-10 text-center text-zinc-500">
                <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No teams yet. Create one and share the invite link.
              </div>
            ) : (
              <div className="space-y-3">
                {teams.map((team) => (
                  <div key={team.id} className="glass rounded-xl p-5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{team.name}</h4>
                      {team.description && <p className="text-xs text-zinc-500 mt-1">{team.description}</p>}
                    </div>
                    <button
                      onClick={() => copyInvite(team.invite_token)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30 border border-white/10 hover:border-cyan-400/20 transition-all text-xs font-mono"
                    >
                      {copiedToken === team.invite_token ? (
                        <><Check className="w-3.5 h-3.5 text-lime-400" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5 text-cyan-400" /> Invite Link</>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBMIT */}
        {view === 'submit' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Project Submission</h3>
              <button
                onClick={() => setShowSubmit(!showSubmit)}
                disabled={!selectedEventId}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-cyan-400 transition-all disabled:opacity-40"
              >
                <Plus className="w-4 h-4" /> New Submission
              </button>
            </div>

            {!selectedEventId && (
              <div className="glass rounded-xl p-6 text-center text-sm text-zinc-500 mb-6">
                Select an event to submit a project.
              </div>
            )}

            {selectedEventId && (() => {
              const evt = events.find(e => e.id === selectedEventId);
              const deadlinePassed = evt && new Date(evt.submission_deadline) < new Date();
              if (deadlinePassed) {
                return (
                  <div className="glass rounded-xl p-6 border-l-2 border-red-400/40 mb-6 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-white font-medium">Submission deadline has passed.</p>
                      <p className="text-xs text-zinc-500 mt-1">The deadline was {new Date(evt!.submission_deadline).toLocaleString()}. No new submissions or edits are accepted.</p>
                    </div>
                  </div>
                );
              }
              return null;
            })()}

            {showSubmit && selectedEventId && (
              <SubmitProjectForm
                eventId={selectedEventId}
                userId={user.id}
                teams={teams}
                tracks={tracks}
                deadlinePassed={!!(events.find(e => e.id === selectedEventId) && new Date(events.find(e => e.id === selectedEventId)!.submission_deadline) < new Date())}
                onSubmitted={() => { fetchProjects(selectedEventId); setShowSubmit(false); }}
              />
            )}

            {projects.length === 0 && selectedEventId ? (
              <div className="glass rounded-xl p-10 text-center text-zinc-500">
                <FolderGit2 className="w-8 h-8 mx-auto mb-3 opacity-30" />
                No projects yet. Submit one before the deadline.
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map((project) => (
                  <div key={project.id} className="glass rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{project.title}</h4>
                        {project.tagline && <p className="text-xs text-zinc-500 mt-1">{project.tagline}</p>}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        project.status === 'published' ? 'bg-lime-500/10 text-lime-400' : 'bg-orange-500/10 text-orange-400'
                      }`}>{project.status}</span>
                    </div>
                    {project.description && <p className="text-xs text-zinc-400 leading-relaxed mb-3">{project.description}</p>}
                    <div className="flex flex-wrap gap-3 text-xs">
                      {project.repo_url && <a href={project.repo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-400 hover:underline"><Github className="w-3.5 h-3.5" /> Repo</a>}
                      {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-400 hover:underline"><ExternalLink className="w-3.5 h-3.5" /> Demo</a>}
                      {project.video_url && <a href={project.video_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-400 hover:underline"><Video className="w-3.5 h-3.5" /> Video</a>}
                      {project.tech_tags.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-zinc-600" />
                          {project.tech_tags.map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 text-[10px] font-mono">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* GALLERY */}
        {view === 'gallery' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={gallerySearch}
                  onChange={(e) => setGallerySearch(e.target.value)}
                  placeholder="Search projects by title, tagline, or tech..."
                  className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-zinc-500" />
                <select
                  value={galleryFilter}
                  onChange={(e) => setGalleryFilter(e.target.value)}
                  className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-cyan-400/50 focus:outline-none"
                >
                  <option value="all">All Tracks</option>
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {(() => {
              const filtered = projects.filter((p) => {
                if (p.status !== 'published') return false;
                if (galleryFilter !== 'all' && p.track_id !== galleryFilter) return false;
                if (gallerySearch) {
                  const q = gallerySearch.toLowerCase();
                  return (
                    p.title.toLowerCase().includes(q) ||
                    (p.tagline?.toLowerCase().includes(q) ?? false) ||
                    p.tech_tags.some((t) => t.toLowerCase().includes(q))
                  );
                }
                return true;
              });

              if (filtered.length === 0) {
                return (
                  <div className="glass rounded-xl p-10 text-center text-zinc-500">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    No published projects match your search.
                  </div>
                );
              }

              return (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((project) => (
                    <div key={project.id} className="glass rounded-xl p-5 hover:bg-white/[0.06] transition-all group">
                      <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">{project.title}</h4>
                      {project.tagline && <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{project.tagline}</p>}
                      {project.tech_tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tech_tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded bg-cyan-500/5 text-cyan-400/70 text-[10px] font-mono">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-xs">
                        {project.repo_url && <a href={project.repo_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-cyan-400"><Github className="w-3.5 h-3.5" /></a>}
                        {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-cyan-400"><ExternalLink className="w-3.5 h-3.5" /></a>}
                        {project.video_url && <a href={project.video_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-cyan-400"><Video className="w-3.5 h-3.5" /></a>}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
}

// --- Create Event Form ---
function CreateEventForm({ userId, onCreated }: { userId: string; onCreated: () => void }) {
  const [form, setForm] = useState({
    title: '', description: '', start_date: '', end_date: '', submission_deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const db = await getDb();
      await db.query(
        'INSERT INTO events (id, title, description, start_date, end_date, submission_deadline, status, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [genId('evt'), form.title, form.description || null, new Date(form.start_date).toISOString(), new Date(form.end_date).toISOString(), new Date(form.submission_deadline).toISOString(), 'upcoming', userId]
      );
      setLoading(false);
      onCreated();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass rounded-xl p-6 mb-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input required placeholder="Event title" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
          className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
        <input placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})}
          className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">Start Date</label>
          <input type="datetime-local" required value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-cyan-400/50 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">End Date</label>
          <input type="datetime-local" required value={form.end_date} onChange={e => setForm({...form, end_date: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-cyan-400/50 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">Submission Deadline</label>
          <input type="datetime-local" required value={form.submission_deadline} onChange={e => setForm({...form, submission_deadline: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-cyan-400/50 focus:outline-none" />
        </div>
      </div>
      {error && <div className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-2">{error}</div>}
      <button type="submit" disabled={loading} className="px-5 py-2.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all disabled:opacity-50">
        {loading ? 'Creating...' : 'Create Event'}
      </button>
    </form>
  );
}

// --- Create Team Form ---
function CreateTeamForm({ eventId, userId, onCreated }: { eventId: string; userId: string; onCreated: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const db = await getDb();
      const teamId = genId('tm');
      await db.query(
        'INSERT INTO teams (id, event_id, name, description, invite_token, created_by) VALUES ($1, $2, $3, $4, $5, $6)',
        [teamId, eventId, name, description || null, genToken(), userId]
      );
      await db.query(
        'INSERT INTO team_members (id, team_id, user_id, role) VALUES ($1, $2, $3, $4)',
        [genId('tmem'), teamId, userId, 'captain']
      );
      setLoading(false);
      onCreated();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass rounded-xl p-6 mb-6 space-y-4">
      <input required placeholder="Team name" value={name} onChange={e => setName(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
      <input placeholder="Team description (optional)" value={description} onChange={e => setDescription(e.target.value)}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
      {error && <div className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-2">{error}</div>}
      <button type="submit" disabled={loading} className="px-5 py-2.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all disabled:opacity-50">
        {loading ? 'Creating...' : 'Create Team'}
      </button>
    </form>
  );
}

// --- Submit Project Form ---
function SubmitProjectForm({ eventId, userId, teams, tracks, deadlinePassed, onSubmitted }: {
  eventId: string; userId: string; teams: Team[]; tracks: Track[]; deadlinePassed: boolean; onSubmitted: () => void;
}) {
  const [form, setForm] = useState({
    title: '', tagline: '', description: '', repo_url: '', demo_url: '', video_url: '', tech_tags: '', team_id: '', track_id: '', status: 'draft',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const db = await getDb();
      const tags = form.tech_tags ? form.tech_tags.split(',').map(t => t.trim()).filter(Boolean) : [];
      await db.query(
        `INSERT INTO projects (id, event_id, team_id, track_id, title, tagline, description, repo_url, demo_url, video_url, tech_tags, status, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        [genId('prj'), eventId, form.team_id, form.track_id || null, form.title, form.tagline || null, form.description || null, form.repo_url || null, form.demo_url || null, form.video_url || null, tags, form.status, userId]
      );
      setLoading(false);
      onSubmitted();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  if (deadlinePassed) {
    return <div className="glass rounded-xl p-4 border-l-2 border-red-400/40 text-sm text-red-300">The submission deadline has passed.</div>;
  }

  return (
    <form onSubmit={submit} className="glass rounded-xl p-6 mb-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input required placeholder="Project title" value={form.title} onChange={e => setForm({...form, title: e.target.value})}
          className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
        <input placeholder="Tagline (one-liner)" value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})}
          className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
      </div>
      <textarea placeholder="Project description" value={form.description} onChange={e => setForm({...form, description: e.target.value})}
        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none min-h-[80px]" />
      <div className="grid md:grid-cols-3 gap-4">
        <input placeholder="Repo URL" value={form.repo_url} onChange={e => setForm({...form, repo_url: e.target.value})}
          className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
        <input placeholder="Demo URL" value={form.demo_url} onChange={e => setForm({...form, demo_url: e.target.value})}
          className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
        <input placeholder="Video URL" value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})}
          className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">Team</label>
          <select required value={form.team_id} onChange={e => setForm({...form, team_id: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-cyan-400/50 focus:outline-none">
            <option value="">Select team...</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">Track (optional)</label>
          <select value={form.track_id} onChange={e => setForm({...form, track_id: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:border-cyan-400/50 focus:outline-none">
            <option value="">No track</option>
            {tracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">Tech tags (comma-sep)</label>
          <input placeholder="React, Python, Docker" value={form.tech_tags} onChange={e => setForm({...form, tech_tags: e.target.value})}
            className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400/50 focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-mono text-zinc-400 mb-1.5">Status</label>
        <div className="flex gap-3">
          <button type="button" onClick={() => setForm({...form, status: 'draft'})}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${form.status === 'draft' ? 'bg-orange-500/20 text-orange-300 border border-orange-400/40' : 'bg-black/20 text-zinc-500 border border-white/5'}`}>
            Save as Draft
          </button>
          <button type="button" onClick={() => setForm({...form, status: 'published'})}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${form.status === 'published' ? 'bg-lime-500/20 text-lime-300 border border-lime-400/40' : 'bg-black/20 text-zinc-500 border border-white/5'}`}>
            Publish
          </button>
        </div>
      </div>
      {error && <div className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-2">{error}</div>}
      <button type="submit" disabled={loading} className="px-5 py-2.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all disabled:opacity-50">
        {loading ? 'Submitting...' : 'Submit Project'}
      </button>
    </form>
  );
}

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getDb, simpleHash, genId } from '@/lib/db';

type Role = 'visitor' | 'participant' | 'judge' | 'organizer' | 'admin';

interface AppUser {
  id: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  role: Role;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: 'visitor',
  signIn: async () => ({ error: 'not implemented' }),
  signUp: async () => ({ error: 'not implemented' }),
  signOut: async () => {},
});

const STORAGE_KEY = 'dogfood-auth-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role>('visitor');

  useEffect(() => {
    (async () => {
      try {
        await getDb();
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as AppUser;
          setUser(parsed);
          setRole(parsed.role);
        }
      } catch {
        // ignore
      }
      setLoading(false);
    })();
  }, []);

  async function signIn(email: string, password: string) {
    const db = await getDb();
    const { rows } = await db.query(
      'SELECT id, email, role, password_hash FROM users WHERE email = $1',
      [email.toLowerCase()]
    );
    if (rows.length === 0) {
      return { error: 'No account found with that email.' };
    }
    const row = rows[0];
    if (row.password_hash !== simpleHash(password)) {
      return { error: 'Incorrect password.' };
    }
    const appUser: AppUser = { id: row.id, email: row.email, role: row.role as Role };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
    setUser(appUser);
    setRole(appUser.role);
    return { error: null };
  }

  async function signUp(email: string, password: string) {
    const db = await getDb();
    const lowerEmail = email.toLowerCase();
    const { rows } = await db.query('SELECT id FROM users WHERE email = $1', [lowerEmail]);
    if (rows.length > 0) {
      return { error: 'An account with that email already exists.' };
    }
    const id = genId('u');
    await db.query(
      'INSERT INTO users (id, email, password_hash, role) VALUES ($1, $2, $3, $4)',
      [id, lowerEmail, simpleHash(password), 'participant']
    );
    const appUser: AppUser = { id, email: lowerEmail, role: 'participant' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appUser));
    setUser(appUser);
    setRole('participant');
    return { error: null };
  }

  async function signOut() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setRole('visitor');
  }

  return (
    <AuthContext.Provider value={{ user, loading, role, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

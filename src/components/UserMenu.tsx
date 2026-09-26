import { useAuth } from '@/context/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function UserMenu({ onSignInClick }: { onSignInClick: () => void }) {
  const { user, signOut, role } = useAuth();

  if (!user) {
    return (
      <button
        onClick={onSignInClick}
        className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-orange-500/30 flex items-center justify-center">
          <User className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xs text-white truncate max-w-[120px]">{user.email}</span>
          <span className="text-[10px] font-mono text-cyan-400 uppercase">{role}</span>
        </div>
      </div>
      <button
        onClick={signOut}
        className="p-2 text-zinc-400 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}

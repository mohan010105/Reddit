import { motion } from "framer-motion";
import { Trophy, Star, Zap, Flame, Crown } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface BadgeProps {
  id: string;
  name: string;
  icon: string;
  unlocked?: boolean;
}

export function AchievementBadge({ name, icon, unlocked = false }: BadgeProps) {
  return (
    <motion.div
      whileHover={unlocked ? { scale: 1.1, rotate: 5 } : {}}
      className={`relative p-3 rounded-2xl flex flex-col items-center gap-2 transition-all ${
        unlocked 
          ? "bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5" 
          : "bg-muted/50 border border-border grayscale opacity-40"
      }`}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-center">{name}</span>
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-4 h-4 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
}

export function KarmaWidget({ karma }: { karma: number }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
        <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">Your Karma</p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-2xl font-black">{karma.toLocaleString()}</h2>
          <span className="text-[10px] text-emerald-500 font-bold">+12 today</span>
        </div>
      </div>
    </div>
  );
}

export function StreakWidget({ streak }: { streak: number }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${streak > 0 ? "bg-rose-500/10" : "bg-muted"}`}>
        <Flame className={`w-6 h-6 ${streak > 0 ? "text-rose-500 fill-rose-500" : "text-muted-foreground"}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">Daily Streak</p>
        <h2 className="text-2xl font-black">{streak} Days</h2>
      </div>
    </div>
  );
}

export function Leaderboard({ users }: { users: any[] }) {
  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm flex items-center gap-2 px-1">
        <Trophy className="w-4 h-4 text-primary" /> Community Legends
      </h3>
      <motion.div {...staggerContainer} className="space-y-1">
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            {...staggerItem}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <span className="w-5 text-xs font-black text-muted-foreground">#{i + 1}</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold uppercase">
              {user.username[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">u/{user.username}</p>
              <p className="text-[10px] text-muted-foreground">{user.karma.toLocaleString()} karma</p>
            </div>
            {i === 0 && <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

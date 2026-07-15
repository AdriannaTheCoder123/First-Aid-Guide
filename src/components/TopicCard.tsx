import { FirstAidTopic } from '../types';
import {
  Flame,
  FlameKindling,
  HeartPulse,
  Droplets,
  Skull,
  Activity,
  Sun,
  Bug,
  ShieldAlert,
  UserRoundX
} from 'lucide-react';

interface TopicCardProps {
  key?: string;
  topic: FirstAidTopic;
  isSelected: boolean;
  onSelect: () => void;
}

export default function TopicCard({ topic, isSelected, onSelect }: TopicCardProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'UserRoundX':
        return <UserRoundX className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Bandage':
        return <FlameKindling className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Skull':
        return <Skull className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Bug':
        return <Bug className="w-5 h-5" />;
      default:
        return <ShieldAlert className="w-5 h-5" />;
    }
  };

  const getSeverityBadgeColor = (severity: typeof topic.severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200/50';
      case 'moderate':
        return 'bg-amber-50 text-amber-700 border-amber-200/50';
      case 'mild':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/50';
    }
  };

  const getIconContainerColor = (severity: typeof topic.severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-600';
      case 'moderate':
        return 'bg-amber-500/10 text-amber-600';
      case 'mild':
        return 'bg-emerald-500/10 text-emerald-600';
      default:
        return 'bg-slate-500/10 text-slate-600';
    }
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-40 relative overflow-hidden group select-none ${
        isSelected
          ? 'bg-rose-600 border-rose-600 shadow-xl shadow-rose-250 text-white'
          : 'bg-white border-slate-200/85 hover:border-slate-300 hover:bg-slate-50/50 text-slate-800 shadow-sm hover:shadow-md'
      }`}
      id={`topic-card-${topic.id}`}
    >
      {/* Background soft glow when selected */}
      {isSelected && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      )}

      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className={`p-2.5 rounded-xl transition-all ${
            isSelected ? 'bg-rose-700 text-white' : getIconContainerColor(topic.severity)
          }`}>
            {getIcon(topic.icon)}
          </div>
          <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border transition-all ${
            isSelected
              ? 'bg-rose-700/50 text-white border-white/20'
              : getSeverityBadgeColor(topic.severity)
          }`}>
            {topic.severity}
          </span>
        </div>

        <h3 className={`font-bold text-sm tracking-tight leading-snug transition-colors ${
          isSelected ? 'text-white' : 'text-slate-900 group-hover:text-rose-600'
        }`}>
          {topic.title}
        </h3>
      </div>

      <p className={`text-[11px] leading-relaxed line-clamp-2 mt-2 transition-all ${
        isSelected ? 'text-rose-50' : 'text-slate-500'
      }`}>
        {topic.shortDesc}
      </p>
    </button>
  );
}

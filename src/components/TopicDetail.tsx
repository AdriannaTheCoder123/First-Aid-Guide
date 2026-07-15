import { useState } from 'react';
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
  UserRoundX,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Clock
} from 'lucide-react';

interface TopicDetailProps {
  topic: FirstAidTopic;
}

export default function TopicDetail({ topic }: TopicDetailProps) {
  const [activeAgeGroup, setActiveAgeGroup] = useState<'adult' | 'child' | 'infant'>('adult');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6" />;
      case 'UserRoundX':
        return <UserRoundX className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Bandage':
        return <FlameKindling className="w-6 h-6" />; // Using FlameKindling as placeholder or custom fallback
      case 'Droplets':
        return <Droplets className="w-6 h-6" />;
      case 'Skull':
        return <Skull className="w-6 h-6" />;
      case 'Activity':
        return <Activity className="w-6 h-6" />;
      case 'Sun':
        return <Sun className="w-6 h-6" />;
      case 'Bug':
        return <Bug className="w-6 h-6" />;
      default:
        return <ShieldAlert className="w-6 h-6" />;
    }
  };

  const getSeverityStyle = (severity: typeof topic.severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-50 text-rose-700 border-rose-200/50';
      case 'moderate':
        return 'bg-amber-50 text-amber-700 border-amber-200/50';
      case 'mild':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200/50';
    }
  };

  const getStepIconAndStyle = (type: string | undefined) => {
    switch (type) {
      case 'do':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
          bgColor: 'bg-emerald-50/20 border-emerald-100',
          textColor: 'text-slate-800'
        };
      case 'dont':
        return {
          icon: <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
          bgColor: 'bg-rose-50/20 border-rose-100',
          textColor: 'text-slate-800'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
          bgColor: 'bg-amber-50/30 border-amber-100',
          textColor: 'text-slate-800'
        };
      case 'info':
      default:
        return {
          icon: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
          bgColor: 'bg-blue-50/10 border-blue-100/50',
          textColor: 'text-slate-800'
        };
    }
  };

  // Determine standard steps vs age-specific steps
  const showAgeTabs = !!topic.ageSpecific;
  const currentSteps = showAgeTabs && topic.ageSpecific
    ? [...topic.steps, ...topic.ageSpecific[activeAgeGroup]]
    : topic.steps;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6" id={`topic-detail-${topic.id}`}>
      {/* Topic Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center gap-3.5">
          <div className={`p-3.5 rounded-2xl ${
            topic.severity === 'critical' ? 'bg-rose-550/10 text-rose-600' :
            topic.severity === 'moderate' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'
          }`}>
            {getIcon(topic.icon)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${getSeverityStyle(topic.severity)}`}>
                {topic.severity} Priority
              </span>
              <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Category: {topic.category}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              {topic.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Description & Quick Action Action banner */}
      <div className="space-y-3">
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          {topic.shortDesc}
        </p>

        <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 md:p-5 flex gap-3.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-slate-400 text-xs font-mono font-bold uppercase tracking-wider">
              Immediate Critical Action
            </h4>
            <p className="text-white text-sm font-semibold leading-relaxed">
              {topic.quickAction}
            </p>
          </div>
        </div>
      </div>

      {/* Signs & Symptoms */}
      {topic.signs && topic.signs.length > 0 && (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 md:p-5">
          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
            How to recognize this situation
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {topic.signs.map((sign, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span className="leading-normal font-medium">{sign}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step by Step Treatment Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-base">Step-by-Step Treatment</h3>

          {/* Age selection tabs if available */}
          {showAgeTabs && (
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 self-start sm:self-auto">
              {(['adult', 'child', 'infant'] as const).map((ageGroup) => (
                <button
                  key={ageGroup}
                  onClick={() => setActiveAgeGroup(ageGroup)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeAgeGroup === ageGroup
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/40'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {ageGroup}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {currentSteps.map((step, idx) => {
            const stepDetail = getStepIconAndStyle(step.type);
            return (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${stepDetail.bgColor}`}
              >
                <div className="shrink-0">
                  {stepDetail.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                      STEP {idx + 1}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed font-semibold ${stepDetail.textColor}`}>
                    {step.text}
                  </p>
                  {step.detail && (
                    <p className="text-xs text-slate-500 leading-normal mt-1">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* things to avoid - DO NOT */}
      {topic.donts && topic.donts.length > 0 && (
        <div className="border border-rose-100/70 bg-rose-50/10 rounded-2xl p-5 md:p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-800">
            <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
            <h4 className="font-bold text-sm uppercase tracking-wide">
              Critical Don'ts (Things to Avoid)
            </h4>
          </div>
          <div className="space-y-2">
            {topic.donts.map((dont, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-rose-950 font-medium leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{dont}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency reminder */}
      {topic.callAmbulanceImmediately && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-950 leading-relaxed font-semibold flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            This is a highly critical emergency. Do not attempt rescue actions alone if possible. Immediately activate emergency medical responders (dial 911 or your local emergency hotline) to start professional paramedic support.
          </div>
        </div>
      )}
    </div>
  );
}

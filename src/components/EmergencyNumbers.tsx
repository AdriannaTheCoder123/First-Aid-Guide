import { useState } from 'react';
import { EMERGENCY_CONTACTS } from '../data/firstAidData';
import { PhoneCall, ShieldAlert, Heart, Skull, Globe, Shield } from 'lucide-react';

export default function EmergencyNumbers() {
  const [regionFilter, setRegionFilter] = useState<'all' | 'us' | 'eu' | 'uk'>('all');

  // Mapping string icons to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      case 'Skull':
        return <Skull className="w-5 h-5 text-purple-500" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-500" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-amber-500" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-pink-500" />;
      default:
        return <ShieldAlert className="w-5 h-5" />;
    }
  };

  const filteredContacts = EMERGENCY_CONTACTS.filter((contact) => {
    if (regionFilter === 'all') return true;
    if (regionFilter === 'us') return contact.name.includes('US') || contact.name.includes('Poison') || contact.name.includes('Crisis');
    if (regionFilter === 'eu') return contact.name.includes('Europe') || contact.name.includes('Poison') || contact.name.includes('Crisis');
    if (regionFilter === 'uk') return contact.name.includes('UK') || contact.name.includes('Poison') || contact.name.includes('Crisis');
    return true;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full" id="emergency-numbers-panel">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-rose-50 p-2 rounded-xl text-rose-600">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">Emergency Hotlines</h3>
              <p className="text-xs text-slate-500">Instant contact details for critical situations</p>
            </div>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 mb-5 bg-slate-50 p-1 rounded-xl border border-slate-100">
          {(['all', 'us', 'eu', 'uk'] as const).map((region) => (
            <button
              key={region}
              onClick={() => setRegionFilter(region)}
              className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                regionFilter === region
                  ? 'bg-white text-rose-600 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {region === 'all' ? 'All regions' : region.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredContacts.map((contact, index) => {
            const isMainEmergency = contact.number === '911' || contact.number === '112' || contact.number === '999';
            return (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  isMainEmergency
                    ? 'bg-rose-50/40 border-rose-100 hover:border-rose-200 shadow-xs'
                    : 'bg-slate-50/30 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex gap-3">
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isMainEmergency ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {getIcon(contact.icon)}
                  </div>
                  <div className="space-y-1">
                    <h4 className={`font-bold text-xs ${isMainEmergency ? 'text-rose-950' : 'text-slate-800'}`}>
                      {contact.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {contact.description}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${contact.number}`}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold font-mono shadow-sm hover:shadow transition-all ${
                    isMainEmergency
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {contact.number}
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/50 p-3 rounded-xl border border-dashed border-slate-200 text-[10px] text-slate-400 leading-relaxed">
        <strong>Tip:</strong> If you are dialing from a locked smartphone, you can access the emergency call screen without unlocking. Always give dispatchers your exact address first.
      </div>
    </div>
  );
}

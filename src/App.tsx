/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FIRST_AID_TOPICS } from './data/firstAidData';
import TopicCard from './components/TopicCard';
import TopicDetail from './components/TopicDetail';
import InteractiveTriage from './components/InteractiveTriage';
import InteractiveQuiz from './components/InteractiveQuiz';
import CprMetronome from './components/CprMetronome';
import EmergencyNumbers from './components/EmergencyNumbers';
import {
  Search,
  BookOpen,
  HelpCircle,
  GraduationCap,
  ShieldAlert,
  Info,
  PhoneCall,
  Activity
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guides' | 'triage' | 'quiz'>('guides');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('cpr');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'trauma' | 'medical' | 'environmental' | 'resuscitation'>('all');

  const selectedTopic = FIRST_AID_TOPICS.find((t) => t.id === selectedTopicId) || FIRST_AID_TOPICS[0];

  // Search filter
  const filteredTopics = FIRST_AID_TOPICS.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.steps.some((step) => step.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (topic.signs && topic.signs.some((sign) => sign.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory =
      activeCategory === 'all' || topic.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSelectTopicFromTriage = (topicId: string) => {
    setSelectedTopicId(topicId);
    setActiveTab('guides');
  };

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'resuscitation', label: 'Resuscitation (CPR/Choking)' },
    { id: 'trauma', label: 'Trauma & Bleeding' },
    { id: 'medical', label: 'Medical Emergencies' },
    { id: 'environmental', label: 'Environmental' }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" id="app-root">
      {/* Disclaimer Banner */}
      <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 border-b border-amber-600/30" id="disclaimer-banner">
        <ShieldAlert className="w-4 h-4 shrink-0" />
        <span className="text-center">
          Educational Resource Only. Always contact local emergency responders (like 911) first during real, active life-threatening situations.
        </span>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-slate-200/80 py-4 px-4 md:px-8 sticky top-0 z-30 shadow-sm" id="main-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center shadow-md shadow-rose-600/20 text-white font-bold text-lg">
              🩹
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-950">Guardian<span className="text-rose-600">FirstAid</span></span>
                <span className="text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-full">EDITION 2026</span>
              </div>
              <p className="text-xs text-slate-500 font-semibold tracking-tight">
                Instant interactive emergency protocols & practice drills
              </p>
            </div>
          </div>

          {/* Core Feature Tab Controls */}
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
              <button
                onClick={() => setActiveTab('guides')}
                className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'guides'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> Treatment Guides
              </button>
              <button
                onClick={() => setActiveTab('triage')}
                className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'triage'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" /> "What should I do if..."
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'quiz'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" /> Knowledge Check
              </button>
            </div>

            <a
              href="tel:911"
              className="px-5 py-2.5 bg-rose-600 text-white rounded-full font-extrabold text-xs tracking-wider shadow-lg shadow-rose-200/80 hover:bg-rose-700 transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              EMERGENCY: 911
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8" id="main-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* LEFT 8 COLS: Primary Interactive View Area */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            {activeTab === 'guides' && (
              <div className="space-y-6" id="guides-explorer-view">
                
                {/* Search & Category Filter Section */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-md shadow-slate-100/50 space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for an emergency... (e.g. cuts, burns, bleeding, bee sting)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 focus:border-rose-300 focus:ring-4 focus:ring-rose-500/10 focus:bg-white rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium outline-none text-slate-800 transition-all placeholder:text-slate-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          activeCategory === cat.id
                            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/15'
                            : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid of Topic Cards (Horizontal or Bento style) */}
                {filteredTopics.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="topics-grid">
                    {filteredTopics.map((topic) => (
                      <TopicCard
                        key={topic.id}
                        topic={topic}
                        isSelected={selectedTopicId === topic.id}
                        onSelect={() => setSelectedTopicId(topic.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500" id="no-topics-found">
                    <Info className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold">No guides match your search terms.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                      className="text-xs font-bold text-rose-600 mt-2 hover:underline cursor-pointer"
                    >
                      Reset filters
                    </button>
                  </div>
                )}

                {/* Selected Topic Detailed Step-by-Step Panel */}
                <div className="pt-2">
                  <TopicDetail topic={selectedTopic} />
                </div>

              </div>
            )}

            {activeTab === 'triage' && (
              <div id="triage-view">
                <InteractiveTriage onSelectTopic={handleSelectTopicFromTriage} />
              </div>
            )}

            {activeTab === 'quiz' && (
              <div id="quiz-view">
                <InteractiveQuiz />
              </div>
            )}

          </div>

          {/* RIGHT 4 COLS: Persistent Action Widgets (CPR Coach & Hotlines) */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8 sticky top-24">
            
            {/* CPR Metronome Coach */}
            <CprMetronome />

            {/* Quick dials */}
            <EmergencyNumbers />

            {/* Quick First Aid Advice Card */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 text-slate-300 relative overflow-hidden" id="quick-principles-widget">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-white mb-3">
                Core First Aid Principles
              </h4>
              <div className="space-y-3.5 text-xs">
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-emerald-400 shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="leading-normal">
                    <strong>Preserve Life:</strong> Your immediate action should stop deterioration. Control major bleeding and keep breathing channels patent.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-emerald-400 shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="leading-normal">
                    <strong>Prevent Harm:</strong> Never execute actions that might worsen an injury. For instance, do not move suspected spinal injuries or pull stuck items.
                  </p>
                </div>
                <div className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[10px] font-bold text-emerald-400 shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="leading-normal">
                    <strong>Promote Recovery:</strong> Keep the patient calm, warm, reassured, and protected from environmental hazards while professional paramedics transit.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 px-4 text-center" id="app-footer">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
            This First Aid Guide is an educational simulator and reference library based on public guidelines (AHA, Red Cross). It is designed to foster preparedness. In any physical trauma or medical crisis, always call <strong>911</strong> or equivalent emergency lines immediately.
          </p>
          <p className="text-[10px] text-slate-400">
            &copy; 2026 First Aid Guide. Developed for public health awareness.
          </p>
        </div>
      </footer>
    </div>
  );
}

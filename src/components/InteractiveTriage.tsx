import { useState } from 'react';
import { TRIAGE_TREE } from '../data/firstAidData';
import { HelpCircle, RefreshCw, AlertTriangle, ArrowRight, PhoneCall } from 'lucide-react';

interface InteractiveTriageProps {
  onSelectTopic: (topicId: string) => void;
}

export default function InteractiveTriage({ onSelectTopic }: InteractiveTriageProps) {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [history, setHistory] = useState<string[]>([]);

  const currentNode = TRIAGE_TREE[currentNodeId] || TRIAGE_TREE['start'];

  const handleOptionClick = (option: typeof TRIAGE_TREE[string]['options'][0]) => {
    setHistory((prev) => [...prev, currentNodeId]);

    if (option.nextId) {
      setCurrentNodeId(option.nextId);
    } else if (option.topicId) {
      // Direct jump to topic, but we also can show advice first
      if (option.advice) {
        // Create a temporary state displaying the final advice and offering a button to see the full guide
        setCurrentNodeId(`advice_${option.topicId}_${encodeURIComponent(option.advice)}_${option.critical ? '1' : '0'}`);
      } else {
        onSelectTopic(option.topicId);
        resetTriage();
      }
    } else if (option.advice) {
      setCurrentNodeId(`advice_none_${encodeURIComponent(option.advice)}_${option.critical ? '1' : '0'}`);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setCurrentNodeId(prev);
      setHistory((prevList) => prevList.slice(0, -1));
    }
  };

  const resetTriage = () => {
    setCurrentNodeId('start');
    setHistory([]);
  };

  // Check if we are in an advice rendering state
  const isAdviceNode = currentNodeId.startsWith('advice_');
  let adviceText = '';
  let adviceTopicId = '';
  let isCritical = false;

  if (isAdviceNode) {
    const parts = currentNodeId.split('_');
    adviceTopicId = parts[1];
    adviceText = decodeURIComponent(parts[2]);
    isCritical = parts[3] === '1';
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-full" id="interactive-triage">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="bg-rose-50 p-2 rounded-xl text-rose-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-lg">"What should I do if..."</h3>
              <p className="text-xs text-slate-500">Quick decision helper & triage guide</p>
            </div>
          </div>
          {(history.length > 0 || isAdviceNode) && (
            <button
              onClick={resetTriage}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Start Over
            </button>
          )}
        </div>

        {isAdviceNode ? (
          <div className="space-y-5 animate-fadeIn">
            <div className={`p-5 rounded-2xl border ${
              isCritical
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-blue-50 border-blue-100 text-blue-900'
            }`}>
              <div className="flex gap-3">
                <AlertTriangle className={`w-6 h-6 shrink-0 ${isCritical ? 'text-rose-600' : 'text-blue-600'}`} />
                <div className="space-y-2">
                  <h4 className="font-bold text-sm uppercase tracking-wide">
                    {isCritical ? 'Critical Emergency Action' : 'Immediate First Aid Advice'}
                  </h4>
                  <p className="text-sm font-medium leading-relaxed">{adviceText}</p>
                </div>
              </div>

              {isCritical && (
                <div className="mt-4 pt-4 border-t border-rose-200/50 flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-700">Call Emergency Services immediately!</span>
                  <a
                    href="tel:911"
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call 911
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {history.length > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 font-medium text-sm transition-all cursor-pointer"
                >
                  Back
                </button>
              )}
              {adviceTopicId && adviceTopicId !== 'none' && (
                <button
                  onClick={() => {
                    onSelectTopic(adviceTopicId);
                    resetTriage();
                  }}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-rose-200/50"
                >
                  View Step-by-Step Guide <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <h4 className="text-base font-semibold text-slate-800 leading-snug">
              {currentNode.question}
            </h4>

            <div className="space-y-2">
              {currentNode.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 transition-all font-medium text-slate-700 hover:text-slate-900 text-sm flex items-center justify-between gap-3 cursor-pointer group ${
                    option.critical ? 'hover:border-rose-200 hover:bg-rose-50/30' : ''
                  }`}
                  id={`triage-opt-${index}`}
                >
                  <span className="leading-snug">{option.text}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200/80 group-hover:text-slate-600 transition-all text-xs ${
                    option.critical ? 'group-hover:bg-rose-100 group-hover:text-rose-600' : ''
                  }`}>
                    →
                  </span>
                </button>
              ))}
            </div>

            {history.length > 0 && (
              <button
                onClick={handleBack}
                className="mt-2 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
              >
                ← Back to previous question
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
        This selector acts as an educational decision flowchart. If a victim is severely bleeding, struggling to breathe, or unresponsive, call emergency services immediately.
      </div>
    </div>
  );
}

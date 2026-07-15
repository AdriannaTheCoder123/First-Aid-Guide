import { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, VolumeX, FlameKindling, Info } from 'lucide-react';

export default function CprMetronome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(110); // Standard compression rate is 100-120
  const [isMuted, setIsMuted] = useState(false);
  const [compressionCount, setCompressionCount] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [beatPhase, setBeatPhase] = useState<'push' | 'release'>('release');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize AudioContext lazily on user gesture
  const playClick = () => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Clean, pleasant click sound: high frequency with rapid decay
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch click
      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.warn('AudioContext failed to initialize or play', e);
    }
  };

  const handleStartStop = () => {
    if (isPlaying) {
      // Stop
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      // Start
      setIsPlaying(true);
      setCompressionCount(0);
      setSecondsElapsed(0);
      setBeatPhase('push');
      playClick();
      setCompressionCount((prev) => prev + 1);

      // Timing formula: 60,000ms / BPM
      const intervalMs = 60000 / bpm;

      intervalRef.current = setInterval(() => {
        playClick();
        setCompressionCount((prev) => prev + 1);
        setBeatPhase((prev) => (prev === 'push' ? 'release' : 'push'));
      }, intervalMs);

      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
  };

  // Adjust interval if BPM changes during playback
  useEffect(() => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const intervalMs = 60000 / bpm;
      intervalRef.current = setInterval(() => {
        playClick();
        setCompressionCount((prev) => prev + 1);
        setBeatPhase((prev) => (prev === 'push' ? 'release' : 'push'));
      }, intervalMs);
    }
  }, [bpm]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Cycles of 30 compressions are standard in CPR
  const currentCycle = Math.floor((compressionCount - 1) / 30) + 1;
  const cycleProgress = ((compressionCount - 1) % 30) + 1;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden text-slate-100 h-full flex flex-col justify-between" id="cpr-metronome-container">
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl transition-all duration-300 pointer-events-none ${isPlaying ? 'bg-rose-500/10' : 'bg-transparent'}`} />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-rose-500/20 p-1.5 rounded-lg text-rose-400">
              <FlameKindling className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-white">CPR Pace Coach</h3>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-lg transition-colors"
            title={isMuted ? 'Unmute beat' : 'Mute beat'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Compressions must be performed at 100–120 per minute. Sync your pushes with the pulsing circle below.
        </p>

        {/* Pulsing Visual */}
        <div className="flex flex-col items-center justify-center my-4 h-36">
          <div className="relative flex items-center justify-center">
            {/* Outer expanding ring */}
            <div
              className={`absolute rounded-full border border-rose-500/30 transition-all duration-200 ${
                isPlaying && beatPhase === 'push'
                  ? 'w-28 h-28 opacity-100 scale-100'
                  : 'w-24 h-24 opacity-0 scale-75'
              }`}
            />
            {/* Main pulsing core */}
            <button
              onClick={handleStartStop}
              className={`w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-100 cursor-pointer shadow-lg outline-none select-none ${
                isPlaying
                  ? beatPhase === 'push'
                    ? 'bg-rose-600 scale-105 text-white shadow-rose-600/30'
                    : 'bg-rose-700/80 scale-95 text-rose-100 shadow-transparent'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isPlaying ? (
                <div className="text-center">
                  <span className="text-xs font-mono uppercase tracking-wider block leading-none font-semibold">
                    {beatPhase === 'push' ? 'PUSH' : 'UP'}
                  </span>
                </div>
              ) : (
                <Play className="w-8 h-8 fill-current ml-1 text-rose-500" />
              )}
            </button>
          </div>

          {isPlaying && (
            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-slate-400">
                Cycle {currentCycle} • Compressions: <span className="text-rose-400 font-bold font-mono text-sm">{cycleProgress}/30</span>
              </span>
            </div>
          )}
        </div>

        {/* Speed Slider */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Compression Speed</span>
            <span className="text-rose-400 font-semibold">{bpm} CPM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500">100</span>
            <input
              type="range"
              min="100"
              max="120"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              disabled={false}
              className="w-full accent-rose-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-[10px] text-slate-500">120</span>
          </div>
        </div>
      </div>

      {/* Stats and Start Button */}
      <div className="border-t border-slate-800 pt-4 mt-auto">
        {isPlaying ? (
          <div className="grid grid-cols-2 gap-2 mb-4 text-center">
            <div className="bg-slate-800/50 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Elapsed</span>
              <span className="text-sm font-mono font-bold text-white">{formatTime(secondsElapsed)}</span>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Total Pushes</span>
              <span className="text-sm font-mono font-bold text-white">{compressionCount}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 bg-slate-800/30 p-3 rounded-xl mb-4 text-xs text-slate-400">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <p>
              In real CPR, administer 2 breaths after every 30 compressions, then immediately resume pushing.
            </p>
          </div>
        )}

        <button
          onClick={handleStartStop}
          className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isPlaying
              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              : 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20'
          }`}
        >
          {isPlaying ? (
            <>
              <Square className="w-4 h-4 fill-current" /> Stop Metronome
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Start Practice Beat
            </>
          )}
        </button>
      </div>
    </div>
  );
}

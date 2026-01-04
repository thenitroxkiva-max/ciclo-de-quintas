
import React, { useState, useEffect, useMemo } from 'react';
import { KeySignature, AppMode, HarmonicFunction } from './types';
import { CIRCLE_OF_FIFTHS, FUNCTION_METAPHORS } from './constants';
import Mandala from './components/Mandala';
import ProgressionBuilder from './components/ProgressionBuilder';
import { getDiatonicChords } from './services/theoryService';
import { audio } from './services/audioEngine';
import { Info, Music, Layout, Trophy, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<KeySignature>(CIRCLE_OF_FIFTHS[0]);
  const [mode, setMode] = useState<AppMode>('explore');
  const [score, setScore] = useState(0);

  const diatonicChords = useMemo(() => getDiatonicChords(selectedKey.major), [selectedKey]);

  const handleKeySelect = (key: KeySignature) => {
    setSelectedKey(key);
    audio.playNote(261.63, 0.3); // C4 feedback
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-8 md:pt-16 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400 mb-2">
          Mandala Harmônica
        </h1>
        <p className="text-white/60 max-w-lg">
          Desvende a geometria sagrada da música através do ciclo de quintas e metáforas astronômicas.
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: The Mandala */}
        <section className="flex flex-col items-center">
          <Mandala selectedKey={selectedKey} onSelect={handleKeySelect} />
          
          <div className="mt-8 glass p-6 rounded-3xl w-full border-t-4 border-indigo-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedKey.major} Maior</h2>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-mono uppercase tracking-widest text-indigo-300">
                {selectedKey.minor} Relativa
              </span>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm leading-relaxed opacity-80 italic">
                "Nesta tonalidade, a música brilha com {Math.abs(selectedKey.fifths)} {selectedKey.fifths >= 0 ? 'sustenidos' : 'bemóis'}, 
                pintando um cenário de {selectedKey.fifths > 0 ? 'energia e brilho' : 'profundidade e introspecção'}."
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {Object.values(HarmonicFunction).filter(f => f !== HarmonicFunction.NONE).map(func => (
                  <div key={func} className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="p-2 bg-indigo-500/10 rounded-xl">
                      {FUNCTION_METAPHORS[func].icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{FUNCTION_METAPHORS[func].label}</h4>
                      <p className="text-[10px] opacity-50 leading-tight">{FUNCTION_METAPHORS[func].desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Interaction */}
        <section className="space-y-8">
          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
            <button 
              onClick={() => setMode('explore')}
              className={`flex-1 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'explore' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              <Music className="w-4 h-4" /> Explorar
            </button>
            <button 
              onClick={() => setMode('compose')}
              className={`flex-1 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'compose' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              <Layout className="w-4 h-4" /> Compor
            </button>
            <button 
              onClick={() => setMode('quiz')}
              className={`flex-1 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'quiz' ? 'bg-indigo-600 text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              <Trophy className="w-4 h-4" /> Desafio
            </button>
          </div>

          {mode === 'explore' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-400" />
                Diatonismo de {selectedKey.major}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {diatonicChords.map((chord, i) => (
                  <button
                    key={i}
                    onClick={() => audio.playChord(chord.notes)}
                    className="p-4 rounded-2xl glass border-l-4 border-l-transparent hover:border-l-indigo-500 transition-all flex justify-between items-center group active:scale-95"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-2xl font-bold group-hover:text-indigo-300 transition-colors">{chord.root}</span>
                      <span className="text-xs uppercase tracking-widest opacity-40">{chord.type}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-mono opacity-60 group-hover:opacity-100 transition-opacity">{chord.roman}</span>
                      <div className="flex gap-1 mt-1">
                        {FUNCTION_METAPHORS[chord.func].icon}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'compose' && (
            <div className="animate-in slide-in-from-right duration-500">
              <ProgressionBuilder currentChords={diatonicChords} />
            </div>
          )}

          {mode === 'quiz' && (
            <div className="glass rounded-3xl p-8 text-center animate-in slide-in-from-right duration-500">
              <div className="bg-indigo-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Treino de Ouvido</h3>
              <p className="text-white/60 mb-8">
                Identifique os acordes e resolva desafios musicais para subir no ranking harmônico.
              </p>
              <button className="px-8 py-3 bg-indigo-600 rounded-2xl font-bold hover:bg-indigo-500 transition-colors">
                Iniciar Missão
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Floating Bottom Nav for Mobile convenience */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass px-6 py-4 rounded-full border border-white/10 flex gap-8 z-50">
        <a href="#" className="p-2 hover:bg-white/10 rounded-full transition-colors"><Music className="w-5 h-5" /></a>
        <a href="#" className="p-2 hover:bg-white/10 rounded-full transition-colors"><HelpCircle className="w-5 h-5" /></a>
        <a href="#" className="p-2 hover:bg-white/10 rounded-full transition-colors"><Trophy className="w-5 h-5" /></a>
      </nav>
    </div>
  );
};

export default App;

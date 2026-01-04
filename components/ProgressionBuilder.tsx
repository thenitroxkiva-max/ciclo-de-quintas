
import React, { useState } from 'react';
import { audio } from '../services/audioEngine';
import { ChordData } from '../types';
import { Play, Trash2, Wand2 } from 'lucide-react';

interface ProgressionBuilderProps {
  currentChords: ChordData[];
}

const ProgressionBuilder: React.FC<ProgressionBuilderProps> = ({ currentChords }) => {
  const [progression, setProgression] = useState<ChordData[]>([]);

  const addToProgression = (chord: ChordData) => {
    if (progression.length < 8) {
      setProgression([...progression, chord]);
      audio.playChord(chord.notes);
    }
  };

  const playAll = async () => {
    for (const chord of progression) {
      audio.playChord(chord.notes);
      await new Promise(r => setTimeout(r, 1000));
    }
  };

  const generateRandom = () => {
    // Basic Pop: I-V-vi-IV
    const indices = [0, 4, 5, 3];
    const newProg = indices.map(i => currentChords[i]);
    setProgression(newProg);
  };

  return (
    <div className="glass rounded-3xl p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-purple-400" />
          Arquiteto de Harmonias
        </h3>
        <div className="flex gap-2">
          <button onClick={generateRandom} className="px-3 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/30 rounded-full border border-purple-500/30 transition-all">
            Sugestão Pop
          </button>
          <button onClick={() => setProgression([])} className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-all text-red-400">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-8 min-h-[80px] bg-black/20 rounded-2xl p-4 border border-white/5">
        {progression.map((chord, idx) => (
          <div 
            key={idx} 
            className="aspect-square flex flex-col items-center justify-center bg-white/10 rounded-xl border border-white/10 animate-in fade-in zoom-in duration-300"
          >
            <span className="text-sm font-bold">{chord.root}</span>
            <span className="text-[10px] opacity-50">{chord.roman}</span>
          </div>
        ))}
        {progression.length === 0 && (
          <div className="col-span-full flex items-center justify-center text-white/20 text-sm">
            Adicione acordes abaixo...
          </div>
        )}
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {currentChords.map((chord, idx) => (
          <button
            key={idx}
            onClick={() => addToProgression(chord)}
            className="flex flex-col items-center p-2 rounded-xl bg-white/5 hover:bg-white/20 border border-white/5 transition-all active:scale-95"
          >
            <span className="text-lg font-bold">{chord.root}</span>
            <span className="text-[10px] opacity-60">{chord.roman}</span>
          </button>
        ))}
      </div>

      <button
        onClick={playAll}
        disabled={progression.length === 0}
        className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center gap-2 font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-30"
      >
        <Play className="w-5 h-5 fill-current" />
        Ouvir Progressão
      </button>
    </div>
  );
};

export default ProgressionBuilder;

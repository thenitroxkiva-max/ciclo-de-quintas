
import React from 'react';
import { Sun, Moon, Stars, Sparkles } from 'lucide-react';
import { KeySignature, HarmonicFunction } from './types';

export const CIRCLE_OF_FIFTHS: KeySignature[] = [
  { major: 'C', minor: 'Am', fifths: 0, color: 'from-blue-400 to-indigo-600' },
  { major: 'G', minor: 'Em', fifths: 1, color: 'from-cyan-400 to-teal-600' },
  { major: 'D', minor: 'Bm', fifths: 2, color: 'from-green-400 to-emerald-600' },
  { major: 'A', minor: 'F#m', fifths: 3, color: 'from-yellow-300 to-orange-500' },
  { major: 'E', minor: 'C#m', fifths: 4, color: 'from-orange-400 to-red-600' },
  { major: 'B', minor: 'G#m', fifths: 5, color: 'from-rose-400 to-pink-600' },
  { major: 'Gb', minor: 'Ebm', fifths: 6, color: 'from-fuchsia-400 to-purple-600' },
  { major: 'Db', minor: 'Bbm', fifths: -5, color: 'from-indigo-400 to-purple-800' },
  { major: 'Ab', minor: 'Fm', fifths: -4, color: 'from-blue-600 to-indigo-900' },
  { major: 'Eb', minor: 'Cm', fifths: -3, color: 'from-blue-500 to-cyan-500' },
  { major: 'Bb', minor: 'Gm', fifths: -2, color: 'from-cyan-300 to-sky-600' },
  { major: 'F', minor: 'Dm', fifths: -1, color: 'from-sky-400 to-blue-600' },
];

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const FUNCTION_METAPHORS = {
  [HarmonicFunction.TONIC]: {
    icon: <Sun className="w-6 h-6 text-yellow-400" />,
    label: 'Sol (Tônica)',
    desc: 'O centro gravitacional. Sensação de repouso e luz plena.'
  },
  [HarmonicFunction.DOMINANT]: {
    icon: <Moon className="w-6 h-6 text-blue-200" />,
    label: 'Lua (Dominante)',
    desc: 'Tensão e reflexão. Puxa você de volta para casa.'
  },
  [HarmonicFunction.SUBDOMINANT]: {
    icon: <Stars className="w-6 h-6 text-indigo-300" />,
    label: 'Estrelas (Subdominante)',
    desc: 'O caminho entre luz e sombra. Afastamento suave.'
  },
  [HarmonicFunction.NONE]: {
    icon: <Sparkles className="w-6 h-6 text-gray-400" />,
    label: 'Outros',
    desc: 'Cores auxiliares na tapeçaria sonora.'
  }
};

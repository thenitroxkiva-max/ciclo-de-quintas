
import { NOTE_NAMES } from '../constants';
import { HarmonicFunction, ChordData } from '../types';

const BASE_A4 = 440;

export const getFrequency = (noteName: string, octave: number = 4): number => {
  const index = NOTE_NAMES.indexOf(noteName.replace('b', '#').replace('Gb', 'F#').replace('Db', 'C#').replace('Ab', 'G#').replace('Eb', 'D#').replace('Bb', 'A#'));
  const semitones = index + (octave - 4) * 12 - 9; // Relative to A4
  return BASE_A4 * Math.pow(2, semitones / 12);
};

export const getDiatonicChords = (root: string): ChordData[] => {
  const rootIdx = NOTE_NAMES.indexOf(root.replace('Gb', 'F#').replace('Db', 'C#').replace('Ab', 'G#').replace('Eb', 'D#').replace('Bb', 'A#'));
  
  // Basic major scale intervals: W-W-H-W-W-W-H
  const intervals = [0, 2, 4, 5, 7, 9, 11];
  const chordTypes: ('major' | 'minor' | 'dim')[] = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
  const romans = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
  const functions = [
    HarmonicFunction.TONIC, 
    HarmonicFunction.SUBDOMINANT, 
    HarmonicFunction.NONE, 
    HarmonicFunction.SUBDOMINANT, 
    HarmonicFunction.DOMINANT, 
    HarmonicFunction.TONIC, 
    HarmonicFunction.DOMINANT
  ];

  return intervals.map((interval, i) => {
    const noteIdx = (rootIdx + interval) % 12;
    const note = NOTE_NAMES[noteIdx];
    const type = chordTypes[i];
    
    // Calculate basic triad notes
    const triadIntervals = type === 'major' ? [0, 4, 7] : type === 'minor' ? [0, 3, 7] : [0, 3, 6];
    const notes = triadIntervals.map(ti => getFrequency(NOTE_NAMES[(noteIdx + ti) % 12], 4));

    return {
      root: note,
      type,
      roman: romans[i],
      func: functions[i],
      notes
    };
  });
};

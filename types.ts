
export enum HarmonicFunction {
  TONIC = 'TONIC',
  DOMINANT = 'DOMINANT',
  SUBDOMINANT = 'SUBDOMINANT',
  NONE = 'NONE'
}

export interface MusicalNote {
  label: string;
  frequency: number;
}

export interface ChordData {
  root: string;
  type: 'major' | 'minor' | 'dim';
  roman: string;
  func: HarmonicFunction;
  notes: number[]; // Frequencies
}

export interface KeySignature {
  major: string;
  minor: string;
  fifths: number;
  color: string;
}

export type AppMode = 'explore' | 'quiz' | 'compose';


import React from 'react';
import { CIRCLE_OF_FIFTHS } from '../constants';
import { KeySignature } from '../types';

interface MandalaProps {
  selectedKey: KeySignature;
  onSelect: (key: KeySignature) => void;
}

const Mandala: React.FC<MandalaProps> = ({ selectedKey, onSelect }) => {
  const size = 400;
  const radius = size / 2;
  const sliceAngle = 360 / 12;

  return (
    <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center p-4">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-3xl mandala-rotate"></div>
      
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full relative z-10 overflow-visible drop-shadow-2xl">
        <defs>
          {CIRCLE_OF_FIFTHS.map((k, i) => (
            <linearGradient id={`grad-${i}`} key={i} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
            </linearGradient>
          ))}
        </defs>

        {CIRCLE_OF_FIFTHS.map((key, i) => {
          const rotate = i * sliceAngle - 90;
          const isSelected = selectedKey.major === key.major;
          
          return (
            <g 
              key={key.major} 
              onClick={() => onSelect(key)}
              className="cursor-pointer group"
              transform={`rotate(${rotate}, ${radius}, ${radius})`}
            >
              {/* Slice Background */}
              <path
                d={`M ${radius} ${radius} L ${radius + radius * 0.9} ${radius} A ${radius * 0.9} ${radius * 0.9} 0 0 1 ${radius + radius * 0.9 * Math.cos(sliceAngle * Math.PI / 180)} ${radius + radius * 0.9 * Math.sin(sliceAngle * Math.PI / 180)} Z`}
                className={`transition-all duration-300 ${isSelected ? 'fill-white/20 scale-[1.05]' : 'fill-white/5 hover:fill-white/10'}`}
                transform-origin={`${radius} ${radius}`}
              />
              
              {/* Text - Major */}
              <text
                x={radius + radius * 0.7}
                y={radius}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`text-2xl font-bold transition-all duration-300 group-hover:scale-110 pointer-events-none fill-white ${isSelected ? 'opacity-100' : 'opacity-60'}`}
                transform={`rotate(${sliceAngle / 2}, ${radius + radius * 0.7}, ${radius}) rotate(${-rotate - (sliceAngle / 2)}, ${radius + radius * 0.7}, ${radius})`}
              >
                {key.major}
              </text>

              {/* Text - Minor */}
              <text
                x={radius + radius * 0.45}
                y={radius}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`text-xs font-medium transition-all duration-300 pointer-events-none fill-white/50 ${isSelected ? 'opacity-100' : 'opacity-30'}`}
                transform={`rotate(${sliceAngle / 2}, ${radius + radius * 0.45}, ${radius}) rotate(${-rotate - (sliceAngle / 2)}, ${radius + radius * 0.45}, ${radius})`}
              >
                {key.minor}
              </text>
            </g>
          );
        })}

        {/* Center Glow */}
        <circle cx={radius} cy={radius} r={radius * 0.25} className="fill-indigo-950 stroke-white/20 stroke-2" />
        <text x={radius} y={radius} textAnchor="middle" alignmentBaseline="middle" className="fill-white text-[10px] font-bold tracking-widest uppercase opacity-40">
          QUINTAS
        </text>
      </svg>
    </div>
  );
};

export default Mandala;

import React from 'react';
import { TrainingSlot } from '../types';
import { Calendar, Clock, User, Activity } from 'lucide-react';

interface SlotCardProps {
  slot: TrainingSlot;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot }) => {
  const isFull = slot.status === 'FULL';
  
  return (
    <div className={`
      relative p-4 rounded-xl border transition-all duration-300
      ${isFull 
        ? 'bg-red-950/20 border-red-900/50 opacity-70' 
        : 'bg-gray-900 border-gray-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-900/20'
      }
    `}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{slot.date}</span>
        </div>
        <span className={`
          text-xs font-bold px-2 py-1 rounded-full border
          ${isFull 
            ? 'bg-red-900/20 text-red-400 border-red-900' 
            : 'bg-emerald-900/20 text-emerald-400 border-emerald-900'
          }
        `}>
          {slot.status}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <Activity className={`w-5 h-5 ${isFull ? 'text-red-500' : 'text-emerald-500'}`} />
          {slot.type}
        </h3>
        <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
          <User className="w-4 h-4" /> {slot.trainer}
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-gray-800 pt-3">
        <div className="flex items-center space-x-2 text-gray-300">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="font-mono text-lg">{slot.time}</span>
        </div>
        <div className="text-xs text-gray-500 font-mono">
          ID: {slot.id.split('-').slice(3).join('') || slot.id}
        </div>
      </div>
      
      {/* Capacity Bar */}
      <div className="mt-3 w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-emerald-500'}`}
          style={{ width: `${(slot.bookedCount / slot.capacity) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-gray-500">Booked</span>
        <span className="text-[10px] text-gray-400">{slot.bookedCount}/{slot.capacity}</span>
      </div>
    </div>
  );
};

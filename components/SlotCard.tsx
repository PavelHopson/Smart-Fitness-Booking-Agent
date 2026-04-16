import React from 'react';
import { TrainingSlot } from '../types';
import { IconCalendar, IconClock, IconActivity } from './icons/EclipseIcons';
import { User } from 'lucide-react';

interface SlotCardProps {
  slot: TrainingSlot;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot }) => {
  const isFull = slot.status === 'FULL';
  
  return (
    <div className={`
      relative p-4 rounded-xl border transition-all duration-300
      ${isFull
        ? 'bg-[#F5A623]/5 border-[#F5A623]/30 opacity-70'
        : 'bg-gray-900 border-[#1C2536] hover:border-[#6BA3FF]/50 hover:shadow-lg hover:shadow-[#6BA3FF]/10'
      }
    `}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <IconCalendar className="w-4 h-4" />
          <span>{slot.date}</span>
        </div>
        <span className={`
          text-xs font-bold px-2 py-1 rounded-full border
          ${isFull
            ? 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/40'
            : 'bg-[#4AE6A0]/10 text-[#4AE6A0] border-[#4AE6A0]/40'
          }
        `}>
          {slot.status}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-100 flex items-center gap-2">
          <IconActivity className={`w-5 h-5 ${isFull ? 'text-[#F5A623]' : 'text-[#4AE6A0]'}`} />
          {slot.type}
        </h3>
        <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
          <User className="w-4 h-4" /> {slot.trainer}
        </p>
      </div>

      <div className="flex justify-between items-end border-t border-[#1C2536] pt-3">
        <div className="flex items-center space-x-2 text-gray-300">
          <IconClock className="w-4 h-4 text-blue-400" />
          <span className="font-mono text-lg">{slot.time}</span>
        </div>
        <div className="text-xs text-gray-500 font-mono">
          ID: {slot.id.split('-').slice(3).join('') || slot.id}
        </div>
      </div>
      
      {/* Capacity Bar */}
      <div className="mt-3 w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${isFull ? 'bg-[#F5A623]' : 'bg-gradient-to-r from-[#6BA3FF] to-[#4AE6A0]'}`}
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

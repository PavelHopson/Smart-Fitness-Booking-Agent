import { TrainingSlot } from '../types';

// Шеф, генерируем данные на лету, чтобы всегда было "завтра" и "послезавтра"
const generateInitialSlots = (): TrainingSlot[] => {
  const slots: TrainingSlot[] = [];
  const types = ['Yoga', 'CrossFit', 'Boxing', 'Pilates'] as const;
  const trainers = ['Sarah Connor', 'Rocky Balboa', 'Mr. Miyagi', 'Bruce Lee'];
  
  const today = new Date();
  
  for (let i = 0; i < 3; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];

    const times = ['09:00', '11:00', '14:00', '18:00', '19:30'];

    times.forEach((time, index) => {
      slots.push({
        id: `${dateStr}-${time.replace(':', '')}`,
        date: dateStr,
        time: time,
        type: types[index % types.length],
        trainer: trainers[index % trainers.length],
        capacity: 10,
        bookedCount: Math.floor(Math.random() * 8), // Some randomness
        status: 'AVAILABLE'
      });
    });
  }
  return slots;
};

export const initialSlots = generateInitialSlots();

// Simulated API Calls
export const checkAvailability = (slots: TrainingSlot[], date: string): TrainingSlot[] => {
  return slots.filter(s => s.date === date);
};

export const bookSlot = (slots: TrainingSlot[], slotId: string): { success: boolean; message: string; updatedSlots: TrainingSlot[] } => {
  const slotIndex = slots.findIndex(s => s.id === slotId);
  if (slotIndex === -1) {
    return { success: false, message: 'Slot not found', updatedSlots: slots };
  }

  const slot = slots[slotIndex];
  if (slot.bookedCount >= slot.capacity) {
    return { success: false, message: 'Slot is fully booked', updatedSlots: slots };
  }

  const updatedSlot = { ...slot, bookedCount: slot.bookedCount + 1 };
  if (updatedSlot.bookedCount >= updatedSlot.capacity) {
    updatedSlot.status = 'FULL';
  }

  const newSlots = [...slots];
  newSlots[slotIndex] = updatedSlot;

  return { success: true, message: 'Booking confirmed', updatedSlots: newSlots };
};

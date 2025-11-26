export interface TrainingSlot {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  type: 'Yoga' | 'CrossFit' | 'Boxing' | 'Pilates';
  trainer: string;
  capacity: number;
  bookedCount: number;
  status: 'AVAILABLE' | 'FULL';
}

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system' // Internal visualization only
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  isToolCall?: boolean;
  toolName?: string;
  toolArgs?: Record<string, any>;
  toolResult?: any;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, any>;
}

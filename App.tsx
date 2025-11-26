import React, { useState, useEffect, useRef } from 'react';
import { initialSlots, checkAvailability, bookSlot } from './services/mockDb';
import { initializeGemini, sendMessageToAgent } from './services/gemini';
import { TrainingSlot, Message, MessageRole } from './types';
import { SlotCard } from './components/SlotCard';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Send, Bot, User as UserIcon, Terminal, Database, Sparkles, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [slots, setSlots] = useState<TrainingSlot[]>(initialSlots);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: MessageRole.MODEL,
      text: "Hello! I'm your Fitness Booking Agent. I can check schedules and book classes for you. Try saying 'What's available tomorrow?'",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleApiKeySubmit = (key: string) => {
    initializeGemini(key);
    setApiKey(key);
  };

  // --- Tool Implementations (Bridging AI to "Backend") ---
  const toolImplementations = {
    get_schedule: async ({ date }: { date: string }) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return checkAvailability(slots, date);
    },
    book_slot: async ({ slotId, clientName }: { slotId: string; clientName: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const result = bookSlot(slots, slotId);
      if (result.success) {
        setSlots(result.updatedSlots); // React State update triggers UI refresh immediately
      }
      return { success: result.success, message: result.message };
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: MessageRole.USER,
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Pass the *current* slots state implicitly via the tool wrapper closures above
      // But for history, we pass the messages array
      const response = await sendMessageToAgent(messages, userMsg.text, toolImplementations);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: MessageRole.MODEL,
        text: response.text,
        timestamp: new Date(),
        isToolCall: !!response.toolCalls,
        toolName: response.toolCalls?.[0]?.name,
        toolResult: response.toolCalls?.[0]?.result
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Date.now().toString(),
        role: MessageRole.MODEL,
        text: "System Error: Unable to process request. Please check console.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!apiKey) {
    return <ApiKeyModal onSubmit={handleApiKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Left Panel: Chat Interface */}
      <div className="w-full md:w-1/3 lg:w-[400px] flex flex-col border-r border-gray-800 bg-gray-950/50 backdrop-blur-md relative z-10">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400">
            <Bot className="w-6 h-6" />
            <h1 className="font-bold tracking-tight">Fitness Agent</h1>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-950/30 border border-emerald-900/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-mono text-emerald-600">ONLINE</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === MessageRole.USER ? 'items-end' : 'items-start'}`}>
              
              <div className={`
                max-w-[85%] rounded-2xl p-4 shadow-sm relative
                ${msg.role === MessageRole.USER 
                  ? 'bg-blue-600 text-white rounded-tr-sm' 
                  : 'bg-gray-800 border border-gray-700 text-gray-200 rounded-tl-sm'
                }
              `}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                
                {/* Tool Viz */}
                {msg.isToolCall && (
                  <div className="mt-3 pt-3 border-t border-gray-600/50">
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                      <Terminal className="w-3 h-3" />
                      <span className="font-mono">Executed: {msg.toolName}</span>
                    </div>
                    <div className="bg-gray-950/50 rounded p-2 font-mono text-[10px] text-emerald-400 overflow-x-auto border border-gray-700/50">
                      {JSON.stringify(msg.toolResult, null, 2)}
                    </div>
                  </div>
                )}
                
                <span className="text-[10px] opacity-50 absolute bottom-1 right-3">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              {/* Avatar Icon */}
              <div className="mt-2 text-gray-600">
                 {msg.role === MessageRole.USER ? <UserIcon className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-emerald-500/50" />}
              </div>

            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 text-sm pl-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/80">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Book yoga for tomorrow..."
              className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-gray-200 placeholder-gray-600"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl p-3 transition-all flex items-center justify-center aspect-square"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel: Database Visualization */}
      <div className="flex-1 bg-gray-950 flex flex-col h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-gray-900/0 to-black pointer-events-none"></div>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              PostgreSQL / Redis State
            </h2>
            <p className="text-sm text-gray-500 mt-1">Live reflection of database records</p>
          </div>
          <div className="flex gap-4 text-xs font-mono text-gray-500">
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available
             </div>
             <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-red-500"></span> Full
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {slots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;

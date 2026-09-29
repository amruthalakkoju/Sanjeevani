import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  RotateCcw, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
}

interface N8nChatWidgetProps {
  webhookUrl?: string;
  isOpen?: boolean;
  onToggleOpen?: (open: boolean) => void;
  onOpenBooking?: (doctorName?: string, department?: string) => void;
  onOpenLabReports?: () => void;
}

const DEFAULT_WEBHOOK_URL = 'https://amruthalakkoju.app.n8n.cloud/webhook/0390b0c0-fa06-4e26-a8d6-f83a8cc03b59/chat';

export const N8nChatWidget: React.FC<N8nChatWidgetProps> = ({
  webhookUrl = DEFAULT_WEBHOOK_URL,
  isOpen: externalIsOpen,
  onToggleOpen,
  onOpenBooking,
  onOpenLabReports,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const setIsOpen = (val: boolean) => {
    setInternalIsOpen(val);
    if (onToggleOpen) {
      onToggleOpen(val);
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: 'Namaste! I am **Sanjeevani AI**, the official virtual assistant for **Sanjeevani Super Speciality Hospital & Research Institute**.\n\nHow may I assist you today? I can help you with:\n* **Doctor Information:** Finding specialists, their timings, and consultation fees.\n* **Departments:** Information on our various centres of excellence.\n* **Campuses:** Locating our hospitals in New Delhi, Bengaluru, Hyderabad, or Mumbai.\n* **Health Packages:** Details on preventive health check-ups.\n* **Insurance & Ayushman Bharat:** Information on TPAs and government schemes.\n* **Emergency Services:** Quick access to our 24/7 helplines.\n\nPlease let me know how I can help! For any medical emergency, please call our national toll-free number **1066** immediately.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => {
    let saved = localStorage.getItem('sanjeevani_n8n_session_id');
    if (!saved) {
      saved = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('sanjeevani_n8n_session_id', saved);
    }
    return saved;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const quickPrompts = [
    'Which doctors specialize in Cardiology?',
    'Is Ayushman Bharat (PM-JAY) cashless here?',
    'How do I book an OPD consultation?',
    'Check live bed availability',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Standard n8n Chat Webhook payload format
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: text,
          sessionId: sessionId,
          message: text,
        }),
      });

      const responseText = await response.text();
      let botResponse = '';
      let isWorkflowError = false;

      try {
        const parsed = JSON.parse(responseText);
        
        if (parsed.message === 'Error in workflow' || parsed.error) {
          isWorkflowError = true;
          botResponse = `⚠️ Notice from n8n Workflow: "${parsed.message || parsed.error}". Please check the LLM node execution in your n8n workflow.`;
        } else {
          // n8n returns { output: "..." } or { text: "..." }
          botResponse = parsed.output || parsed.text || parsed.response || parsed.message || (Array.isArray(parsed) && parsed[0]?.output) || JSON.stringify(parsed);
        }
      } catch (e) {
        if (response.ok) {
          botResponse = responseText;
        } else {
          isWorkflowError = true;
          botResponse = `Error (${response.status}): ${responseText || 'Unable to get response from n8n webhook.'}`;
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: isWorkflowError,
        },
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err_' + Date.now(),
          sender: 'system',
          text: `Could not connect to n8n webhook: ${err.message || 'Network error'}. Please verify active status of your n8n cloud workflow.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    const newSession = 'session_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
    setSessionId(newSession);
    localStorage.setItem('sanjeevani_n8n_session_id', newSession);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Conversation restarted. How can I assist you with Sanjeevani Hospital services today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper to parse basic markdown bold (**text**) and bullet lists
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lIdx) => {
      // Bold regex
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-slate-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return (
          <li key={lIdx} className="ml-4 list-disc text-xs leading-relaxed text-slate-800">
            {renderedLine.slice(1)}
          </li>
        );
      }

      return (
        <p key={lIdx} className={line.trim() === '' ? 'h-2' : 'leading-relaxed'}>
          {renderedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Launcher Button at Bottom Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-teal-800 hover:bg-teal-900 text-white rounded-2xl p-4 shadow-xl border border-teal-700/80 flex items-center gap-3 transition-all transform hover:scale-105 group cursor-pointer no-print"
          aria-label="Open Sanjeevani n8n AI Chatbot"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center font-bold text-white shadow-xs">
              <Bot className="w-5 h-5 text-teal-100" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-teal-900 rounded-full animate-pulse" />
          </div>

          <div className="text-left hidden sm:block pr-1">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold tracking-wide text-white">
                Sanjeevani AI Care
              </span>
              <span className="text-[10px] bg-teal-700 text-teal-200 px-1.5 py-0.2 rounded font-mono-data">
                n8n
              </span>
            </div>
            <p className="text-[11px] text-teal-200 mt-0.5">
              24x7 Patient Assistant · Ask anything
            </p>
          </div>
        </button>
      )}

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] h-[600px] max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 no-print">
          
          {/* Header Bar */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center font-bold text-white shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    Sanjeevani Assistant
                  </h3>
                  <span className="text-[10px] font-mono-data bg-teal-900 text-teal-300 border border-teal-700/60 px-1.5 py-0.2 rounded">
                    n8n Chatbot
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · amruthalakkoju.app.n8n.cloud</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize chat"
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Webhook Notice Bar */}
          <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
            <span className="truncate max-w-[280px] font-mono-data">
              Webhook: /webhook/0390...3b59/chat
            </span>
            <a
              href="https://amruthalakkoju.app.n8n.cloud"
              target="_blank"
              rel="noreferrer"
              className="text-teal-700 hover:underline flex items-center gap-0.5 font-medium shrink-0"
            >
              <span>n8n Cloud</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender !== 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    SJH
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-xl p-3 shadow-2xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-teal-700 text-white rounded-br-xs whitespace-pre-wrap'
                      : msg.isError
                      ? 'bg-amber-50 text-amber-900 border border-amber-200 rounded-bl-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  <div className="space-y-1">
                    {msg.sender === 'user' ? msg.text : renderFormattedMarkdown(msg.text)}
                  </div>
                  <span
                    className={`block text-[9px] mt-1 text-right font-mono-data ${
                      msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    You
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-500 text-xs">
                <div className="w-7 h-7 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                  SJH
                </div>
                <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-500 ml-1">Sanjeevani AI is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 rounded-lg whitespace-nowrap border border-slate-200 transition-colors shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Quick Hospital Action Buttons inside Chat */}
          <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Quick Actions:</span>
            <div className="flex items-center gap-2">
              {onOpenBooking && (
                <button
                  onClick={() => onOpenBooking()}
                  className="text-teal-700 hover:underline font-semibold cursor-pointer"
                >
                  Book OPD Slot
                </button>
              )}
              {onOpenLabReports && (
                <>
                  <span className="text-slate-300">·</span>
                  <button
                    onClick={() => onOpenLabReports()}
                    className="text-teal-700 hover:underline font-semibold cursor-pointer"
                  >
                    Lab Reports
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your question for Sanjeevani AI..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
              className="flex-1 text-xs bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-teal-600 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl transition-colors disabled:opacity-40 cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};

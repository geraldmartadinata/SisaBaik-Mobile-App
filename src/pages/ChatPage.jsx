import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ChatPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chatName = searchParams.get('name') || 'Toko / Pembeli';
  
  const [messages, setMessages] = useState([
    { id: 1, text: 'Halo! Pesanan saya apakah sudah bisa diambil?', sender: 'me', time: '14:30' },
    { id: 2, text: 'Halo kak, sedang kami siapkan ya. Sekitar 5 menit lagi siap.', sender: 'them', time: '14:32' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: newMessage,
        sender: 'me',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setNewMessage('');
  };

  return (
    <div className="page-wrapper bg-gray-50 flex flex-col page-transition h-full">
      {/* Header */}
      <div className="flex-none bg-white px-5 py-4 flex items-center gap-4 shadow-sm z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-90 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
            {chatName.charAt(0)}
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-gray-900 leading-tight">{chatName}</h1>
            <p className="text-xs text-primary-600 font-medium">Online</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm ${
              msg.sender === 'me' 
                ? 'bg-primary-600 text-white rounded-tr-sm' 
                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
            }`}>
              <p className="text-[14px] leading-relaxed">{msg.text}</p>
              <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-primary-100' : 'text-gray-400'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-none bg-white p-4 pb-8 border-t border-gray-100">
        <form onSubmit={handleSend} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="w-full bg-gray-100 border-transparent focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500 rounded-full pl-4 pr-12 py-3 text-sm transition-all"
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
          </div>
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:bg-gray-300 active:scale-95 transition-all shadow-md shadow-primary-600/30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

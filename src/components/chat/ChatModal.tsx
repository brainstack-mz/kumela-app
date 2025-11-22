"use client";

import { useState, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

interface Message {
  id: number;
  from: string;
  to: string;
  text: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: number;
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const mockConversations: Conversation[] = [
  { id: 1, userId: "842934326", userName: "João Cliente", lastMessage: "Olá, quando será a entrega?", timestamp: "10:30", unread: 2 },
  { id: 2, userId: "861998877", userName: "Maria Vendedora", lastMessage: "Produto disponível", timestamp: "09:15", unread: 0 },
];

const getMockMessages = (userPhone: string): Record<string, Message[]> => ({
  "842934326": [
    { id: 1, from: "842934326", to: userPhone, text: "Olá, quando será a entrega?", timestamp: "10:30", read: false },
    { id: 2, from: userPhone, to: "842934326", text: "A entrega será em 2-3 dias", timestamp: "10:35", read: true },
  ],
});

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [conversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedConversation && user?.numero) {
      const mockMsgs = getMockMessages(user.numero);
      if (mockMsgs[selectedConversation]) {
        setMessages(mockMsgs[selectedConversation]);
      }
    }
  }, [selectedConversation, user?.numero]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now(),
      from: user?.numero || "",
      to: selectedConversation,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString("pt-MZ", { hour: "2-digit", minute: "2-digit" }),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl w-full max-w-4xl h-[600px] flex shadow-2xl`}>
        {/* Conversations List */}
        <div className={`w-1/3 border-r ${theme === "dark" ? "border-gray-700" : "border-gray-200"} flex flex-col`}>
          <div className={`p-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Conversas</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.userId)}
                className={`w-full p-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  selectedConversation === conv.userId ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">{conv.userName}</span>
                  {conv.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-1">{conv.timestamp}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className={`p-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"} flex items-center justify-between`}>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {conversations.find((c) => c.userId === selectedConversation)?.userName}
                </h3>
                <button onClick={onClose} className="text-gray-600 dark:text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.from === user?.numero ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.from === user?.numero
                          ? "bg-green-600 text-white"
                          : theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-xs mt-1 ${
                        msg.from === user?.numero ? "text-green-100" : "text-gray-500"
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`p-4 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"} flex gap-2`}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 p-3 border rounded-lg bg-white dark:bg-gray-700"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Selecione uma conversa</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


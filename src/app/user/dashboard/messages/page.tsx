// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/messages/page.tsx — Mensagens / Chat
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { MessageCircle, Send, ArrowLeft } from "lucide-react";
import { SectionHeader, EmptyState, AvatarInitials } from "@/components/ui";
import { chatContacts, chatMessages, type ChatContact } from "@/data/userData";

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState<ChatContact | null>(null);
  const [message,       setMessage]       = useState("");
  const [messages,      setMessages]      = useState(chatMessages);

  const contactMessages = messages.filter((m) => m.contactId === activeContact?.id);

  const sendMessage = () => {
    if (!message.trim() || !activeContact) return;
    setMessages((prev) => [
      ...prev,
      { id: `M${Date.now()}`, contactId: activeContact.id, from: "me", text: message.trim(), time: new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" }), read: true },
    ]);
    setMessage("");
  };

  return (
<div className="p-4 md:p-6 space-y-6 w-full">
      {!activeContact ? (
        <>
          <SectionHeader title="Mensagens" subtitle={`${chatContacts.filter((c) => c.unread > 0).length} conversas com mensagens por ler`} />
          <div className="space-y-2">
            {chatContacts.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveContact(c)}
                className="w-full flex items-center gap-3 p-4 bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 hover:border-green-300 dark:hover:border-green-700 transition-all text-left min-h-[72px]"
              >
                <div className="relative flex-shrink-0">
                  <AvatarInitials name={c.name} size="md" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#0D1F10] ${c.online ? "bg-green-500" : "bg-gray-300"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500">{c.time}</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{c.lastMessage}</p>
                  <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold mt-0.5">{c.role}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 bg-green-600 text-white text-[10px] font-black rounded-full flex items-center justify-center flex-shrink-0">
                    {c.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col h-[calc(100vh-140px)]">
          {/* Header do chat */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100 dark:border-green-900/30">
            <button onClick={() => setActiveContact(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft size={18} className="text-gray-500" />
            </button>
            <AvatarInitials name={activeContact.name} size="md" />
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{activeContact.name}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">{activeContact.role} · {activeContact.online ? "Online" : "Offline"}</p>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto space-y-3 pb-4">
            {contactMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle size={32} className="mx-auto text-gray-300 dark:text-gray-700 mb-2" />
                <p className="text-sm text-gray-400 dark:text-gray-500">Início da conversa</p>
              </div>
            ) : contactMessages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div className={[
                  "max-w-[75%] px-4 py-2.5 rounded-2xl text-sm",
                  m.from === "me"
                    ? "bg-green-600 text-white rounded-br-sm"
                    : "bg-white dark:bg-[#0D1F10] text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-green-900/30 rounded-bl-sm",
                ].join(" ")}>
                  <p className="leading-relaxed">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === "me" ? "text-green-200" : "text-gray-400 dark:text-gray-500"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input de mensagem */}
          <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-green-900/30">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escreva uma mensagem…"
              className="flex-1 px-4 py-3 text-sm rounded-xl bg-gray-50 dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-400 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              aria-label="Enviar mensagem"
              className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-green-600/20"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
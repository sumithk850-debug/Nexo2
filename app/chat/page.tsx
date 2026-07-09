"use client";

import { useState, useRef, useEffect } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatInput } from "@/components/ChatInput";
import { MessageBubble } from "@/components/MessageBubble";
import { TypingIndicator } from "@/components/TypingIndicator";
import { Signal } from "@/components/Signal";
import { getPublicModel, type NexoModelId } from "@/lib/models";
import type { ChatMessage } from "@/lib/types";

const UNLOCKED_TIERS = ["Free"];

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState<NexoModelId>("nexio-1.1");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    const assistantId = crypto.randomUUID();

    const nextMessages = [...messages, userMsg];
    setMessages([...nextMessages, { id: assistantId, role: "assistant", content: "", modelId: selectedModel }]);
    setInput("");
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modelId: selectedModel,
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Something went wrong reaching NEXO. Please try again." }
            : m
        )
      );
    } finally {
      setIsStreaming(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setInput("");
  }

  const activeModel = getPublicModel(selectedModel);

  return (
    <div className="flex h-screen bg-void">
      <ChatSidebar
        selected={selectedModel}
        onSelect={(id) => {
          setSelectedModel(id);
          setSidebarOpen(false);
        }}
        unlockedTiers={UNLOCKED_TIERS}
        onNewChat={handleNewChat}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-edge px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-ink-muted hover:text-ink"
            aria-label="Open sidebar"
          >
            <Signal size="sm" />
          </button>
          <p className="font-display text-sm font-semibold text-ink">{activeModel?.name}</p>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState modelName={activeModel?.name ?? ""} />
          ) : (
            <div className="mx-auto max-w-3xl py-4">
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {isStreaming && messages[messages.length - 1]?.content === "" && (
                <TypingIndicator />
              )}
            </div>
          )}
        </div>

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          disabled={isStreaming}
          onOpenSidebar={() => setSidebarOpen(true)}
        />
      </div>
    </div>
  );
}

function EmptyState({ modelName }: { modelName: string }) {
  const suggestions = [
    "Explain quantum computing simply",
    "Write a birthday wish in Sinhala",
    "Help me plan a weekend trip",
    "Debug this JavaScript function",
  ];

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <Signal size="lg" />
      <h2 className="mt-6 font-display text-2xl font-bold text-ink">
        Chatting with {modelName}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        Ask anything. Switch models anytime from the sidebar.
      </p>
      <div className="mt-8 grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
        {suggestions.map((s) => (
          <div
            key={s}
            className="rounded-xl border border-edge bg-panel px-4 py-3 text-left text-sm text-ink-muted"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useRef, type KeyboardEvent } from "react";
import { ArrowUp, Menu } from "lucide-react";

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  onOpenSidebar,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
  onOpenSidebar: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  }

  return (
    <div className="border-t border-edge bg-void/95 px-4 py-4 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <button
          onClick={onOpenSidebar}
          className="mb-1 flex-shrink-0 text-ink-muted hover:text-ink md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-1 items-end gap-2 rounded-2xl border border-edge bg-panel px-4 py-2.5 focus-within:border-cyan/50">
          <textarea
            ref={ref}
            rows={1}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message NEXO…"
            className="max-h-40 flex-1 resize-none bg-transparent py-1.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <button
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className="mb-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan text-void transition disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Send message"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
      <p className="mt-2 text-center text-[11px] text-ink-faint">
        NEXO can make mistakes. Verify important information.
      </p>
    </div>
  );
            }

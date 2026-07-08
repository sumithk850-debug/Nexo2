"use client";

import Link from "next/link";
import { ModelPicker } from "./ModelPicker";
import { Signal } from "./Signal";
import type { NexoModelId } from "@/lib/models";
import { Plus, X } from "lucide-react";

export function ChatSidebar({
  selected,
  onSelect,
  unlockedTiers,
  onNewChat,
  open,
  onClose,
}: {
  selected: NexoModelId;
  onSelect: (id: NexoModelId) => void;
  unlockedTiers: string[];
  onNewChat: () => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-edge bg-panel transition-transform md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-edge px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Signal size="sm" />
            <span className="font-display text-base font-bold text-ink">
              NEXO<span className="text-cyan">AI</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="text-ink-muted hover:text-ink md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-edge px-4 py-2.5 text-sm font-medium text-ink transition hover:border-cyan/40 hover:bg-panel-raised"
          >
            <Plus className="h-4 w-4" />
            New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Models
          </p>
          <ModelPicker
            selected={selected}
            onSelect={onSelect}
            unlockedTiers={unlockedTiers}
          />
        </div>

        <div className="border-t border-edge p-4">
          <Link
            href="/pricing"
            className="block rounded-lg bg-gradient-to-r from-indigo/20 to-cyan/10 p-4 transition hover:from-indigo/30 hover:to-cyan/20"
          >
            <p className="font-display text-sm font-semibold text-ink">
              Unlock all models
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Plans start at $1.67/month
            </p>
          </Link>
        </div>
      </aside>
    </>
  );
}

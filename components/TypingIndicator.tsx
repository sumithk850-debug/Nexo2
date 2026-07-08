import { Signal } from "./Signal";

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-edge bg-panel">
        <Signal size="sm" />
      </div>
      <span className="font-mono text-xs text-ink-muted">generating…</span>
    </div>
  );
}

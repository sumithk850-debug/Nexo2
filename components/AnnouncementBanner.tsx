"use client";

import { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Announcement {
  id: string;
  title: string;
  message: string;
}

const DISMISS_KEY_PREFIX = "nexo_dismissed_announcement_";

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("announcements")
        .select("id, title, message")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setAnnouncement(data);
        const wasDismissed = localStorage.getItem(DISMISS_KEY_PREFIX + data.id);
        setDismissed(!!wasDismissed);
      }
    }
    load();
  }, []);

  function handleDismiss() {
    if (announcement) {
      localStorage.setItem(DISMISS_KEY_PREFIX + announcement.id, "1");
    }
    setDismissed(true);
  }

  if (!announcement || dismissed) return null;

  return (
    <div className="flex items-center gap-3 border-b border-cyan/30 bg-cyan/10 px-4 py-2.5">
      <Sparkles className="h-4 w-4 flex-shrink-0 text-cyan" />
      <p className="min-w-0 flex-1 truncate text-sm text-ink">
        <span className="font-semibold">{announcement.title}</span>
        <span className="text-ink-muted"> — {announcement.message}</span>
      </p>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 text-ink-faint hover:text-ink"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

import { Dream, DreamInsert, Milestone } from "@/types/dreams";

const KEY = "zanvore_dreams";

function generateId(): string {
  return crypto.randomUUID();
}

function load(): Dream[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(dreams: Dream[]): void {
  localStorage.setItem(KEY, JSON.stringify(dreams));
}

export const dreamsStore = {
  getAll(): Dream[] {
    return load().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  getById(id: string): Dream | undefined {
    return load().find((d) => d.id === id);
  },

  create(data: DreamInsert): Dream {
    const dreams = load();
    const now = new Date().toISOString();
    const dream: Dream = {
      ...data,
      id: generateId(),
      user_id: "local",
      milestones: data.milestones ?? [],
      secondary_categories: data.secondary_categories ?? [],
      created_at: now,
      updated_at: now,
    };
    save([dream, ...dreams]);
    return dream;
  },

  update(id: string, data: Partial<DreamInsert>): Dream | null {
    const dreams = load();
    const idx = dreams.findIndex((d) => d.id === id);
    if (idx === -1) return null;
    const updated: Dream = {
      ...dreams[idx],
      ...data,
      updated_at: new Date().toISOString(),
    };
    dreams[idx] = updated;
    save(dreams);
    return updated;
  },

  delete(id: string): void {
    save(load().filter((d) => d.id !== id));
  },

  addMilestone(dreamId: string, milestone: Omit<Milestone, "id">): Dream | null {
    const dream = dreamsStore.getById(dreamId);
    if (!dream) return null;
    const milestones: Milestone[] = [
      ...(dream.milestones ?? []),
      { ...milestone, id: generateId() },
    ];
    return dreamsStore.update(dreamId, { milestones });
  },

  toggleMilestone(dreamId: string, milestoneId: string): Dream | null {
    const dream = dreamsStore.getById(dreamId);
    if (!dream) return null;
    const milestones = (dream.milestones ?? []).map((m) =>
      m.id === milestoneId ? { ...m, done: !m.done } : m
    );
    return dreamsStore.update(dreamId, { milestones });
  },
};

// Compteur Dream Architect (localStorage)
const MSG_KEY = "zanvore_da_count";

interface MsgCount { count: number; date: string }

export const architectStore = {
  getCount(): number {
    if (typeof window === "undefined") return 0;
    try {
      const raw = localStorage.getItem(MSG_KEY);
      if (!raw) return 0;
      const data: MsgCount = JSON.parse(raw);
      const today = new Date().toISOString().slice(0, 10);
      if (data.date !== today) {
        this.reset();
        return 0;
      }
      return data.count;
    } catch {
      return 0;
    }
  },

  increment(): number {
    const count = this.getCount() + 1;
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(MSG_KEY, JSON.stringify({ count, date: today }));
    return count;
  },

  reset(): void {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(MSG_KEY, JSON.stringify({ count: 0, date: today }));
  },
};

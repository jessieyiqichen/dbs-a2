"use client";
// The visitor's list and filter choices, shared by the index and every walk page. Held in memory only:
// it survives moving between pages, and a reload clears it. Nothing is stored.
import { createContext, useContext, useMemo, useState } from "react";
import { NO_FILTERS, toggle, type Filters } from "./filters";

type TrailsState = {
  list: string[];
  toggleList: (id: string) => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
};

const Ctx = createContext<TrailsState | null>(null);

export function TrailsProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>(NO_FILTERS);
  const value = useMemo(() => ({ list, toggleList: (id: string) => setList((cur) => toggle(cur, id)), filters, setFilters }), [list, filters]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTrails(): TrailsState {
  const s = useContext(Ctx);
  if (!s) throw new Error("useTrails must be used inside TrailsProvider");
  return s;
}

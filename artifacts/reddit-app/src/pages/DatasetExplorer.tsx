import { useState, useEffect, useCallback, useMemo } from "react";
import { useDatasetStore } from "@/store/datasetStore";
import type { DatasetRecord } from "@/store/datasetStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search, Database, BarChart3, Filter, ChevronLeft, ChevronRight,
  ArrowUpDown, ArrowUp, ArrowDown, X, Eye, ExternalLink, Loader2,
  TrendingUp, Users, Image as ImageIcon, AlertTriangle, Calendar
} from "lucide-react";

/* ───────────────────────── helpers ───────────────────────── */

function fmtNum(n: number) {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000 ? `${(n / 1_000).toFixed(1)}K` : String(n);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/* ───────────────────── stat card ─────────────────────────── */

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: any; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-card-border rounded-xl p-4 flex items-start gap-3 hover:border-primary/30 transition-all">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
        <p className="text-xl font-bold tabular-nums">{typeof value === "number" ? fmtNum(value) : value}</p>
        {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );
}

/* ──────────────────── bar chart (pure CSS) ───────────────── */

function MiniBar({ data, labelKey, valueKey }: { data: any[]; labelKey: string; valueKey: string }) {
  const max = Math.max(...data.map(d => d[valueKey]), 1);
  return (
    <div className="flex flex-col gap-1.5">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-16 text-muted-foreground truncate text-right shrink-0">{d[labelKey]}</span>
          <div className="flex-1 h-5 bg-muted/50 rounded overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${(d[valueKey] / max) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded" />
          </div>
          <span className="w-10 text-muted-foreground tabular-nums">{fmtNum(d[valueKey])}</span>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────── record detail modal ────────────────── */

function RecordModal({ record, onClose }: { record: DatasetRecord; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-card border border-card-border rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-bold text-lg leading-snug pr-4">{record.title}</h3>
            <Button variant="ghost" size="icon" className="shrink-0" onClick={onClose}><X className="w-4 h-4" /></Button>
          </div>
          {record.media && (
            <div className="rounded-lg overflow-hidden mb-4 bg-muted">
              <img src={record.media} alt={record.title} className="w-full max-h-72 object-contain" loading="lazy"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-muted/40 rounded-lg p-3"><p className="text-muted-foreground text-xs mb-1">Author</p><p className="font-medium">u/{record.author}</p></div>
            <div className="bg-muted/40 rounded-lg p-3"><p className="text-muted-foreground text-xs mb-1">Score</p><p className="font-medium text-primary">{fmtNum(record.ups)}</p></div>
            <div className="bg-muted/40 rounded-lg p-3"><p className="text-muted-foreground text-xs mb-1">Posted</p><p className="font-medium">{fmtDate(record.createdAt)}</p></div>
            <div className="bg-muted/40 rounded-lg p-3"><p className="text-muted-foreground text-xs mb-1">Reddit ID</p><p className="font-medium font-mono text-xs">{record.id}</p></div>
          </div>
          {record.isNsfw && (
            <div className="mt-3 flex items-center gap-2 text-destructive text-xs font-bold bg-destructive/10 rounded-lg p-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Flagged as NSFW
            </div>
          )}
          {record.media && (
            <a href={record.media} target="_blank" rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:underline">
              <ExternalLink className="w-3 h-3" /> Open original image
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ──────────────────── main page ──────────────────────────── */

export default function DatasetExplorer() {
  const store = useDatasetStore();
  const [activeTab, setActiveTab] = useState<"table" | "charts">("table");
  const [viewRecord, setViewRecord] = useState<DatasetRecord | null>(null);
  const [localSearch, setLocalSearch] = useState("");
  const [localAuthor, setLocalAuthor] = useState("");
  const [localMinScore, setLocalMinScore] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    store.fetchRecords();
    store.fetchMeta();
    store.fetchStats();
  }, []);

  const handleSearch = useCallback(() => {
    if (localSearch.trim()) {
      store.searchRecords(localSearch);
    } else {
      store.clearSearch();
    }
  }, [localSearch]);

  const handleApplyFilters = useCallback(() => {
    store.setAuthorFilter(localAuthor);
    store.setMinScore(localMinScore);
    store.fetchRecords();
  }, [localAuthor, localMinScore]);

  const displayRecords = store.isSearchActive ? store.searchResults : store.records;
  const displayTotal = store.isSearchActive ? store.searchTotal : store.total;
  const totalPages = Math.ceil(displayTotal / store.limit) || 1;

  const tabs = [
    { key: "table" as const, label: "Data Table", icon: Database },
    { key: "charts" as const, label: "Visualizations", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col gap-4 pb-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/10 via-card to-card border border-card-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Dataset Explorer</h1>
            <p className="text-sm text-muted-foreground">
              Reddit Memes Dataset — {store.meta ? `${fmtNum(store.meta.totalRecords)} records` : "Loading..."}
              {store.meta && ` · ${(store.meta.fileSizeBytes / 1024 / 1024).toFixed(1)}MB`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      {store.stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={Database} label="Total Records" value={store.stats.totalRecords} color="bg-primary/15 text-primary" />
          <StatCard icon={TrendingUp} label="Avg Score" value={store.stats.avgUpvotes} sub={`Max: ${fmtNum(store.stats.maxUpvotes)}`} color="bg-green-500/15 text-green-500" />
          <StatCard icon={Users} label="Unique Authors" value={store.stats.uniqueAuthors} color="bg-blue-500/15 text-blue-500" />
          <StatCard icon={AlertTriangle} label="NSFW Content" value={store.stats.nsfwCount} sub={`${((store.stats.nsfwCount / store.stats.totalRecords) * 100).toFixed(1)}%`} color="bg-red-500/15 text-red-500" />
        </div>
      )}

      {/* Tabs */}
      <div className="bg-card border border-card-border rounded-xl p-2 flex gap-1">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted"}`}>
            <t.icon className="w-4 h-4" /> {t.label}
          </button>
        ))}
      </div>

      {activeTab === "table" && (
        <>
          {/* Search + Filters bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={localSearch} onChange={e => setLocalSearch(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder="Search titles & authors..."
                  className="w-full pl-9 pr-3 py-2 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
              <Button onClick={handleSearch} size="sm" className="shrink-0 px-4">
                {store.isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
              </Button>
              {store.isSearchActive && (
                <Button variant="ghost" size="sm" onClick={() => { setLocalSearch(""); store.clearSearch(); }}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filters
            </Button>
          </div>

          {/* Collapsible filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden">
                <div className="bg-card border border-card-border rounded-xl p-4 flex flex-wrap gap-3 items-end">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Author</label>
                    <input value={localAuthor} onChange={e => setLocalAuthor(e.target.value)}
                      placeholder="Filter by author" className="px-3 py-1.5 bg-muted/50 border border-card-border rounded-lg text-sm w-40" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Min Score</label>
                    <input value={localMinScore} onChange={e => setLocalMinScore(e.target.value)} type="number"
                      placeholder="0" className="px-3 py-1.5 bg-muted/50 border border-card-border rounded-lg text-sm w-28" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Content</label>
                    <select value={store.nsfwFilter} onChange={e => store.setNsfwFilter(e.target.value as any)}
                      className="px-3 py-1.5 bg-muted/50 border border-card-border rounded-lg text-sm">
                      <option value="all">All</option>
                      <option value="sfw">SFW Only</option>
                      <option value="nsfw">NSFW Only</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Sort By</label>
                    <select value={store.sort} onChange={e => store.setSort(e.target.value as any)}
                      className="px-3 py-1.5 bg-muted/50 border border-card-border rounded-lg text-sm">
                      <option value="ups">Score</option>
                      <option value="created_utc">Date</option>
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                    </select>
                  </div>
                  <Button size="sm" onClick={handleApplyFilters} className="h-8">Apply</Button>
                  <Button size="sm" variant="ghost" onClick={() => { setLocalAuthor(""); setLocalMinScore(""); store.clearFilters(); }} className="h-8">Clear</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
            <span>{store.isSearchActive ? `${displayTotal} search results` : `${displayTotal} records`}</span>
            <div className="flex items-center gap-2">
              <button onClick={() => store.setOrder(store.order === "desc" ? "asc" : "desc")}
                className="flex items-center gap-1 hover:text-foreground transition-colors">
                {store.order === "desc" ? <ArrowDown className="w-3.5 h-3.5" /> : <ArrowUp className="w-3.5 h-3.5" />}
                {store.order === "desc" ? "Highest first" : "Lowest first"}
              </button>
            </div>
          </div>

          {/* Table */}
          {store.isLoading || store.isSearching ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
            </div>
          ) : store.error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center">
              <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
              <p className="font-medium text-destructive">{store.error}</p>
            </div>
          ) : displayRecords.length === 0 ? (
            <div className="bg-card border border-card-border rounded-xl p-12 text-center">
              <Database className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="font-medium">No records found</p>
              <p className="text-muted-foreground text-sm">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="bg-card border border-card-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-card-border bg-muted/30">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground w-8">#</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Title</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Author</th>
                      <th className="text-right px-4 py-3 font-medium text-muted-foreground">Score</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                      <th className="text-center px-4 py-3 font-medium text-muted-foreground w-16">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayRecords.map((r, i) => (
                      <motion.tr key={r.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ delay: Math.min(i * 0.02, 0.3) }}
                        className="border-b border-card-border/50 hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => setViewRecord(r)}>
                        <td className="px-4 py-3 text-muted-foreground tabular-nums">{(store.page - 1) * store.limit + i + 1}</td>
                        <td className="px-4 py-3 max-w-xs">
                          <div className="flex items-center gap-2">
                            {r.media && (
                              <div className="w-8 h-8 rounded bg-muted overflow-hidden shrink-0">
                                <img src={r.thumbnail?.thumbnail && r.thumbnail.thumbnail !== "nsfw" ? r.thumbnail.thumbnail : r.media}
                                  alt="" className="w-full h-full object-cover" loading="lazy"
                                  onError={e => { (e.target as HTMLImageElement).src = ""; (e.target as HTMLImageElement).className = "hidden"; }} />
                              </div>
                            )}
                            <span className="truncate font-medium">{r.title}</span>
                            {r.isNsfw && <span className="shrink-0 text-[9px] font-bold text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">NSFW</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">u/{r.author}</td>
                        <td className="px-4 py-3 text-right font-medium text-primary tabular-nums">{fmtNum(r.ups)}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{fmtDate(r.createdAt)}</td>
                        <td className="px-4 py-3 text-center">
                          <Button variant="ghost" size="icon" className="w-7 h-7" onClick={e => { e.stopPropagation(); setViewRecord(r); }}>
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!store.isSearchActive && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-card-border bg-muted/20">
                  <p className="text-xs text-muted-foreground">
                    Showing {(store.page - 1) * store.limit + 1}–{Math.min(store.page * store.limit, store.total)} of {store.total}
                  </p>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="w-8 h-8" disabled={store.page <= 1}
                      onClick={() => store.setPage(store.page - 1)}><ChevronLeft className="w-4 h-4" /></Button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const p = store.page <= 3 ? i + 1 : store.page + i - 2;
                      if (p < 1 || p > totalPages) return null;
                      return (
                        <Button key={p} variant={p === store.page ? "default" : "outline"} size="icon"
                          className="w-8 h-8 text-xs" onClick={() => store.setPage(p)}>{p}</Button>
                      );
                    })}
                    <Button variant="outline" size="icon" className="w-8 h-8" disabled={store.page >= totalPages}
                      onClick={() => store.setPage(store.page + 1)}><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Charts tab */}
      {activeTab === "charts" && store.stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Score Distribution</h3>
            <MiniBar data={store.stats.scoreDistribution} labelKey="bucket" valueKey="count" />
          </div>
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-blue-500" /> Top Authors</h3>
            <MiniBar data={store.stats.topAuthors.slice(0, 10)} labelKey="author" valueKey="count" />
          </div>
          <div className="bg-card border border-card-border rounded-xl p-5 md:col-span-2">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-green-500" /> Posts by Month</h3>
            <MiniBar data={store.stats.postsByMonth} labelKey="month" valueKey="count" />
          </div>
          {/* Schema info */}
          {store.meta && (
            <div className="bg-card border border-card-border rounded-xl p-5 md:col-span-2">
              <h3 className="font-semibold mb-3 flex items-center gap-2"><Database className="w-4 h-4 text-primary" /> Schema Discovery</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-card-border"><th className="text-left py-2 px-3 text-muted-foreground">Column</th><th className="text-left py-2 px-3 text-muted-foreground">Type</th></tr></thead>
                  <tbody>
                    {Object.entries(store.meta.columnTypes).map(([col, type]) => (
                      <tr key={col} className="border-b border-card-border/30"><td className="py-2 px-3 font-mono text-xs">{col}</td><td className="py-2 px-3 text-muted-foreground">{type}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "charts" && store.isStatsLoading && (
        <div className="flex flex-col gap-3">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}</div>
      )}

      {/* Record detail modal */}
      <AnimatePresence>{viewRecord && <RecordModal record={viewRecord} onClose={() => setViewRecord(null)} />}</AnimatePresence>
    </div>
  );
}

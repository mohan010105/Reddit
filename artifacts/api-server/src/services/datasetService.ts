/**
 * Dataset Service — Loads, parses, and serves the Reddit memes dataset.
 *
 * Handles:
 *  - File discovery in the `Dataset` folder
 *  - Safe JSON parsing with error handling
 *  - Schema validation and normalisation
 *  - In-memory indexing for fast queries
 *  - Pagination, sorting, filtering, full-text search, and stats
 */

import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { logger } from "../lib/logger";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DatasetThumbnail {
  thumbnail: string;
  height: number;
  width: number;
}

export interface DatasetRecord {
  /** Internal sequential key from the db.json TinyDB format */
  key: string;
  title: string;
  thumbnail: DatasetThumbnail | null;
  created_utc: number;
  author: string;
  id: string;
  ups: number;
  downs: number;
  media: string;
  /** Computed — true when thumbnail.thumbnail === "nsfw" */
  isNsfw: boolean;
  /** ISO date string computed from created_utc */
  createdAt: string;
}

export interface DatasetMeta {
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
  totalRecords: number;
  columns: string[];
  sampleRecords: DatasetRecord[];
  columnTypes: Record<string, string>;
}

export interface DatasetStatsResult {
  totalRecords: number;
  totalUpvotes: number;
  avgUpvotes: number;
  maxUpvotes: number;
  minUpvotes: number;
  uniqueAuthors: number;
  nsfwCount: number;
  dateRange: { earliest: string; latest: string };
  topAuthors: Array<{ author: string; count: number; totalUps: number }>;
  scoreDistribution: Array<{ bucket: string; count: number }>;
  postsByMonth: Array<{ month: string; count: number }>;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ─── Service singleton ────────────────────────────────────────────────────────

class DatasetService {
  private records: DatasetRecord[] = [];
  private meta: DatasetMeta | null = null;
  private recordsByKey: Map<string, DatasetRecord> = new Map();
  private loaded = false;
  private loadError: string | null = null;

  /** Resolve dataset directory — walks up from api-server to project root */
  private resolveDatasetDir(): string {
    // api-server lives at <root>/artifacts/api-server
    // Dataset lives at <root>/Dataset
    const candidates = [
      join(process.cwd(), "Dataset"),
      join(process.cwd(), "dataset"),
      join(process.cwd(), "..", "..", "Dataset"),
      join(process.cwd(), "..", "..", "dataset"),
      join(process.cwd(), "..", "Dataset"),
      join(process.cwd(), "..", "dataset"),
    ];

    for (const dir of candidates) {
      if (existsSync(dir)) return dir;
    }

    throw new Error(
      `Dataset directory not found. Searched: ${candidates.join(", ")}`
    );
  }

  /** Discover files in the dataset folder */
  discoverFiles(): Array<{
    name: string;
    type: string;
    sizeBytes: number;
    path: string;
  }> {
    try {
      const dir = this.resolveDatasetDir();
      const files: Array<{
        name: string;
        type: string;
        sizeBytes: number;
        path: string;
      }> = [];

      const walk = (d: string) => {
        for (const entry of readdirSync(d)) {
          const full = join(d, entry);
          const stat = statSync(full);
          if (stat.isFile()) {
            files.push({
              name: entry,
              type: extname(entry).toLowerCase(),
              sizeBytes: stat.size,
              path: full,
            });
          } else if (stat.isDirectory() && entry !== "node_modules") {
            walk(full);
          }
        }
      };

      walk(dir);
      return files;
    } catch (err: any) {
      logger.error({ err }, "Failed to discover dataset files");
      return [];
    }
  }

  /** Load the dataset into memory. Idempotent. */
  load(): void {
    if (this.loaded) return;

    try {
      const dir = this.resolveDatasetDir();
      const dbPath = join(dir, "db.json");

      if (!existsSync(dbPath)) {
        this.loadError = `Dataset file not found at ${dbPath}`;
        logger.warn(this.loadError);
        this.loaded = true;
        return;
      }

      const stat = statSync(dbPath);
      const raw = readFileSync(dbPath, "utf-8");

      let parsed: any;
      try {
        parsed = JSON.parse(raw);
      } catch {
        this.loadError = "db.json contains invalid JSON";
        logger.error(this.loadError);
        this.loaded = true;
        return;
      }

      // TinyDB wraps records in a `_default` key
      const container = parsed._default ?? parsed;

      if (typeof container !== "object" || container === null) {
        this.loadError = "Unexpected dataset structure — expected object";
        logger.error(this.loadError);
        this.loaded = true;
        return;
      }

      const keys = Object.keys(container);
      const records: DatasetRecord[] = [];
      let skipped = 0;

      for (const key of keys) {
        const raw = container[key];
        if (!raw || typeof raw !== "object") {
          skipped++;
          continue;
        }

        // Validate required fields
        if (!raw.title || !raw.id) {
          skipped++;
          continue;
        }

        const thumb =
          raw.thumbnail && typeof raw.thumbnail === "object"
            ? raw.thumbnail
            : null;

        const isNsfw = thumb?.thumbnail === "nsfw";

        records.push({
          key,
          title: String(raw.title ?? ""),
          thumbnail: thumb
            ? {
                thumbnail: String(thumb.thumbnail ?? ""),
                height: Number(thumb.height ?? 0),
                width: Number(thumb.width ?? 0),
              }
            : null,
          created_utc: Number(raw.created_utc ?? 0),
          author: String(raw.author ?? "unknown"),
          id: String(raw.id),
          ups: Number(raw.ups ?? 0),
          downs: Number(raw.downs ?? 0),
          media: String(raw.media ?? ""),
          isNsfw,
          createdAt: raw.created_utc
            ? new Date(Number(raw.created_utc) * 1000).toISOString()
            : new Date().toISOString(),
        });
      }

      this.records = records;
      records.forEach((r) => this.recordsByKey.set(r.key, r));

      this.meta = {
        fileName: "db.json",
        fileType: ".json",
        fileSizeBytes: stat.size,
        totalRecords: records.length,
        columns: [
          "key",
          "title",
          "thumbnail",
          "created_utc",
          "author",
          "id",
          "ups",
          "downs",
          "media",
          "isNsfw",
          "createdAt",
        ],
        sampleRecords: records.slice(0, 5),
        columnTypes: {
          key: "string",
          title: "string",
          thumbnail: "object|null",
          created_utc: "number",
          author: "string",
          id: "string",
          ups: "number",
          downs: "number",
          media: "string",
          isNsfw: "boolean",
          createdAt: "string",
        },
      };

      this.loaded = true;
      logger.info(
        `Dataset loaded: ${records.length} records (${skipped} skipped)`
      );
    } catch (err: any) {
      this.loadError = err.message;
      this.loaded = true;
      logger.error({ err }, "Failed to load dataset");
    }
  }

  /** Ensure dataset is loaded; throws if there was a load error */
  private ensureLoaded(): void {
    if (!this.loaded) this.load();
    if (this.loadError) {
      throw new Error(`Dataset unavailable: ${this.loadError}`);
    }
  }

  /** Get dataset metadata / structure summary */
  getMeta(): DatasetMeta | null {
    this.ensureLoaded();
    return this.meta;
  }

  /** Paginated list with optional sorting and filtering */
  list(opts: {
    page?: number;
    limit?: number;
    sort?: "ups" | "created_utc" | "title" | "author";
    order?: "asc" | "desc";
    author?: string;
    minScore?: number;
    maxScore?: number;
    isNsfw?: boolean;
    startDate?: string;
    endDate?: string;
  }): PaginatedResult<DatasetRecord> {
    this.ensureLoaded();

    const page = Math.max(1, opts.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts.limit ?? 20));

    let filtered = [...this.records];

    // Filters
    if (opts.author) {
      const needle = opts.author.toLowerCase();
      filtered = filtered.filter((r) =>
        r.author.toLowerCase().includes(needle)
      );
    }
    if (opts.minScore !== undefined) {
      filtered = filtered.filter((r) => r.ups >= opts.minScore!);
    }
    if (opts.maxScore !== undefined) {
      filtered = filtered.filter((r) => r.ups <= opts.maxScore!);
    }
    if (opts.isNsfw !== undefined) {
      filtered = filtered.filter((r) => r.isNsfw === opts.isNsfw);
    }
    if (opts.startDate) {
      const start = new Date(opts.startDate).getTime() / 1000;
      filtered = filtered.filter((r) => r.created_utc >= start);
    }
    if (opts.endDate) {
      const end = new Date(opts.endDate).getTime() / 1000;
      filtered = filtered.filter((r) => r.created_utc <= end);
    }

    // Sort
    const sortField = opts.sort ?? "ups";
    const sortDir = opts.order ?? "desc";

    filtered.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "ups":
          cmp = a.ups - b.ups;
          break;
        case "created_utc":
          cmp = a.created_utc - b.created_utc;
          break;
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "author":
          cmp = a.author.localeCompare(b.author);
          break;
      }
      return sortDir === "desc" ? -cmp : cmp;
    });

    const total = filtered.length;
    const offset = (page - 1) * limit;
    const data = filtered.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return { data, total, page, limit, hasMore };
  }

  /** Get a single record by its key */
  getByKey(key: string): DatasetRecord | null {
    this.ensureLoaded();
    return this.recordsByKey.get(key) ?? null;
  }

  /** Full-text search across title and author */
  search(
    query: string,
    opts?: { page?: number; limit?: number }
  ): PaginatedResult<DatasetRecord> {
    this.ensureLoaded();

    const page = Math.max(1, opts?.page ?? 1);
    const limit = Math.min(100, Math.max(1, opts?.limit ?? 20));
    const needle = query.toLowerCase().trim();

    if (!needle) {
      return { data: [], total: 0, page, limit, hasMore: false };
    }

    const terms = needle.split(/\s+/);
    const results = this.records.filter((r) => {
      const haystack = `${r.title} ${r.author}`.toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });

    // Rank by relevance (exact title match first, then by ups)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(needle) ? 1 : 0;
      const bExact = b.title.toLowerCase().includes(needle) ? 1 : 0;
      if (aExact !== bExact) return bExact - aExact;
      return b.ups - a.ups;
    });

    const total = results.length;
    const offset = (page - 1) * limit;
    const data = results.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return { data, total, page, limit, hasMore };
  }

  /** Compute aggregate statistics */
  stats(): DatasetStatsResult {
    this.ensureLoaded();

    const records = this.records;
    if (records.length === 0) {
      return {
        totalRecords: 0,
        totalUpvotes: 0,
        avgUpvotes: 0,
        maxUpvotes: 0,
        minUpvotes: 0,
        uniqueAuthors: 0,
        nsfwCount: 0,
        dateRange: { earliest: "", latest: "" },
        topAuthors: [],
        scoreDistribution: [],
        postsByMonth: [],
      };
    }

    let totalUps = 0;
    let maxUps = -Infinity;
    let minUps = Infinity;
    let nsfwCount = 0;
    let earliest = Infinity;
    let latest = -Infinity;

    const authorMap = new Map<
      string,
      { count: number; totalUps: number }
    >();
    const monthMap = new Map<string, number>();

    for (const r of records) {
      totalUps += r.ups;
      if (r.ups > maxUps) maxUps = r.ups;
      if (r.ups < minUps) minUps = r.ups;
      if (r.isNsfw) nsfwCount++;
      if (r.created_utc < earliest) earliest = r.created_utc;
      if (r.created_utc > latest) latest = r.created_utc;

      const auth = authorMap.get(r.author) ?? { count: 0, totalUps: 0 };
      auth.count++;
      auth.totalUps += r.ups;
      authorMap.set(r.author, auth);

      const d = new Date(r.created_utc * 1000);
      const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      monthMap.set(month, (monthMap.get(month) ?? 0) + 1);
    }

    // Top authors by post count
    const topAuthors = [...authorMap.entries()]
      .map(([author, data]) => ({ author, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Score distribution buckets
    const buckets = [
      { label: "0-1K", min: 0, max: 1000 },
      { label: "1K-5K", min: 1000, max: 5000 },
      { label: "5K-10K", min: 5000, max: 10000 },
      { label: "10K-25K", min: 10000, max: 25000 },
      { label: "25K-50K", min: 25000, max: 50000 },
      { label: "50K-100K", min: 50000, max: 100000 },
    ];

    const scoreDistribution = buckets.map((b) => ({
      bucket: b.label,
      count: records.filter((r) => r.ups >= b.min && r.ups < b.max).length,
    }));

    // Posts by month sorted chronologically
    const postsByMonth = [...monthMap.entries()]
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalRecords: records.length,
      totalUpvotes: totalUps,
      avgUpvotes: Math.round(totalUps / records.length),
      maxUpvotes: maxUps,
      minUpvotes: minUps,
      uniqueAuthors: authorMap.size,
      nsfwCount,
      dateRange: {
        earliest: new Date(earliest * 1000).toISOString(),
        latest: new Date(latest * 1000).toISOString(),
      },
      topAuthors,
      scoreDistribution,
      postsByMonth,
    };
  }
}

export const datasetService = new DatasetService();

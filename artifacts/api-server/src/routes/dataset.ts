/**
 * Dataset API routes — Exposes the dataset through RESTful endpoints.
 *
 * Endpoints:
 *   GET    /api/dataset            — Paginated list with sorting & filtering
 *   GET    /api/dataset/meta       — Dataset structure / schema discovery
 *   GET    /api/dataset/stats      — Aggregate statistics
 *   GET    /api/dataset/files      — Discover files in the dataset folder
 *   POST   /api/dataset/search     — Full-text search across title & author
 *   GET    /api/dataset/filter     — Alias for GET / with filter params
 *   GET    /api/dataset/:key       — Single record by key
 */

import { Router, type Request, type Response } from "express";
import { datasetService } from "../services/datasetService";
import { logger } from "../lib/logger";

const router = Router();

// ─── GET /api/dataset/meta ──────────────────────────────────────────────────
router.get("/meta", (_req: Request, res: Response) => {
  try {
    const meta = datasetService.getMeta();
    if (!meta) {
      res.status(404).json({ error: "Dataset not loaded or empty" });
      return;
    }
    res.json(meta);
  } catch (err: any) {
    logger.error({ err }, "Failed to get dataset meta");
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// ─── GET /api/dataset/stats ─────────────────────────────────────────────────
router.get("/stats", (_req: Request, res: Response) => {
  try {
    const stats = datasetService.stats();
    res.json(stats);
  } catch (err: any) {
    logger.error({ err }, "Failed to get dataset stats");
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// ─── GET /api/dataset/files ─────────────────────────────────────────────────
router.get("/files", (_req: Request, res: Response) => {
  try {
    const files = datasetService.discoverFiles();
    res.json({ files });
  } catch (err: any) {
    logger.error({ err }, "Failed to discover dataset files");
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// ─── POST /api/dataset/search ───────────────────────────────────────────────
router.post("/search", (req: Request, res: Response) => {
  try {
    const { query, page, limit } = req.body;

    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Missing or invalid 'query' field" });
      return;
    }

    const result = datasetService.search(query, {
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
    });

    res.json(result);
  } catch (err: any) {
    logger.error({ err }, "Failed to search dataset");
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// ─── GET /api/dataset/filter ────────────────────────────────────────────────
router.get("/filter", (req: Request, res: Response) => {
  try {
    const result = datasetService.list({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
      sort: (req.query.sort as any) || "ups",
      order: (req.query.order as any) || "desc",
      author: req.query.author as string | undefined,
      minScore: req.query.minScore
        ? parseInt(req.query.minScore as string)
        : undefined,
      maxScore: req.query.maxScore
        ? parseInt(req.query.maxScore as string)
        : undefined,
      isNsfw:
        req.query.isNsfw !== undefined
          ? req.query.isNsfw === "true"
          : undefined,
      startDate: req.query.startDate as string | undefined,
      endDate: req.query.endDate as string | undefined,
    });

    res.json(result);
  } catch (err: any) {
    logger.error({ err }, "Failed to filter dataset");
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// ─── GET /api/dataset/:key ──────────────────────────────────────────────────
router.get("/:key", (req: Request, res: Response) => {
  try {
    const record = datasetService.getByKey(req.params.key as string);
    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }
    res.json(record);
  } catch (err: any) {
    logger.error({ err }, "Failed to get dataset record");
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// ─── GET /api/dataset ───────────────────────────────────────────────────────
router.get("/", (req: Request, res: Response) => {
  try {
    const result = datasetService.list({
      page: parseInt(req.query.page as string) || 1,
      limit: parseInt(req.query.limit as string) || 20,
      sort: (req.query.sort as any) || "ups",
      order: (req.query.order as any) || "desc",
      author: req.query.author as string | undefined,
      minScore: req.query.minScore
        ? parseInt(req.query.minScore as string)
        : undefined,
      maxScore: req.query.maxScore
        ? parseInt(req.query.maxScore as string)
        : undefined,
      isNsfw:
        req.query.isNsfw !== undefined
          ? req.query.isNsfw === "true"
          : undefined,
    });

    res.json(result);
  } catch (err: any) {
    logger.error({ err }, "Failed to list dataset");
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;

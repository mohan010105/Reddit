import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

/**
 * Express middleware factory for validating request body, query, or params
 * using Zod schemas. Returns 400 with structured error messages on failure.
 *
 * Usage:
 *   router.post("/", validate({ body: createPostSchema }), handler);
 *   router.get("/", validate({ query: listQuerySchema }), handler);
 */

interface ValidateOptions {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export function validate(schemas: ValidateOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: Record<string, string[]> = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        errors.body = result.error.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`
        );
      } else {
        req.body = result.data;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        errors.query = result.error.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`
        );
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        errors.params = result.error.errors.map(
          (e) => `${e.path.join(".")}: ${e.message}`
        );
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ error: "Validation failed", details: errors });
      return;
    }

    next();
  };
}

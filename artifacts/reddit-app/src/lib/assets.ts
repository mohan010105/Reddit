/**
 * Asset & CDN Optimization Service
 * Handles image transformations and lazy loading metadata
 */

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "avif" | "jpeg";
}

class AssetOptimizer {
  private CDN_URL = process.env.VITE_CDN_URL || "https://cdn.threadit.app";

  /**
   * Generates a CDN URL with transformation parameters
   * (Compatible with Cloudinary, Imgix, or custom Nginx transform)
   */
  optimizeImage(path: string, options: ImageOptions = {}): string {
    if (!path) return "";
    if (path.startsWith("http")) return path;

    const params = [];
    if (options.width) params.push(`w_${options.width}`);
    if (options.height) params.push(`h_${options.height}`);
    if (options.quality) params.push(`q_${options.quality}`);
    if (options.format) params.push(`f_${options.format}`);

    const paramString = params.length > 0 ? `/${params.join(",")}` : "";
    return `${this.CDN_URL}${paramString}${path}`;
  }

  /**
   * Generates Responsive Image Srcset
   */
  getSrcSet(path: string): string {
    const widths = [320, 640, 1024, 1920];
    return widths
      .map(w => `${this.optimizeImage(path, { width: w, format: "webp" })} ${w}w`)
      .join(", ");
  }

  /**
   * Generates low-quality placeholder (BlurHash style)
   */
  getPlaceholder(path: string): string {
    return this.optimizeImage(path, { width: 20, quality: 10, format: "jpeg" });
  }
}

export const assetOptimizer = new AssetOptimizer();

/**
 * SEO Utilities for Dynamic Meta Tags & Structured Data
 */

interface SEOConfig {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
}

const SITE_NAME = "Threadit";
const DEFAULT_DESCRIPTION = "Join the conversation on Threadit — a modern community platform for discussions, posts, and communities.";
const DEFAULT_OG_IMAGE = "/opengraph.jpg";
const BASE_URL = typeof window !== "undefined" ? window.location.origin : "https://threadit.app";

// ─── Update Document Head ─────────────────────────────────
export function updateSEO(config: SEOConfig) {
  const fullTitle = config.title === SITE_NAME ? SITE_NAME : `${config.title} — ${SITE_NAME}`;
  document.title = fullTitle;

  setMeta("description", config.description || DEFAULT_DESCRIPTION);
  setMeta("robots", config.noindex ? "noindex, nofollow" : "index, follow");

  // Open Graph
  setMeta("og:title", fullTitle, "property");
  setMeta("og:description", config.description || DEFAULT_DESCRIPTION, "property");
  setMeta("og:image", config.ogImage || DEFAULT_OG_IMAGE, "property");
  setMeta("og:type", config.ogType || "website", "property");
  setMeta("og:site_name", SITE_NAME, "property");
  setMeta("og:url", config.canonical || window.location.href, "property");

  // Twitter Card
  setMeta("twitter:card", config.twitterCard || "summary_large_image");
  setMeta("twitter:title", fullTitle);
  setMeta("twitter:description", config.description || DEFAULT_DESCRIPTION);
  setMeta("twitter:image", config.ogImage || DEFAULT_OG_IMAGE);

  // Canonical URL
  setCanonical(config.canonical || window.location.href);

  // Article specific
  if (config.ogType === "article") {
    if (config.publishedTime) setMeta("article:published_time", config.publishedTime, "property");
    if (config.modifiedTime) setMeta("article:modified_time", config.modifiedTime, "property");
    if (config.author) setMeta("article:author", config.author, "property");
    if (config.section) setMeta("article:section", config.section, "property");
    config.tags?.forEach((tag, i) => {
      setMeta(`article:tag:${i}`, tag, "property");
    });
  }
}

// ─── Structured Data (JSON-LD) ────────────────────────────
export function setStructuredData(data: Record<string, unknown>) {
  let script = document.querySelector('script[data-type="structured-data"]') as HTMLScriptElement;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-type", "structured-data");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    ...data,
  });
}

export function setWebsiteStructuredData() {
  setStructuredData({
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}

export function setPostStructuredData(post: {
  title: string;
  content: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  community: string;
  commentCount: number;
  upvotes: number;
}) {
  setStructuredData({
    "@type": "DiscussionForumPosting",
    headline: post.title,
    text: post.content.slice(0, 500),
    author: { "@type": "Person", name: post.author },
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    url: post.url,
    discussionUrl: post.url,
    commentCount: post.commentCount,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/LikeAction",
      userInteractionCount: post.upvotes,
    },
    isPartOf: {
      "@type": "DiscussionForumPosting",
      name: post.community,
    },
  });
}

export function setCommunityStructuredData(community: {
  name: string;
  description: string;
  memberCount: number;
  url: string;
  dateCreated: string;
}) {
  setStructuredData({
    "@type": "Organization",
    name: community.name,
    description: community.description,
    url: community.url,
    foundingDate: community.dateCreated,
    numberOfEmployees: community.memberCount,
  });
}

export function setProfileStructuredData(user: {
  username: string;
  displayName: string;
  bio?: string;
  url: string;
  dateJoined: string;
}) {
  setStructuredData({
    "@type": "Person",
    name: user.displayName,
    alternateName: user.username,
    description: user.bio,
    url: user.url,
    memberOf: { "@type": "Organization", name: SITE_NAME },
  });
}

// ─── Helpers ──────────────────────────────────────────────
function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

// ─── Generate Sitemap Data ────────────────────────────────
export function generateSitemapUrls(pages: Array<{ path: string; priority?: number; changefreq?: string }>) {
  return pages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    priority: p.priority || 0.5,
    changefreq: p.changefreq || "weekly",
    lastmod: new Date().toISOString().split("T")[0],
  }));
}

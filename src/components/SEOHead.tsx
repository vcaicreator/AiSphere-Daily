import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * SEO component for dynamic meta tag management
 * Updates document head with proper meta tags for social sharing and SEO
 */
const SEOHead = ({
  title = "Perspective | Premium Online Magazine for Modern Living",
  description = "Discover inspiring stories on wellness, travel, creativity, and personal growth. Your curated destination for thoughtful content that enriches daily life.",
  image = "https://perspective-magazine.com/og-image.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: SEOHeadProps) => {
  const location = useLocation();
  const baseUrl = "https://perspective-magazine.com";
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    // Basic meta tags
    updateMeta("description", description);
    
    // Open Graph tags
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:image", image, true);
    updateMeta("og:url", currentUrl, true);
    updateMeta("og:type", type === "article" ? "article" : "website", true);

    // Twitter Card tags
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", image);
    updateMeta("twitter:url", currentUrl);

    // Article-specific tags
    if (type === "article") {
      if (publishedTime) {
        updateMeta("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        updateMeta("article:modified_time", modifiedTime, true);
      }
      if (author) {
        updateMeta("article:author", author, true);
      }
      if (section) {
        updateMeta("article:section", section, true);
      }
      tags.forEach((tag, index) => {
        updateMeta(`article:tag:${index}`, tag, true);
      });
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", currentUrl);
    } else {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", currentUrl);
      document.head.appendChild(canonical);
    }

  }, [title, description, image, type, currentUrl, publishedTime, modifiedTime, author, section, tags]);

  return null;
};

export default SEOHead;

import { useEffect } from "react";

export default function useDocumentMetadata(
  title,
  description = "LookSphere is a next-gen social media platform by Pranav Shilu. Share photos, videos, connect with creators, and explore trending content. LookSphere by Pranav Shilu.",
  noindex = false
) {
  useEffect(() => {
    const originalTitle = document.title;

    // Title MUST NOT contain Pranav Shilu
    const finalTitle = title ? `${title} · LookSphere` : "LookSphere";
    document.title = finalTitle;

    // Ensure description always ends with "LookSphere by Pranav Shilu"
    let finalDesc = description || `Explore ${title || "pages"} on LookSphere.`;
    if (!finalDesc.toLowerCase().includes("looksphere by pranav shilu")) {
      finalDesc += " LookSphere by Pranav Shilu.";
    }

    const currentUrl = window.location.href;

    const setMetaTag = (selector, attribute, value, content) => {
      let element = document.querySelector(selector);
      let originalContent = null;
      let created = false;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
        created = true;
      } else {
        originalContent = element.getAttribute("content");
      }
      element.setAttribute("content", content);

      return { element, originalContent, created };
    };

    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      let originalHref = null;
      let created = false;

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
        created = true;
      } else {
        originalHref = element.getAttribute("href");
      }
      element.setAttribute("href", href);

      return { element, originalHref, created };
    };

    const tags = [
      setMetaTag('meta[name="description"]', "name", "description", finalDesc),
      setMetaTag('meta[name="author"]', "name", "author", "Pranav Shilu"),
      setMetaTag(
        'meta[name="keywords"]',
        "name",
        "keywords",
        "LookSphere, Pranav Shilu, LookSphere Vercel, Vercel, LookSphere by Pranav Shilu, Look Sphere, social media platform, video sharing, MERN stack social media",
      ),
      setMetaTag(
        'meta[property="og:title"]',
        "property",
        "og:title",
        finalTitle,
      ),
      setMetaTag(
        'meta[property="og:description"]',
        "property",
        "og:description",
        finalDesc,
      ),
      setMetaTag(
        'meta[property="og:site_name"]',
        "property",
        "og:site_name",
        "LookSphere by Pranav Shilu",
      ),
      setMetaTag('meta[property="og:url"]', "property", "og:url", currentUrl),
      setMetaTag(
        'meta[property="twitter:url"]',
        "property",
        "twitter:url",
        currentUrl,
      ),
    ];

    if (noindex) {
      tags.push(setMetaTag('meta[name="robots"]', "name", "robots", "noindex, nofollow"));
    }

    const canonicalLink = setLinkTag("canonical", currentUrl);

    return () => {
      document.title = originalTitle;
      tags.forEach(({ element, originalContent, created }) => {
        if (created) {
          element.remove();
        } else if (originalContent !== null) {
          element.setAttribute("content", originalContent);
        }
      });
      if (canonicalLink.created) {
        canonicalLink.element.remove();
      } else if (canonicalLink.originalHref !== null) {
        canonicalLink.element.setAttribute("href", canonicalLink.originalHref);
      }
    };
  }, [title, description, noindex]);
}

import { useEffect } from "react";

export default function useDocumentMetadata(title, description = "LookSphere is a video sharing platform where users can upload and watch videos. It is a place where people can share their creativity with the world.") {
  useEffect(() => {
    const originalTitle = document.title;
    
    // Title MUST NOT contain Pranav Shilu
    const finalTitle = title ? `${title} | LookSphere` : "LookSphere";
    document.title = finalTitle;

    // Ensure description always ends with "LookSphere by Pranav Shilu"
    let finalDesc = description || `Explore ${title || 'pages'} on LookSphere.`;
    if (!finalDesc.toLowerCase().includes("looksphere by pranav shilu")) {
      finalDesc += " LookSphere by Pranav Shilu.";
    }

    const setMetaTag = (selector, attribute, value, content) => {
      let element = document.querySelector(selector);
      let originalContent = null;
      let created = false;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
        created = true;
      } else {
        originalContent = element.getAttribute('content');
      }
      element.setAttribute('content', content);
      
      return { element, originalContent, created };
    };

    const tags = [
      setMetaTag('meta[name="description"]', 'name', 'description', finalDesc),
      setMetaTag('meta[name="author"]', 'name', 'author', 'Pranav Shilu'),
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', 'LookSphere, Pranav Shilu, LookSphere Vercel, Vercel, LookSphere by Pranav Shilu, social media platform, video sharing, MERN stack social media'),
      setMetaTag('meta[property="og:title"]', 'property', 'og:title', finalTitle),
      setMetaTag('meta[property="og:description"]', 'property', 'og:description', finalDesc),
      setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'LookSphere by Pranav Shilu')
    ];

    return () => {
      document.title = originalTitle;
      tags.forEach(({ element, originalContent, created }) => {
        if (created) {
          element.remove();
        } else if (originalContent !== null) {
          element.setAttribute('content', originalContent);
        }
      });
    };
  }, [title, description]);
}

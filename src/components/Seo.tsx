import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | Ofstride Services LLP`;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
  }, [title, description]);

  return null;
}

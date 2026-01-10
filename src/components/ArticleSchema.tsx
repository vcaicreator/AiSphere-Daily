import { Article } from "@/data/articles";

interface ArticleSchemaProps {
  article: Article;
}

/**
 * Generates Schema.org Article structured data for SEO
 */
const ArticleSchema = ({ article }: ArticleSchemaProps) => {
  const baseUrl = "https://perspective-magazine.com";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.subtitle,
    "image": article.image,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      "description": article.author.bio,
      "image": article.author.avatar,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Perspective Magazine",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/article/${article.id}`,
    },
    "articleSection": article.category,
    "keywords": article.tags.join(", "),
    "wordCount": calculateWordCount(article),
    "timeRequired": `PT${article.readTime.replace(" min", "M")}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Calculate approximate word count from article content
 */
function calculateWordCount(article: Article): number {
  const intro = article.content.introduction.split(" ").length;
  const sections = article.content.sections.reduce((acc, section) => {
    return acc + section.heading.split(" ").length + section.content.split(" ").length;
  }, 0);
  const conclusion = article.content.conclusion.split(" ").length;
  
  return intro + sections + conclusion;
}

export default ArticleSchema;

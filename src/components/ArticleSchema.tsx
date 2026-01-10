import { Article } from "@/hooks/useArticles";

interface ArticleSchemaProps {
  article: Article;
}

/**
 * Generates Schema.org Article structured data for SEO
 */
const ArticleSchema = ({ article }: ArticleSchemaProps) => {
  const baseUrl = "https://aispheredaily.com";
  
  const sections = article.sections || [];
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.subtitle || article.introduction || '',
    "image": article.featured_image || '',
    "datePublished": article.published_at || article.created_at,
    "dateModified": article.updated_at || article.created_at,
    "author": article.author ? {
      "@type": "Person",
      "name": article.author.name,
      "description": article.author.bio || '',
      "image": article.author.avatar_url || '',
    } : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "AiSphere Daily",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/article/${article.slug}`,
    },
    "articleSection": article.category?.name || '',
    "keywords": article.tags?.join(", ") || '',
    "wordCount": article.word_count || calculateWordCount(article, sections),
    "timeRequired": `PT${article.read_time_minutes || 5}M`,
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
function calculateWordCount(article: Article, sections: { heading: string; content: string }[]): number {
  const intro = article.introduction?.split(" ").length || 0;
  const sectionsCount = sections.reduce((acc, section) => {
    return acc + (section.heading?.split(" ").length || 0) + (section.content?.split(" ").length || 0);
  }, 0);
  const conclusion = article.conclusion?.split(" ").length || 0;
  
  return intro + sectionsCount + conclusion;
}

export default ArticleSchema;

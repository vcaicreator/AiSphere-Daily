import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import { useArticle, useRelatedArticles } from "@/hooks/useArticles";
import { Facebook, Twitter, Linkedin, Link2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, error } = useArticle(slug);
  const { data: relatedArticles } = useRelatedArticles(article?.id, article?.category_id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !article) {
    return <Navigate to="/404" replace />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const sections = article.sections?.sort((a, b) => a.order_index - b.order_index) || [];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to articles
          </a>
        </div>

        {article.featured_image && (
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] mb-12">
            <img src={article.featured_image} alt={article.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <article className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${article.featured_image ? '-mt-32 relative z-10' : ''}`}>
          <div className="mb-12 animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {article.category?.name || 'Uncategorized'}
              </span>
              {article.published_at && (
                <span className="text-sm text-muted-foreground">
                  {new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{article.read_time_minutes || 5} min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{article.title}</h1>
            {article.subtitle && <p className="text-xl text-muted-foreground mb-8">{article.subtitle}</p>}

            {article.author && (
              <div className="flex items-center justify-between border-t border-b border-border py-6">
                <div className="flex items-center gap-4">
                  <img src={article.author.avatar_url || 'https://via.placeholder.com/56'} alt={article.author.name} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">{article.author.bio}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <button onClick={handleCopyLink} className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center"><Link2 className="w-4 h-4" /></button>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center"><Twitter className="w-4 h-4" /></a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center"><Facebook className="w-4 h-4" /></a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border hover:border-primary hover:bg-muted transition-all flex items-center justify-center"><Linkedin className="w-4 h-4" /></a>
                </div>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            {article.introduction && <p className="text-lg leading-relaxed text-muted-foreground mb-8">{article.introduction}</p>}
            {sections.map((section, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-3xl font-bold mb-4">{section.heading}</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">{section.content}</p>
              </div>
            ))}
            {article.conclusion && (
              <div className="mt-12 p-6 rounded-2xl bg-muted border-l-4 border-accent">
                <p className="text-lg leading-relaxed italic text-foreground">{article.conclusion}</p>
              </div>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mb-12 pb-12 border-b border-border">
              <div className="flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full text-sm bg-muted text-foreground">#{tag}</span>
                ))}
              </div>
            </div>
          )}
        </article>

        {relatedArticles && relatedArticles.length > 0 && (
          <section className="bg-muted py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">You might also like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <ArticleCard
                    key={rel.id}
                    id={rel.slug}
                    title={rel.title}
                    subtitle={rel.subtitle || ''}
                    category={rel.category?.name || ''}
                    date={rel.published_at ? new Date(rel.published_at).toLocaleDateString() : ''}
                    readTime={`${rel.read_time_minutes || 5} min`}
                    image={rel.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'}
                    author={{ name: rel.author?.name || '', avatar: rel.author?.avatar_url || '', bio: '' }}
                    size="small"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Article;

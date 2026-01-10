import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useFeaturedArticles } from "@/hooks/useArticles";

const Index = () => {
  const { data: articles, isLoading } = useFeaturedArticles(6);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen animate-fade-in">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <HeroSection />
          <IntroSection />

          <section id="articles" className="py-12 md:py-20">
            <div className="flex items-center justify-between mb-10 md:mb-14 animate-slide-up">
              <div>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Curated</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-2">Featured Articles</h2>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted rounded-2xl h-80" />
                ))}
              </div>
            ) : articles?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles?.map((article, index) => (
                  <div key={article.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ArticleCard
                      id={article.slug}
                      title={article.title}
                      subtitle={article.subtitle || ''}
                      category={article.category?.name || 'Uncategorized'}
                      date={article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                      readTime={`${article.read_time_minutes || 5} min`}
                      image={article.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'}
                      author={{ name: article.author?.name || 'AiSphere Daily', avatar: article.author?.avatar_url || '', bio: article.author?.bio || '' }}
                      size="small"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          <NewsletterSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;

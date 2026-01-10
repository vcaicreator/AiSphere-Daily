import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { usePublishedArticles } from "@/hooks/useArticles";

const Creativity = () => {
  const { data: articles, isLoading } = usePublishedArticles();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down">
            AI News & Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up stagger-1">
            Stay up to date with the latest developments in artificial intelligence, machine learning, 
            and technology innovation. Discover insights that shape the future.
          </p>
        </div>

        {/* Articles Grid */}
        <section>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-muted rounded-2xl h-80" />
              ))}
            </div>
          ) : articles?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles?.map((article, index) => (
                <div key={article.id} className={`animate-slide-up stagger-${Math.min(index + 2, 6)}`}>
                  <ArticleCard
                    id={article.slug}
                    title={article.title}
                    subtitle={article.subtitle || ''}
                    category={article.category?.name || 'Uncategorized'}
                    date={article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                    readTime={`${article.read_time_minutes || 5} min`}
                    image={article.featured_image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'}
                    author={{ name: article.author?.name || 'AiSphere Daily', avatar: article.author?.avatar_url || '', bio: article.author?.bio || '' }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* About AI News */}
        <section className="mt-16 rounded-2xl glass-card p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The AI Revolution</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Artificial intelligence is transforming every aspect of our world—from how we work and communicate 
                to how we solve humanity's biggest challenges. We're here to help you navigate this exciting frontier.
              </p>
              <p>
                Our coverage spans the latest breakthroughs in machine learning, practical AI tools and applications, 
                ethical considerations in AI development, and the business implications of this technological revolution. 
                Stay informed, stay ahead.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Creativity;

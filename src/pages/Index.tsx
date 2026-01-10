import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { articles } from "@/data/articles";

const Index = () => {
  const featuredArticles = articles.slice(0, 6);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen animate-fade-in">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Hero Section */}
          <HeroSection />

          {/* Intro Section */}
          <IntroSection />

          {/* Featured Articles Grid */}
          <section id="articles" className="py-12 md:py-20">
            <div className="flex items-center justify-between mb-10 md:mb-14 animate-slide-up">
              <div>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Curated</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-2">Featured Articles</h2>
              </div>
              <a 
                href="#all" 
                className="glass-button px-5 py-2.5 rounded-full text-sm font-medium hidden sm:flex items-center gap-2 hover:scale-105 transition-all"
              >
                View all
                <span>→</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredArticles.map((article, index) => (
                <div 
                  key={article.id} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ArticleCard 
                    {...article} 
                    readTime={article.readTime}
                    size="small" 
                  />
                </div>
              ))}
            </div>

            {/* Mobile view all button */}
            <div className="flex justify-center mt-10 sm:hidden">
              <a 
                href="#all" 
                className="glass-button px-6 py-3 rounded-full text-sm font-medium"
              >
                View all articles →
              </a>
            </div>
          </section>

          {/* Newsletter Section */}
          <NewsletterSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Index;

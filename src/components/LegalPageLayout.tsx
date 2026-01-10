import { ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

interface LegalSection {
  id: string;
  title: string;
}

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  sections?: LegalSection[];
  children: ReactNode;
}

const LegalPageLayout = ({
  title,
  description,
  lastUpdated,
  sections = [],
  children,
}: LegalPageLayoutProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${title} | AiSphere Daily`}
        description={description}
      />
      <Header />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-12">
          {/* Sidebar - Table of Contents */}
          {sections.length > 0 && (
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 glass-card rounded-2xl p-6 space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Contents
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors text-left w-full py-1"
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <div className={sections.length > 0 ? "lg:col-span-3" : "lg:col-span-4 max-w-4xl mx-auto"}>
            {/* Hero Section */}
            <div className="mb-12 space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-muted-foreground">Legal</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* Content Container */}
            <div className="glass-card rounded-3xl p-8 md:p-12 animate-fade-in">
              <div className="prose prose-lg max-w-none space-y-8 text-foreground">
                {children}
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 glass-button w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 z-50"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPageLayout;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const About = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <SEOHead
        title="About | AiSphere Daily"
        description="Learn about AiSphere Daily - your premier destination for AI news, machine learning insights, and technology innovation."
      />
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-down">
            About AiSphere Daily
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-slide-up stagger-1">
            Your premier destination for AI news, insights, and innovation.
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-16 space-y-6 text-muted-foreground animate-slide-up stagger-2">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <p>
            AiSphere Daily was founded with a clear vision: to make artificial intelligence accessible, 
            understandable, and relevant to everyone. In a world where AI is transforming every industry, 
            we believe everyone deserves clear, accurate, and insightful coverage of this revolutionary technology.
          </p>
          <p>
            We cut through the hype and deliver substantive reporting on AI breakthroughs, ethical considerations, 
            industry applications, and the people driving innovation. Our team of expert writers and analysts 
            brings deep technical knowledge paired with accessible storytelling.
          </p>
          <p>
            Whether you're a tech professional, business leader, student, or curious reader, AiSphere Daily 
            is your trusted source for understanding how artificial intelligence is reshaping our world.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16 glass-card rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We believe that understanding AI is essential for navigating the future. AiSphere Daily is 
              dedicated to providing clear, accurate, and insightful coverage that helps readers:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>Stay informed about the latest AI breakthroughs and research</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>Understand the practical applications of AI across industries</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>Navigate the ethical implications and societal impact of AI</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>Make informed decisions about AI in their work and lives</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl glass-subtle">
              <h3 className="text-xl font-semibold mb-3">Accuracy</h3>
              <p className="text-muted-foreground">
                We prioritize factual reporting and technical accuracy in every article we publish.
              </p>
            </div>
            <div className="p-6 rounded-xl glass-subtle">
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                Complex AI concepts explained clearly for both technical and non-technical audiences.
              </p>
            </div>
            <div className="p-6 rounded-xl glass-subtle">
              <h3 className="text-xl font-semibold mb-3">Independence</h3>
              <p className="text-muted-foreground">
                Editorial independence ensures honest, unbiased coverage of the AI industry.
              </p>
            </div>
            <div className="p-6 rounded-xl glass-subtle">
              <h3 className="text-xl font-semibold mb-3">Responsibility</h3>
              <p className="text-muted-foreground">
                We cover AI's ethical dimensions and societal implications with care and nuance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12 glass-card rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to receive the latest AI news, insights, and analysis directly in your inbox.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
            <Mail className="mr-2 h-4 w-4" />
            Subscribe Now
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;

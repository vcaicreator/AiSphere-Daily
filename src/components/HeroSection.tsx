import { Instagram, Facebook, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative rounded-[2.5rem] overflow-hidden my-8 md:my-12 animate-fade-in">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background to-secondary/20" />
      
      {/* Floating glass orbs for depth */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-accent/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-12 lg:p-16">
        {/* Left side - Glass Image Container */}
        <div className="relative group">
          <div className="water-glass rounded-[2rem] overflow-hidden">
            <div className="relative aspect-[4/3] lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80"
                alt="AI neural network visualization representing artificial intelligence and innovation"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 glass-card rounded-2xl p-4 animate-float">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Featured</p>
                <p className="text-sm font-semibold">AI Insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="flex flex-col justify-center space-y-6 lg:space-y-8 lg:pl-4">
          {/* Badge */}
          <div className="inline-flex w-fit">
            <span className="glass-subtle px-4 py-2 rounded-full text-sm font-medium text-foreground/80 animate-slide-down">
              ✨ Welcome to AiSphere Daily
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight animate-slide-up">
              Explore the Future
              <span className="block gradient-text">of Intelligence</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl animate-slide-up stagger-1">
              Your daily source for AI breakthroughs, machine learning insights, and the technology shaping tomorrow.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6 pt-2 animate-slide-up stagger-2">
            <Button 
              className="group relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-glow"
            >
              Start Reading
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "#instagram" },
                { icon: Facebook, label: "Facebook", href: "#facebook" },
                { icon: Linkedin, label: "LinkedIn", href: "#linkedin" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-button w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pt-4 animate-slide-up stagger-3">
            {[
              { value: "50K+", label: "Readers" },
              { value: "200+", label: "Articles" },
              { value: "4.9", label: "Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center sm:text-left">
                <p className="text-2xl md:text-3xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import { Sparkles } from "lucide-react";

const IntroSection = () => {
  return (
    <section className="relative max-w-5xl mx-auto py-16 md:py-24 px-4 animate-fade-in">
      {/* Floating decorative elements */}
      <div className="absolute top-0 left-1/4 w-20 h-20 rounded-full bg-accent/5 blur-2xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-24 h-24 rounded-full bg-primary/5 blur-2xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="relative text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full animate-slide-down">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">Our Mission</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight animate-slide-up">
          A space for exploring ideas,
          <br className="hidden md:block" />
          <span className="gradient-text"> finding inspiration,</span>
          <br className="hidden md:block" />
          and seeing the world differently.
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto animate-slide-up stagger-1">
          From mindful living and personal growth to travel experiences and creative pursuits, 
          we share perspectives that enrich daily life. Join us as we explore topics that inspire 
          curiosity and meaningful conversation.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-4 animate-slide-up stagger-2">
          {["Wellness", "Travel", "Creativity", "Growth", "Community"].map((topic, index) => (
            <a
              key={topic}
              href={`/${topic.toLowerCase()}`}
              className="glass-button px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {topic}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

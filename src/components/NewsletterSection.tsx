import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const { trackNewsletterSignup } = useAnalytics();

  const isValidEmail = (email: string) => {
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const trimmedEmail = email.trim().toLowerCase();
    
    if (!isValidEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setStatus("loading");
    
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: trimmedEmail });
    
    if (error) {
      if (error.code === '23505') {
        toast.info("You're already subscribed!");
      } else {
        toast.error("Failed to subscribe. Please try again.");
        console.error('Newsletter subscription error:', error);
      }
      setStatus("idle");
      return;
    }
    
    // Track the signup event
    trackNewsletterSignup(trimmedEmail);
    
    setStatus("success");
    setEmail("");
    toast.success("Successfully subscribed!");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="relative my-20 md:my-32 animate-scale-in" id="newsletter">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden rounded-[3rem]">
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative water-glass rounded-[3rem] p-8 md:p-16 lg:p-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-subtle px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-muted-foreground">Newsletter</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Stay <span className="gradient-text">ahead</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Subscribe to receive the latest AI news and insights directly in your inbox. No spam, just innovation.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="input-glow flex items-center gap-2 p-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
                required
                aria-label="Email address"
                disabled={status === "loading" || status === "success"}
              />
              <Button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 font-medium transition-all duration-300 hover:shadow-glow disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <>
                    Subscribe
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Success message */}
          {status === "success" && (
            <p className="text-accent text-sm font-medium animate-fade-in">
              ✓ Welcome aboard! Check your inbox for confirmation.
            </p>
          )}

          {/* Trust indicators */}
          <p className="text-xs text-muted-foreground pt-4">
            Join 50,000+ readers • Unsubscribe anytime • We respect your privacy
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;

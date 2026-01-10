import { Instagram, Facebook, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: "Wellness", href: "/wellness" },
      { label: "Travel", href: "/travel" },
      { label: "Creativity", href: "/creativity" },
      { label: "Growth", href: "/growth" },
    ],
    about: [
      { label: "Our Story", href: "/about" },
      { label: "Authors", href: "/authors" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
    resources: [
      { label: "Style Guide", href: "/style-guide" },
      { label: "Newsletter", href: "/#newsletter" },
      { label: "RSS Feed", href: "/rss.xml" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#instagram" },
    { icon: Twitter, label: "Twitter", href: "#twitter" },
    { icon: Facebook, label: "Facebook", href: "#facebook" },
    { icon: Linkedin, label: "LinkedIn", href: "#linkedin" },
  ];

  return (
    <footer className="relative mt-20 pt-16 pb-8">
      {/* Glass background */}
      <div className="absolute inset-0 glass-subtle rounded-t-[3rem]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold font-display">Perspective</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              A curated destination for thoughtful content on wellness, travel, creativity, and personal growth.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="glass-button w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-wrap items-center gap-6 py-6 border-t border-border/50 mb-6">
          <a 
            href="mailto:hello@perspective-magazine.com" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@perspective-magazine.com
          </a>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Worldwide
          </span>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Perspective Magazine. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed with ♥ for curious minds everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

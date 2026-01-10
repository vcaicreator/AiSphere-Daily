import LegalPageLayout from "@/components/LegalPageLayout";
import { Accessibility as AccessibilityIcon, Check, Mail } from "lucide-react";

const sections = [
  { id: "commitment", title: "Our Commitment" },
  { id: "standards", title: "Accessibility Standards" },
  { id: "features", title: "Accessibility Features" },
  { id: "assistive-tech", title: "Assistive Technology" },
  { id: "limitations", title: "Known Limitations" },
  { id: "feedback", title: "Feedback" },
  { id: "contact", title: "Contact Us" },
];

const Accessibility = () => {
  return (
    <LegalPageLayout
      title="Accessibility Statement"
      description="Learn about AiSphere Daily's commitment to digital accessibility and our efforts to ensure our website is usable by everyone."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      {/* Commitment Banner */}
      <div className="flex items-start gap-4 p-6 bg-primary/10 border border-primary/20 rounded-xl mb-8">
        <AccessibilityIcon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold mb-2">Committed to Accessibility</h3>
          <p className="text-sm text-muted-foreground">
            AiSphere Daily is committed to ensuring digital accessibility for people with 
            disabilities. We continually work to improve the user experience for everyone 
            and apply the relevant accessibility standards.
          </p>
        </div>
      </div>

      <section id="commitment">
        <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
        <p className="text-muted-foreground">
          AiSphere Daily believes that the internet should be accessible to everyone, 
          regardless of ability or disability. We are committed to providing a website that 
          is accessible to the widest possible audience, including those with disabilities.
        </p>
        <p className="text-muted-foreground mt-4">
          We actively work to increase the accessibility and usability of our website and in 
          doing so adhere to many of the available standards and guidelines. We continually 
          seek out solutions that will bring all areas of the site up to the same level of 
          overall web accessibility.
        </p>
      </section>

      <section id="standards">
        <h2 className="text-2xl font-bold mb-4">Accessibility Standards</h2>
        <p className="text-muted-foreground mb-4">
          We strive to conform to the following accessibility standards:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">WCAG 2.1 Level AA</h3>
            <p className="text-sm text-muted-foreground">
              The Web Content Accessibility Guidelines (WCAG) 2.1 provide a single shared 
              standard for web content accessibility. We aim to conform to WCAG 2.1 Level AA, 
              which covers a wide range of recommendations for making web content more accessible.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">WAI-ARIA</h3>
            <p className="text-sm text-muted-foreground">
              We use WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet 
              Applications) to enhance navigation and add semantic information to interactive 
              elements, making our site more accessible to assistive technologies.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Section 508</h3>
            <p className="text-sm text-muted-foreground">
              We also aim to comply with Section 508 of the Rehabilitation Act, which requires 
              that electronic and information technology be accessible to people with disabilities.
            </p>
          </div>
        </div>
      </section>

      <section id="features">
        <h2 className="text-2xl font-bold mb-4">Accessibility Features</h2>
        <p className="text-muted-foreground mb-4">
          Our website includes the following accessibility features:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Semantic HTML</h4>
              <p className="text-sm text-muted-foreground">
                Proper use of headings, landmarks, and HTML elements for screen reader compatibility
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Keyboard Navigation</h4>
              <p className="text-sm text-muted-foreground">
                Full keyboard accessibility for navigation and interactive elements
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Focus Indicators</h4>
              <p className="text-sm text-muted-foreground">
                Visible focus states for interactive elements when navigating by keyboard
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Alt Text</h4>
              <p className="text-sm text-muted-foreground">
                Descriptive alternative text for images and meaningful graphics
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Color Contrast</h4>
              <p className="text-sm text-muted-foreground">
                Sufficient color contrast ratios for text and interactive elements
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Responsive Design</h4>
              <p className="text-sm text-muted-foreground">
                Adaptable layout that works across various screen sizes and zoom levels
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Skip Links</h4>
              <p className="text-sm text-muted-foreground">
                Skip navigation links for keyboard users to jump to main content
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">
                Dark theme option for users who prefer reduced brightness
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="assistive-tech">
        <h2 className="text-2xl font-bold mb-4">Assistive Technology Support</h2>
        <p className="text-muted-foreground mb-4">
          Our website is designed to be compatible with the following assistive technologies:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
          <li>Screen magnification software</li>
          <li>Speech recognition software</li>
          <li>Keyboard-only navigation</li>
          <li>Browser zoom and text resizing</li>
          <li>High contrast modes</li>
        </ul>
      </section>

      <section id="limitations">
        <h2 className="text-2xl font-bold mb-4">Known Limitations</h2>
        <p className="text-muted-foreground mb-4">
          While we strive to make our website fully accessible, we acknowledge that some areas 
          may not yet meet all accessibility standards. Known limitations include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong>Third-party content:</strong> Some embedded content from third-party 
            platforms may not be fully accessible. We are working with providers to improve this.
          </li>
          <li>
            <strong>Older content:</strong> Some older articles may have images without 
            adequate alt text. We are progressively updating this content.
          </li>
          <li>
            <strong>PDF documents:</strong> Some PDF documents may not be fully accessible. 
            We are working to provide accessible alternatives.
          </li>
          <li>
            <strong>Complex visualizations:</strong> Some data visualizations may be 
            challenging for screen reader users. We provide text alternatives where possible.
          </li>
        </ul>
        <p className="text-muted-foreground mt-4">
          We are actively working to address these limitations and improve the overall 
          accessibility of our website.
        </p>
      </section>

      <section id="feedback">
        <h2 className="text-2xl font-bold mb-4">Feedback</h2>
        <p className="text-muted-foreground">
          We welcome your feedback on the accessibility of AiSphere Daily. Please let us know 
          if you encounter accessibility barriers or have suggestions for improvement. Your 
          input helps us identify areas where we can improve.
        </p>
        <p className="text-muted-foreground mt-4">
          We try to respond to feedback within 5 business days and aim to resolve accessibility 
          issues as quickly as possible.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-muted-foreground mb-4">
          If you have questions about our accessibility efforts, experience difficulties 
          accessing any part of our website, or need content in an alternative format, please 
          contact us:
        </p>
        <div className="p-6 glass-subtle rounded-xl">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">Accessibility Support</h3>
              <p className="text-muted-foreground">
                AiSphere Daily<br />
                Email: accessibility@aispheredaily.com<br />
                Subject Line: Accessibility Inquiry
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Please include a description of the issue, the URL of the page, and your 
                contact information so we can respond to you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
};

export default Accessibility;

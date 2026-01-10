import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "what-are-cookies", title: "What Are Cookies" },
  { id: "types-of-cookies", title: "Types of Cookies" },
  { id: "how-we-use", title: "How We Use Cookies" },
  { id: "third-party", title: "Third-Party Cookies" },
  { id: "managing-cookies", title: "Managing Cookies" },
  { id: "your-choices", title: "Your Choices" },
  { id: "updates", title: "Policy Updates" },
  { id: "contact", title: "Contact Us" },
];

const Cookies = () => {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      description="Learn how AiSphere Daily uses cookies and similar technologies to enhance your browsing experience."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      <section id="introduction">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="text-muted-foreground">
          AiSphere Daily ("we," "us," or "our") uses cookies and similar tracking technologies 
          on our website. This Cookie Policy explains what cookies are, how we use them, and 
          your choices regarding their use.
        </p>
        <p className="text-muted-foreground mt-4">
          By continuing to use our website, you consent to our use of cookies in accordance 
          with this policy. If you do not agree to our use of cookies, you should set your 
          browser settings accordingly or not use our website.
        </p>
      </section>

      <section id="what-are-cookies">
        <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
        <p className="text-muted-foreground">
          Cookies are small text files that are placed on your computer or mobile device when 
          you visit a website. They are widely used to make websites work more efficiently and 
          to provide information to website owners.
        </p>
        <p className="text-muted-foreground mt-4">
          Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your 
          device when you go offline, while session cookies are deleted as soon as you close 
          your web browser.
        </p>
      </section>

      <section id="types-of-cookies">
        <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">Essential Cookies</h3>
        <p className="text-muted-foreground mb-4">
          These cookies are strictly necessary for the website to function properly. They enable 
          core functionality such as security, network management, and accessibility. You cannot 
          opt out of these cookies.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Session management and authentication</li>
          <li>Security and fraud prevention</li>
          <li>Load balancing and server optimization</li>
          <li>Accessibility preferences (e.g., dark mode)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">Analytics Cookies</h3>
        <p className="text-muted-foreground mb-4">
          These cookies help us understand how visitors interact with our website by collecting 
          and reporting information anonymously. This helps us improve our website and content.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Page views and navigation patterns</li>
          <li>Time spent on pages</li>
          <li>Bounce rates and exit pages</li>
          <li>Traffic sources and referrers</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">Functional Cookies</h3>
        <p className="text-muted-foreground mb-4">
          These cookies enable enhanced functionality and personalization, such as remembering 
          your preferences and settings.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Language and region preferences</li>
          <li>Theme preferences (light/dark mode)</li>
          <li>Font size and display settings</li>
          <li>Recently viewed content</li>
        </ul>

        <h3 className="text-xl font-semibold mb-3 mt-6">Marketing Cookies</h3>
        <p className="text-muted-foreground">
          These cookies are used to track visitors across websites to display relevant 
          advertisements. They are typically placed by advertising networks with our permission.
        </p>
      </section>

      <section id="how-we-use">
        <h2 className="text-2xl font-bold mb-4">How We Use Cookies</h2>
        <p className="text-muted-foreground mb-4">
          We use cookies for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Authentication:</strong> To recognize you when you sign in to our website</li>
          <li><strong>Security:</strong> To support security features and detect malicious activity</li>
          <li><strong>Preferences:</strong> To remember your settings and preferences</li>
          <li><strong>Analytics:</strong> To understand how our website is being used</li>
          <li><strong>Performance:</strong> To monitor and improve website performance</li>
          <li><strong>Content:</strong> To personalize and improve your content experience</li>
        </ul>
      </section>

      <section id="third-party">
        <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
        <p className="text-muted-foreground mb-4">
          In addition to our own cookies, we may also use various third-party cookies to report 
          usage statistics, deliver advertisements, and so forth. These third parties include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Analytics Providers:</strong> To help us analyze website traffic</li>
          <li><strong>Social Media:</strong> To enable social sharing functionality</li>
          <li><strong>Advertising Partners:</strong> To deliver relevant advertisements</li>
          <li><strong>Content Delivery Networks:</strong> To optimize content delivery</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          These third parties have their own privacy policies and may collect information about 
          your online activities over time and across different websites.
        </p>
      </section>

      <section id="managing-cookies">
        <h2 className="text-2xl font-bold mb-4">Managing Cookies</h2>
        <p className="text-muted-foreground mb-4">
          Most web browsers allow you to manage cookies through their settings. You can:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>View cookies stored on your device</li>
          <li>Delete all or specific cookies</li>
          <li>Block all cookies or third-party cookies</li>
          <li>Set preferences for certain websites</li>
          <li>Receive alerts when cookies are being set</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Please note that blocking or deleting cookies may impact your experience on our 
          website and limit certain functionality.
        </p>
      </section>

      <section id="your-choices">
        <h2 className="text-2xl font-bold mb-4">Your Choices</h2>
        <p className="text-muted-foreground mb-4">
          You have several options for managing cookies:
        </p>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">Browser Settings</h3>
        <p className="text-muted-foreground">
          You can configure your browser to accept, reject, or prompt you before accepting cookies. 
          Each browser has different procedures for managing settings.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Opt-Out Links</h3>
        <p className="text-muted-foreground">
          Many advertising companies offer opt-out mechanisms. You can visit the Digital 
          Advertising Alliance (DAA) at aboutads.info or the Network Advertising Initiative 
          (NAI) at networkadvertising.org to learn more.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Do Not Track</h3>
        <p className="text-muted-foreground">
          Some browsers have a "Do Not Track" feature that signals to websites that you do not 
          want to be tracked. We currently do not respond to "Do Not Track" signals.
        </p>
      </section>

      <section id="updates">
        <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
        <p className="text-muted-foreground">
          We may update this Cookie Policy from time to time to reflect changes in technology, 
          legislation, or our data practices. When we make changes, we will update the "Last 
          Updated" date at the top of this policy.
        </p>
        <p className="text-muted-foreground mt-4">
          We encourage you to review this policy periodically to stay informed about our use of 
          cookies and related technologies.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about this Cookie Policy or our use of cookies, please 
          contact us at:
        </p>
        <div className="mt-4 p-4 glass-subtle rounded-xl">
          <p className="text-muted-foreground">
            <strong>AiSphere Daily</strong><br />
            Email: privacy@aispheredaily.com<br />
            Website: https://aispheredaily.com
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
};

export default Cookies;

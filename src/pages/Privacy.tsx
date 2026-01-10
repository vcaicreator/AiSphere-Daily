import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information-collected", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Information" },
  { id: "cookies", title: "Cookies" },
  { id: "data-security", title: "Data Security" },
  { id: "your-rights", title: "Your Rights" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "children", title: "Children's Privacy" },
  { id: "changes", title: "Policy Changes" },
  { id: "contact", title: "Contact Us" },
];

const Privacy = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="Learn how AiSphere Daily collects, uses, and protects your personal information."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      <section id="introduction">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="text-muted-foreground">
          At AiSphere Daily, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website and subscribe to our newsletter.
        </p>
        <p className="text-muted-foreground mt-4">
          By using our website, you consent to the data practices described in this policy. If you do not 
          agree with the terms of this privacy policy, please do not access our website.
        </p>
      </section>

      <section id="information-collected">
        <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
        
        <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
        <p className="text-muted-foreground mb-4">
          We may collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Subscribe to our newsletter</li>
          <li>Contact us through our contact form</li>
          <li>Comment on our articles</li>
          <li>Create an account on our website</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          This information may include your name, email address, and any other information you choose to provide.
        </p>

        <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
        <p className="text-muted-foreground">
          When you visit our website, we may automatically collect certain information about your device, 
          including information about your web browser, IP address, time zone, and some of the cookies 
          installed on your device.
        </p>
      </section>

      <section id="how-we-use">
        <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
        <p className="text-muted-foreground mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Send you our newsletter and marketing communications</li>
          <li>Respond to your comments and questions</li>
          <li>Improve our website and content</li>
          <li>Analyze usage patterns and trends</li>
          <li>Protect against fraudulent or illegal activity</li>
        </ul>
      </section>

      <section id="cookies">
        <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
        <p className="text-muted-foreground">
          We use cookies and similar tracking technologies to track activity on our website and store 
          certain information. You can instruct your browser to refuse all cookies or to indicate when 
          a cookie is being sent. However, if you do not accept cookies, you may not be able to use 
          some portions of our website.
        </p>
        <p className="text-muted-foreground mt-4">
          For more information, please see our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>.
        </p>
      </section>

      <section id="data-security">
        <h2 className="text-2xl font-bold mb-4">Data Security</h2>
        <p className="text-muted-foreground">
          We implement appropriate technical and organizational security measures to protect your 
          personal information. However, please note that no method of transmission over the Internet 
          or method of electronic storage is 100% secure.
        </p>
      </section>

      <section id="your-rights">
        <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
        <p className="text-muted-foreground mb-4">
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>The right to access your personal information</li>
          <li>The right to rectification of inaccurate information</li>
          <li>The right to erasure of your personal information</li>
          <li>The right to withdraw consent</li>
          <li>The right to data portability</li>
        </ul>
      </section>

      <section id="third-party">
        <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
        <p className="text-muted-foreground">
          Our website may contain links to third-party websites. We are not responsible for the privacy 
          practices of these third-party sites. We encourage you to read their privacy policies.
        </p>
      </section>

      <section id="children">
        <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
        <p className="text-muted-foreground">
          Our website is not intended for children under the age of 13. We do not knowingly collect 
          personal information from children under 13.
        </p>
      </section>

      <section id="changes">
        <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
        <p className="text-muted-foreground">
          We may update our Privacy Policy from time to time. We will notify you of any changes by 
          posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy;

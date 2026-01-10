import LegalPageLayout from "@/components/LegalPageLayout";
import { AlertTriangle, Ban, Shield } from "lucide-react";

const sections = [
  { id: "ownership", title: "Ownership Statement" },
  { id: "protected-content", title: "Protected Content" },
  { id: "no-permission", title: "No Permission Granted" },
  { id: "prohibited-uses", title: "Prohibited Uses" },
  { id: "ai-prohibition", title: "AI Training Prohibition" },
  { id: "consequences", title: "Consequences" },
  { id: "permission-requests", title: "Permission Requests" },
  { id: "reporting", title: "Report Infringement" },
];

const Copyright = () => {
  return (
    <LegalPageLayout
      title="Copyright Notice"
      description="All content on AiSphere Daily is protected by copyright. No permission is granted for use, reproduction, or distribution."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      {/* Warning Banner */}
      <div className="flex items-start gap-4 p-6 bg-destructive/10 border border-destructive/20 rounded-xl mb-8">
        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-destructive mb-2">All Rights Reserved</h3>
          <p className="text-sm text-muted-foreground">
            This website and all its contents are protected by copyright law. No permission is 
            granted for any use, reproduction, or distribution of any content. Unauthorized use 
            may result in legal action.
          </p>
        </div>
      </div>

      <section id="ownership">
        <h2 className="text-2xl font-bold mb-4">Ownership Statement</h2>
        <p className="text-muted-foreground">
          All content published on AiSphere Daily, including but not limited to articles, news 
          content, graphics, images, logos, designs, user interface elements, and any other 
          materials, are the exclusive intellectual property of AiSphere Daily.
        </p>
        <p className="text-muted-foreground mt-4">
          © 2025 AiSphere Daily. All Rights Reserved Worldwide.
        </p>
        <p className="text-muted-foreground mt-4">
          This copyright notice applies to all content created, published, or displayed by 
          AiSphere Daily, regardless of the date of creation or publication.
        </p>
      </section>

      <section id="protected-content">
        <h2 className="text-2xl font-bold mb-4">Protected Content</h2>
        <p className="text-muted-foreground mb-4">
          The following types of content are protected under this copyright notice:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Written Content
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Articles and news stories</li>
              <li>• Blog posts and editorials</li>
              <li>• Headlines and titles</li>
              <li>• Descriptions and summaries</li>
            </ul>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Visual Content
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Photographs and images</li>
              <li>• Graphics and illustrations</li>
              <li>• Logos and brand marks</li>
              <li>• Infographics and charts</li>
            </ul>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Design Elements
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Website design and layout</li>
              <li>• User interface elements</li>
              <li>• Color schemes and typography</li>
              <li>• Visual styling and effects</li>
            </ul>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Technical Content
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Source code and software</li>
              <li>• Databases and data structures</li>
              <li>• APIs and integrations</li>
              <li>• Documentation</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="no-permission">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <Ban className="w-6 h-6 text-destructive" />
          No Permission Granted
        </h2>
        <p className="text-muted-foreground mb-4">
          <strong className="text-foreground">NO PERMISSION IS GRANTED</strong> to any person, 
          entity, organization, corporation, or automated system for any use of our content. 
          This includes but is not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Copying or reproducing</strong> any content in any format or medium</li>
          <li><strong>Modifying, adapting, or transforming</strong> any content</li>
          <li><strong>Distributing, publishing, or transmitting</strong> any content</li>
          <li><strong>Displaying publicly or performing</strong> any content</li>
          <li><strong>Creating derivative works</strong> based on any content</li>
          <li><strong>Using for commercial purposes</strong> of any kind</li>
          <li><strong>Using for non-commercial purposes</strong> without authorization</li>
          <li><strong>Licensing or sublicensing</strong> any content to third parties</li>
        </ul>
      </section>

      <section id="prohibited-uses">
        <h2 className="text-2xl font-bold mb-4">Prohibited Uses</h2>
        <p className="text-muted-foreground mb-4">
          The following activities are strictly prohibited and may result in legal action:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 border border-destructive/20 rounded-xl">
            <h3 className="font-semibold text-destructive mb-2">Content Reproduction</h3>
            <p className="text-sm text-muted-foreground">
              Copying, downloading, screenshotting, or otherwise reproducing any content for 
              any purpose, including personal use, educational use, or archival purposes.
            </p>
          </div>
          
          <div className="p-4 border border-destructive/20 rounded-xl">
            <h3 className="font-semibold text-destructive mb-2">Content Aggregation</h3>
            <p className="text-sm text-muted-foreground">
              Including our content in RSS feeds, content aggregators, news compilations, or 
              any other collection of content from multiple sources.
            </p>
          </div>
          
          <div className="p-4 border border-destructive/20 rounded-xl">
            <h3 className="font-semibold text-destructive mb-2">Social Media Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Reproducing full articles, images, or substantial portions of content on social 
              media platforms, forums, or other websites. Limited sharing of headlines with 
              links is permitted.
            </p>
          </div>
          
          <div className="p-4 border border-destructive/20 rounded-xl">
            <h3 className="font-semibold text-destructive mb-2">Commercial Use</h3>
            <p className="text-sm text-muted-foreground">
              Using any content for commercial purposes, including advertising, marketing, 
              promotion, or any revenue-generating activities.
            </p>
          </div>
        </div>
      </section>

      <section id="ai-prohibition">
        <h2 className="text-2xl font-bold mb-4">AI Training Prohibition</h2>
        <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-xl mb-4">
          <p className="text-muted-foreground font-medium">
            <strong className="text-destructive">EXPLICIT PROHIBITION:</strong> All content on 
            AiSphere Daily is expressly excluded from use for training artificial intelligence 
            models, machine learning systems, or any automated content analysis.
          </p>
        </div>
        <p className="text-muted-foreground mb-4">
          This prohibition includes, but is not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Training large language models (LLMs)</li>
          <li>Training generative AI systems</li>
          <li>Natural language processing (NLP) development</li>
          <li>Computer vision or image recognition training</li>
          <li>Data mining or pattern recognition</li>
          <li>Automated content scraping or crawling</li>
          <li>Any form of machine learning training data</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Our robots.txt file includes directives to block known AI crawlers. Circumventing 
          these restrictions is a violation of this policy and may constitute unauthorized 
          access under applicable law.
        </p>
      </section>

      <section id="consequences">
        <h2 className="text-2xl font-bold mb-4">Consequences of Infringement</h2>
        <p className="text-muted-foreground mb-4">
          Violation of this copyright notice may result in:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Legal Action:</strong> Civil litigation for copyright infringement</li>
          <li><strong>Monetary Damages:</strong> Claims for actual, statutory, and punitive damages</li>
          <li><strong>Injunctive Relief:</strong> Court orders to cease infringing activities</li>
          <li><strong>DMCA Takedowns:</strong> Requests to remove infringing content from platforms</li>
          <li><strong>Criminal Prosecution:</strong> Referral to authorities for willful infringement</li>
          <li><strong>Attorney's Fees:</strong> Recovery of legal costs and fees</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          AiSphere Daily actively monitors for unauthorized use of our content and will 
          vigorously pursue all available legal remedies against infringers.
        </p>
      </section>

      <section id="permission-requests">
        <h2 className="text-2xl font-bold mb-4">Permission Requests</h2>
        <p className="text-muted-foreground mb-4">
          While no general permission is granted, limited licensing may be available in 
          exceptional circumstances. To request permission, you must submit a formal request 
          including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Detailed description of the specific content requested</li>
          <li>Intended use and purpose</li>
          <li>Distribution channels and audience</li>
          <li>Duration and geographic scope of use</li>
          <li>Whether use is commercial or non-commercial</li>
          <li>Your contact information and organization details</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Submit requests to: <strong>legal@aispheredaily.com</strong>
        </p>
        <p className="text-muted-foreground mt-2">
          We reserve the right to deny any request at our sole discretion. A request does not 
          constitute permission, and you may not use any content unless and until you receive 
          explicit written authorization.
        </p>
      </section>

      <section id="reporting">
        <h2 className="text-2xl font-bold mb-4">Report Infringement</h2>
        <p className="text-muted-foreground">
          If you become aware of any unauthorized use of AiSphere Daily content, please report 
          it to us at:
        </p>
        <div className="mt-4 p-4 glass-subtle rounded-xl">
          <p className="text-muted-foreground">
            <strong>Copyright Enforcement</strong><br />
            AiSphere Daily<br />
            Email: legal@aispheredaily.com<br />
            Subject Line: Copyright Infringement Report
          </p>
        </div>
        <p className="text-muted-foreground mt-4">
          Please include the URL of the infringing content and any relevant details about the 
          nature of the infringement.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Copyright;

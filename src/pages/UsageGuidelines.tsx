import LegalPageLayout from "@/components/LegalPageLayout";
import { Ban, AlertTriangle, FileQuestion, Mail } from "lucide-react";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "no-permission", title: "No Permission Policy" },
  { id: "prohibited", title: "Prohibited Uses" },
  { id: "limited-sharing", title: "Limited Sharing" },
  { id: "ai-scraping", title: "AI & Scraping" },
  { id: "permission-process", title: "Permission Process" },
  { id: "enforcement", title: "Enforcement" },
  { id: "contact", title: "Contact" },
];

const UsageGuidelines = () => {
  return (
    <LegalPageLayout
      title="Content Usage Guidelines"
      description="Strict guidelines governing the use of AiSphere Daily content. No permission is granted for any use without explicit authorization."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      {/* Critical Warning Banner */}
      <div className="flex items-start gap-4 p-6 bg-destructive/10 border border-destructive/20 rounded-xl mb-8">
        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-destructive mb-2">No Permission Granted</h3>
          <p className="text-sm text-muted-foreground">
            All content on AiSphere Daily is protected by copyright. <strong>No general 
            permission is granted</strong> for any use, reproduction, or distribution of our 
            content. Any use without explicit written authorization is prohibited and may 
            result in legal action.
          </p>
        </div>
      </div>

      <section id="overview">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-muted-foreground">
          AiSphere Daily maintains a strict "All Rights Reserved" policy for all content 
          published on our website. This includes articles, images, graphics, designs, logos, 
          and all other materials. These guidelines clarify what is NOT permitted and outline 
          the formal process for requesting permission in exceptional circumstances.
        </p>
        <p className="text-muted-foreground mt-4">
          By accessing our website, you acknowledge and agree to abide by these usage 
          guidelines. Violation of these guidelines constitutes copyright infringement and may 
          result in legal action.
        </p>
      </section>

      <section id="no-permission">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <Ban className="w-6 h-6 text-destructive" />
          No Permission Policy
        </h2>
        <p className="text-muted-foreground mb-4">
          Unless you have received <strong>explicit written authorization</strong> from 
          AiSphere Daily, you may NOT:
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 border border-destructive/20 rounded-xl">
            <Ban className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Copy or Reproduce</h4>
              <p className="text-sm text-muted-foreground">
                Copy, reproduce, download, screenshot, or duplicate any content in any format
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 border border-destructive/20 rounded-xl">
            <Ban className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Modify or Adapt</h4>
              <p className="text-sm text-muted-foreground">
                Modify, adapt, translate, transform, or create derivative works from any content
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 border border-destructive/20 rounded-xl">
            <Ban className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Distribute or Publish</h4>
              <p className="text-sm text-muted-foreground">
                Distribute, publish, broadcast, or transmit any content through any medium
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 border border-destructive/20 rounded-xl">
            <Ban className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Display Publicly</h4>
              <p className="text-sm text-muted-foreground">
                Display content publicly on websites, apps, presentations, or any other platform
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 border border-destructive/20 rounded-xl">
            <Ban className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Use Commercially</h4>
              <p className="text-sm text-muted-foreground">
                Use any content for commercial purposes, advertising, or revenue generation
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 border border-destructive/20 rounded-xl">
            <Ban className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold">Use for Personal Projects</h4>
              <p className="text-sm text-muted-foreground">
                Use content for personal websites, blogs, portfolios, or educational materials
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="prohibited">
        <h2 className="text-2xl font-bold mb-4">Specifically Prohibited Uses</h2>
        <p className="text-muted-foreground mb-4">
          The following activities are explicitly prohibited:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Content Aggregation</h3>
            <p className="text-sm text-muted-foreground">
              Including our content in RSS aggregators, content curators, news compilations, 
              or any service that collects content from multiple sources.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Social Media Reproduction</h3>
            <p className="text-sm text-muted-foreground">
              Copying articles, images, or substantial excerpts to social media platforms. 
              Screenshotting content for sharing is also prohibited.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Newsletter Reproduction</h3>
            <p className="text-sm text-muted-foreground">
              Reproducing our content in email newsletters, digests, or any email communications.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Academic/Educational Use</h3>
            <p className="text-sm text-muted-foreground">
              Using our content in academic papers, course materials, or educational 
              presentations without explicit permission.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Translation</h3>
            <p className="text-sm text-muted-foreground">
              Translating our content into other languages for any purpose, including personal use.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Archival/Backup</h3>
            <p className="text-sm text-muted-foreground">
              Creating archives, backups, or offline copies of our content for any purpose.
            </p>
          </div>
        </div>
      </section>

      <section id="limited-sharing">
        <h2 className="text-2xl font-bold mb-4">Limited Sharing Permitted</h2>
        <p className="text-muted-foreground mb-4">
          The only sharing permitted without explicit authorization is:
        </p>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
          <h3 className="font-semibold mb-2">Link Sharing</h3>
          <p className="text-sm text-muted-foreground">
            You may share the <strong>URL/link</strong> to our articles on social media, in 
            emails, or on other platforms. When sharing links, you may include the article 
            headline but may NOT reproduce article content, images, or excerpts beyond what 
            is automatically generated by the platform's link preview functionality.
          </p>
        </div>
        <p className="text-muted-foreground mt-4">
          Link sharing does not grant any rights to the content itself. The content remains 
          fully protected and may only be viewed on our website.
        </p>
      </section>

      <section id="ai-scraping">
        <h2 className="text-2xl font-bold mb-4">AI Training & Automated Access</h2>
        <p className="text-muted-foreground mb-4">
          <strong className="text-destructive">STRICTLY PROHIBITED:</strong>
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Automated scraping, crawling, or harvesting of our content</li>
          <li>Using our content to train AI models or machine learning systems</li>
          <li>Including our content in datasets for natural language processing</li>
          <li>Using bots, spiders, or automated tools to access our content</li>
          <li>Circumventing technical measures designed to prevent automated access</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Our robots.txt file includes directives to block known AI crawlers. Accessing our 
          content in violation of robots.txt or using tools to circumvent these restrictions 
          may constitute unauthorized access under applicable computer fraud laws.
        </p>
      </section>

      <section id="permission-process">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <FileQuestion className="w-6 h-6 text-primary" />
          Permission Request Process
        </h2>
        <p className="text-muted-foreground mb-4">
          While no general permission is granted, we may consider licensing requests in 
          exceptional circumstances. To request permission:
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Submit a Written Request</h3>
              <p className="text-sm text-muted-foreground">
                Email licensing@aispheredaily.com with your request. Include your full name, 
                organization, and contact information.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Identify the Content</h3>
              <p className="text-sm text-muted-foreground">
                Specify exactly which content you wish to use, including URLs and specific 
                elements (text, images, etc.).
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Describe the Use</h3>
              <p className="text-sm text-muted-foreground">
                Explain how you intend to use the content, where it will appear, and the 
                expected audience or reach.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Wait for Authorization</h3>
              <p className="text-sm text-muted-foreground">
                Do NOT use any content until you receive explicit written authorization. A 
                request does not constitute permission.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mt-4">
          We reserve the right to deny any request at our sole discretion. Licensing fees may 
          apply for approved uses.
        </p>
      </section>

      <section id="enforcement">
        <h2 className="text-2xl font-bold mb-4">Enforcement</h2>
        <p className="text-muted-foreground mb-4">
          AiSphere Daily actively monitors for unauthorized use of our content. Violations may 
          result in:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Cease and desist demands</li>
          <li>DMCA takedown notices to platforms hosting infringing content</li>
          <li>Civil litigation for copyright infringement</li>
          <li>Claims for actual and statutory damages</li>
          <li>Recovery of attorneys' fees and legal costs</li>
          <li>Referral to authorities for criminal prosecution in severe cases</li>
        </ul>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p className="text-muted-foreground mb-4">
          For questions about these usage guidelines or to submit a licensing request:
        </p>
        <div className="p-6 glass-subtle rounded-xl">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">Licensing Inquiries</h3>
              <p className="text-muted-foreground">
                AiSphere Daily<br />
                Email: licensing@aispheredaily.com<br />
                Subject Line: Content Usage Request
              </p>
            </div>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
};

export default UsageGuidelines;

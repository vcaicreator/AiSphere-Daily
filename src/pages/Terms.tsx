import LegalPageLayout from "@/components/LegalPageLayout";
import { AlertTriangle } from "lucide-react";

const sections = [
  { id: "agreement", title: "Agreement to Terms" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "no-license", title: "No License Granted" },
  { id: "prohibited-uses", title: "Prohibited Uses" },
  { id: "user-content", title: "User Content" },
  { id: "disclaimer", title: "Disclaimer" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "indemnification", title: "Indemnification" },
  { id: "disputes", title: "Dispute Resolution" },
  { id: "modifications", title: "Modifications" },
  { id: "contact", title: "Contact" },
];

const Terms = () => {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="Terms and conditions governing your use of the AiSphere Daily website and services."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      {/* Warning Banner */}
      <div className="flex items-start gap-4 p-6 bg-destructive/10 border border-destructive/20 rounded-xl mb-8">
        <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-destructive mb-2">All Rights Reserved</h3>
          <p className="text-sm text-muted-foreground">
            All content on AiSphere Daily is protected by copyright. No permission is granted for 
            any use, reproduction, or distribution without explicit written authorization. See our 
            <a href="/usage-guidelines" className="text-primary hover:underline ml-1">Usage Guidelines</a> for details.
          </p>
        </div>
      </div>

      <section id="agreement">
        <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
        <p className="text-muted-foreground">
          By accessing or using AiSphere Daily's website and services, you agree to be bound by these Terms of Service. 
          If you disagree with any part of these terms, you may not access our services.
        </p>
        <p className="text-muted-foreground mt-4">
          These terms apply to all visitors, users, and others who access or use our website.
        </p>
      </section>

      <section id="intellectual-property">
        <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
        <p className="text-muted-foreground">
          All content on AiSphere Daily, including but not limited to articles, images, graphics, logos, 
          designs, code, and all other materials, is the exclusive property of AiSphere Daily and is 
          protected by international copyright, trademark, and other intellectual property laws.
        </p>
        <p className="text-muted-foreground mt-4">
          <strong className="text-foreground">© 2025 AiSphere Daily. All Rights Reserved.</strong>
        </p>
      </section>

      <section id="no-license">
        <h2 className="text-2xl font-bold mb-4">No License Granted</h2>
        <p className="text-muted-foreground mb-4">
          <strong className="text-destructive">NO LICENSE IS GRANTED</strong> to use any content on this website. 
          Viewing content on our website does not grant you any rights to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Copy, reproduce, or download any content</li>
          <li>Modify, adapt, or create derivative works</li>
          <li>Distribute, publish, or transmit any content</li>
          <li>Use content for commercial or non-commercial purposes</li>
          <li>Use content for AI training or machine learning</li>
          <li>Scrape, crawl, or harvest content using automated tools</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Any use of our content without explicit written authorization constitutes copyright infringement 
          and may result in legal action.
        </p>
      </section>

      <section id="prohibited-uses">
        <h2 className="text-2xl font-bold mb-4">Prohibited Uses</h2>
        <p className="text-muted-foreground mb-4">
          You may not use our website:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>In any way that violates any applicable law or regulation</li>
          <li>To transmit any harmful or malicious code</li>
          <li>To impersonate or attempt to impersonate AiSphere Daily or any employee</li>
          <li>To harass, abuse, or harm another person</li>
          <li>To spam or send unsolicited communications</li>
          <li>To scrape, crawl, or harvest content using automated means</li>
          <li>To train AI models or machine learning systems</li>
          <li>To circumvent any technical measures designed to restrict access</li>
        </ul>
      </section>

      <section id="user-content">
        <h2 className="text-2xl font-bold mb-4">User Content</h2>
        <p className="text-muted-foreground">
          If you post comments or other content on our website, you grant us a non-exclusive, worldwide, 
          royalty-free, perpetual license to use, reproduce, modify, and display such content. You represent 
          that you own or have the necessary rights to the content you post and that it does not infringe 
          any third-party rights.
        </p>
        <p className="text-muted-foreground mt-4">
          We reserve the right to remove any user content at our sole discretion without notice.
        </p>
      </section>

      <section id="disclaimer">
        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
        <p className="text-muted-foreground">
          The materials on AiSphere Daily's website are provided on an "AS IS" basis. AiSphere Daily makes no 
          warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
          without limitation, implied warranties or conditions of merchantability, fitness for a particular 
          purpose, or non-infringement of intellectual property.
        </p>
        <p className="text-muted-foreground mt-4">
          Content about AI and technology is for informational purposes only and does not constitute 
          professional, legal, or financial advice.
        </p>
      </section>

      <section id="liability">
        <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
        <p className="text-muted-foreground">
          In no event shall AiSphere Daily or its suppliers be liable for any damages (including, without 
          limitation, damages for loss of data or profit, or due to business interruption) arising out of 
          the use or inability to use the materials on AiSphere Daily's website, even if AiSphere Daily 
          has been notified of the possibility of such damage.
        </p>
      </section>

      <section id="indemnification">
        <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
        <p className="text-muted-foreground">
          You agree to indemnify, defend, and hold harmless AiSphere Daily and its officers, directors, 
          employees, agents, and affiliates from and against any and all claims, damages, obligations, 
          losses, liabilities, costs, and expenses arising from your use of the website or violation 
          of these terms.
        </p>
      </section>

      <section id="disputes">
        <h2 className="text-2xl font-bold mb-4">Dispute Resolution</h2>
        <p className="text-muted-foreground mb-4">
          Any disputes arising from or relating to these terms or your use of our website shall be 
          resolved through binding arbitration in accordance with applicable arbitration rules.
        </p>
        <p className="text-muted-foreground">
          <strong>CLASS ACTION WAIVER:</strong> You agree that any dispute resolution proceedings will 
          be conducted only on an individual basis and not in a class, consolidated, or representative action.
        </p>
      </section>

      <section id="modifications">
        <h2 className="text-2xl font-bold mb-4">Modifications</h2>
        <p className="text-muted-foreground">
          AiSphere Daily may revise these Terms of Service at any time without notice. By using this website, 
          you are agreeing to be bound by the current version of these Terms of Service.
        </p>
      </section>

      <section id="contact">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="text-muted-foreground">
          If you have any questions about these Terms of Service, please contact us at:
        </p>
        <div className="mt-4 p-4 glass-subtle rounded-xl">
          <p className="text-muted-foreground">
            <strong>AiSphere Daily</strong><br />
            Email: legal@aispheredaily.com<br />
            Website: https://aispheredaily.com
          </p>
        </div>
      </section>
    </LegalPageLayout>
  );
};

export default Terms;

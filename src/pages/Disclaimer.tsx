import LegalPageLayout from "@/components/LegalPageLayout";
import { Info } from "lucide-react";

const sections = [
  { id: "general", title: "General Disclaimer" },
  { id: "no-professional-advice", title: "No Professional Advice" },
  { id: "technology-content", title: "Technology Content" },
  { id: "ai-content", title: "AI-Related Content" },
  { id: "accuracy", title: "Accuracy of Information" },
  { id: "external-links", title: "External Links" },
  { id: "views-opinions", title: "Views & Opinions" },
  { id: "liability", title: "Limitation of Liability" },
];

const Disclaimer = () => {
  return (
    <LegalPageLayout
      title="Disclaimer"
      description="Important disclaimers regarding the content and information provided on AiSphere Daily."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      {/* Notice Banner */}
      <div className="flex items-start gap-4 p-6 bg-accent/10 border border-accent/20 rounded-xl mb-8">
        <Info className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold mb-2">Please Read Carefully</h3>
          <p className="text-sm text-muted-foreground">
            The information on this website is provided for general informational and 
            educational purposes only. By using this website, you agree to the terms of 
            this disclaimer.
          </p>
        </div>
      </div>

      <section id="general">
        <h2 className="text-2xl font-bold mb-4">General Disclaimer</h2>
        <p className="text-muted-foreground">
          The information contained on AiSphere Daily ("the Website") is for general information 
          purposes only. While we endeavor to keep the information up to date and correct, we 
          make no representations or warranties of any kind, express or implied, about the 
          completeness, accuracy, reliability, suitability, or availability with respect to the 
          website or the information, products, services, or related graphics contained on the 
          website for any purpose.
        </p>
        <p className="text-muted-foreground mt-4">
          Any reliance you place on such information is therefore strictly at your own risk. In 
          no event will we be liable for any loss or damage including without limitation, 
          indirect or consequential loss or damage, or any loss or damage whatsoever arising 
          from loss of data or profits arising out of, or in connection with, the use of this 
          website.
        </p>
      </section>

      <section id="no-professional-advice">
        <h2 className="text-2xl font-bold mb-4">No Professional Advice</h2>
        <p className="text-muted-foreground mb-4">
          The content on AiSphere Daily does not constitute professional advice of any kind, 
          including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Legal advice:</strong> Content is not a substitute for professional legal counsel</li>
          <li><strong>Financial advice:</strong> We do not provide investment or financial guidance</li>
          <li><strong>Technical consulting:</strong> Our content is educational, not implementation guidance</li>
          <li><strong>Medical advice:</strong> Health-related content is informational only</li>
          <li><strong>Business advice:</strong> Business insights are opinions, not recommendations</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          You should always consult with qualified professionals before making decisions based 
          on any information found on this website.
        </p>
      </section>

      <section id="technology-content">
        <h2 className="text-2xl font-bold mb-4">Technology Content</h2>
        <p className="text-muted-foreground">
          Technology evolves rapidly. Articles and information about technology products, 
          services, software, or platforms may become outdated quickly. We make reasonable 
          efforts to update content, but we cannot guarantee that all information reflects the 
          current state of technology.
        </p>
        <p className="text-muted-foreground mt-4">
          Features, pricing, availability, and functionality of products and services mentioned 
          on this website may change without notice. Always verify current information directly 
          with the relevant technology providers before making decisions.
        </p>
      </section>

      <section id="ai-content">
        <h2 className="text-2xl font-bold mb-4">AI-Related Content</h2>
        <p className="text-muted-foreground mb-4">
          AiSphere Daily covers artificial intelligence, machine learning, and related 
          technologies. Please note the following disclaimers regarding this content:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Rapidly Evolving Field</h3>
            <p className="text-sm text-muted-foreground">
              AI is a rapidly evolving field. Information that is accurate at the time of 
              publication may quickly become outdated. We encourage readers to seek multiple 
              sources and verify information independently.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">No Endorsement</h3>
            <p className="text-sm text-muted-foreground">
              Coverage of AI tools, platforms, or companies does not constitute an endorsement. 
              We aim to provide balanced information, but readers should conduct their own 
              research before using any AI products or services.
            </p>
          </div>
          
          <div className="p-4 glass-subtle rounded-xl">
            <h3 className="font-semibold mb-2">Ethical Considerations</h3>
            <p className="text-sm text-muted-foreground">
              Discussion of AI capabilities, applications, and implications represents our 
              analysis and opinions. Ethical and societal considerations around AI are complex 
              and may vary by jurisdiction, culture, and personal values.
            </p>
          </div>
        </div>
      </section>

      <section id="accuracy">
        <h2 className="text-2xl font-bold mb-4">Accuracy of Information</h2>
        <p className="text-muted-foreground">
          While we strive to provide accurate and up-to-date information, we cannot guarantee 
          that all content is free from errors, omissions, or inaccuracies. Information may be 
          changed or updated without notice.
        </p>
        <p className="text-muted-foreground mt-4">
          We do not warrant that the website will be available at all times or that the 
          information contained herein will be error-free. Users are encouraged to verify any 
          information before relying on it for important decisions.
        </p>
      </section>

      <section id="external-links">
        <h2 className="text-2xl font-bold mb-4">External Links</h2>
        <p className="text-muted-foreground">
          Through this website, you may be able to link to other websites which are not under 
          the control of AiSphere Daily. We have no control over the nature, content, and 
          availability of those sites.
        </p>
        <p className="text-muted-foreground mt-4">
          The inclusion of any links does not necessarily imply a recommendation or endorsement 
          of the views expressed within them. We are not responsible for the content, privacy 
          practices, or security of external websites.
        </p>
        <p className="text-muted-foreground mt-4">
          External links are provided for convenience only. Users access external sites at their 
          own risk and should review the terms and privacy policies of those sites.
        </p>
      </section>

      <section id="views-opinions">
        <h2 className="text-2xl font-bold mb-4">Views and Opinions</h2>
        <p className="text-muted-foreground">
          The views and opinions expressed in articles on AiSphere Daily are those of the 
          authors and do not necessarily reflect the official policy or position of AiSphere 
          Daily or any affiliated organizations.
        </p>
        <p className="text-muted-foreground mt-4">
          Comments and user-generated content represent the views of individual users and are 
          not endorsed by AiSphere Daily. We reserve the right to moderate, edit, or remove 
          content at our discretion.
        </p>
      </section>

      <section id="liability">
        <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
        <p className="text-muted-foreground">
          To the fullest extent permitted by applicable law, AiSphere Daily, its owners, 
          officers, employees, affiliates, and agents shall not be liable for any direct, 
          indirect, incidental, special, consequential, or exemplary damages, including but 
          not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
          <li>Damages for loss of profits, goodwill, use, data, or other intangible losses</li>
          <li>Damages resulting from the use or inability to use the website</li>
          <li>Damages resulting from any content or conduct of any third party on the website</li>
          <li>Damages resulting from unauthorized access, use, or alteration of your data</li>
          <li>Any other damages arising from the use of or reliance on this website</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          This limitation applies regardless of the legal theory on which the claim is based, 
          whether we have been advised of the possibility of such damages, and even if a remedy 
          set forth herein is found to have failed its essential purpose.
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default Disclaimer;

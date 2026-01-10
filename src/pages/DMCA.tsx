import LegalPageLayout from "@/components/LegalPageLayout";
import { Shield, FileText, AlertCircle } from "lucide-react";

const sections = [
  { id: "overview", title: "Overview" },
  { id: "agent", title: "DMCA Agent" },
  { id: "filing-notice", title: "Filing a Notice" },
  { id: "notice-requirements", title: "Notice Requirements" },
  { id: "counter-notification", title: "Counter-Notification" },
  { id: "repeat-infringers", title: "Repeat Infringers" },
  { id: "good-faith", title: "Good Faith Requirement" },
];

const DMCA = () => {
  return (
    <LegalPageLayout
      title="DMCA Policy"
      description="Learn how to file a DMCA takedown notice or counter-notification with AiSphere Daily."
      lastUpdated="January 10, 2025"
      sections={sections}
    >
      <section id="overview">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-muted-foreground">
          AiSphere Daily respects the intellectual property rights of others and expects our 
          users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 
          ("DMCA"), we will respond expeditiously to claims of copyright infringement that are 
          properly reported to our designated DMCA Agent.
        </p>
        <p className="text-muted-foreground mt-4">
          This policy outlines the procedures for filing a DMCA takedown notice if you believe 
          your copyrighted work has been infringed, as well as the counter-notification process 
          if you believe your content was wrongfully removed.
        </p>
      </section>

      <section id="agent">
        <h2 className="text-2xl font-bold mb-4">Designated DMCA Agent</h2>
        <p className="text-muted-foreground mb-4">
          Our designated agent to receive notifications of claimed infringement is:
        </p>
        <div className="p-6 glass-subtle rounded-xl">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-2">DMCA Agent</h3>
              <p className="text-muted-foreground">
                AiSphere Daily Legal Department<br />
                Email: dmca@aispheredaily.com<br />
                Subject Line: DMCA Notice
              </p>
            </div>
          </div>
        </div>
        <p className="text-muted-foreground mt-4">
          Please note that this contact information is for DMCA notices only. For general 
          inquiries, please use our standard contact methods.
        </p>
      </section>

      <section id="filing-notice">
        <h2 className="text-2xl font-bold mb-4">Filing a DMCA Takedown Notice</h2>
        <p className="text-muted-foreground mb-4">
          If you believe that content on AiSphere Daily infringes your copyright, you may 
          submit a DMCA takedown notice to our designated agent. To be effective, your notice 
          must include the following information:
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Identification of the Copyrighted Work</h3>
              <p className="text-sm text-muted-foreground">
                Identify the copyrighted work that you claim has been infringed. If multiple 
                works are covered by a single notification, provide a representative list.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Identification of the Infringing Material</h3>
              <p className="text-sm text-muted-foreground">
                Provide the URL(s) or other specific location of the material you claim is 
                infringing. Include enough information for us to locate the material.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Your Contact Information</h3>
              <p className="text-sm text-muted-foreground">
                Include your name, mailing address, telephone number, and email address so we 
                can contact you regarding your notice.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Good Faith Statement</h3>
              <p className="text-sm text-muted-foreground">
                A statement that you have a good faith belief that use of the material is not 
                authorized by the copyright owner, its agent, or the law.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">5</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Accuracy Statement</h3>
              <p className="text-sm text-muted-foreground">
                A statement, under penalty of perjury, that the information in your notice is 
                accurate and that you are the copyright owner or authorized to act on their behalf.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 glass-subtle rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold">6</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Your Signature</h3>
              <p className="text-sm text-muted-foreground">
                Your physical or electronic signature (typing your full legal name is sufficient 
                for electronic communications).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="notice-requirements">
        <h2 className="text-2xl font-bold mb-4">Notice Requirements</h2>
        <div className="flex items-start gap-4 p-6 bg-accent/10 border border-accent/20 rounded-xl mb-4">
          <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold mb-2">Important</h3>
            <p className="text-sm text-muted-foreground">
              A DMCA notice that does not substantially comply with these requirements may not 
              be acted upon. Please ensure your notice contains all required information before 
              submitting.
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Under Section 512(f) of the DMCA, any person who knowingly materially misrepresents 
          that material is infringing may be subject to liability for damages, including costs 
          and attorneys' fees incurred by us or any copyright owner or authorized licensee 
          injured by such misrepresentation.
        </p>
      </section>

      <section id="counter-notification">
        <h2 className="text-2xl font-bold mb-4">Counter-Notification</h2>
        <p className="text-muted-foreground mb-4">
          If you believe that your content was wrongfully removed or disabled as a result of a 
          DMCA notice, you may file a counter-notification with our DMCA Agent. Your counter-
          notification must include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Your physical or electronic signature</li>
          <li>Identification of the material that was removed and its location before removal</li>
          <li>
            A statement under penalty of perjury that you have a good faith belief that the 
            material was removed by mistake or misidentification
          </li>
          <li>
            Your name, address, and telephone number, and a statement that you consent to the 
            jurisdiction of the federal court in your district and will accept service of process 
            from the person who filed the original DMCA notice
          </li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Upon receipt of a valid counter-notification, we will forward it to the original 
          complaining party. If they do not file a lawsuit within 10-14 business days, we may 
          restore the removed content.
        </p>
      </section>

      <section id="repeat-infringers">
        <h2 className="text-2xl font-bold mb-4">Repeat Infringers</h2>
        <p className="text-muted-foreground">
          In accordance with the DMCA, we have adopted a policy of terminating, in appropriate 
          circumstances, accounts of users who are deemed to be repeat infringers. We may also 
          limit access to our website and/or terminate the accounts of any users who infringe 
          the intellectual property rights of others, whether or not there is any repeat 
          infringement.
        </p>
      </section>

      <section id="good-faith">
        <h2 className="text-2xl font-bold mb-4">Good Faith Requirement</h2>
        <p className="text-muted-foreground mb-4">
          We ask that all parties involved in DMCA proceedings act in good faith. Please only 
          file a DMCA notice if you genuinely believe that your copyrighted work has been 
          infringed, and only file a counter-notification if you genuinely believe that your 
          content was wrongfully removed.
        </p>
        <div className="p-4 glass-subtle rounded-xl">
          <div className="flex items-start gap-4">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">Questions?</h3>
              <p className="text-sm text-muted-foreground">
                If you have questions about this DMCA policy or the takedown process, please 
                contact us at legal@aispheredaily.com.
              </p>
            </div>
          </div>
        </div>
      </section>
    </LegalPageLayout>
  );
};

export default DMCA;

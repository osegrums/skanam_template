
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LegalPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Legal Terms</h1>
        
        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="copyright">Copyright</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              <h2>Terms of Service</h2>
              <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h3>1. Acceptance of Terms</h3>
              <p>By accessing or using Skanam.lv ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.</p>
              
              <h3>2. User Accounts</h3>
              <p>When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
              
              <h3>3. User Content</h3>
              <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content you post, and you retain any ownership rights you had to that content.</p>
              
              <h3>4. Prohibited Uses</h3>
              <p>You may not use the Service for any illegal purpose or to violate any laws in your jurisdiction. This includes copyright laws, and laws regarding the export of data.</p>
              
              <h3>5. Termination</h3>
              <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including without limitation if you breach the Terms.</p>
              
              <h3>6. Limitation of Liability</h3>
              <p>In no event shall Skanam.lv, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.</p>
              
              <h3>7. Changes</h3>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              <h2>Privacy Policy</h2>
              <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h3>1. Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account, update your profile, use interactive features, participate in contests, or communicate with us.</p>
              
              <h3>2. How We Use Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services, such as to process transactions, send you related information, and respond to your comments, questions and requests.</p>
              
              <h3>3. Sharing of Information</h3>
              <p>We may share the information we collect as follows: with third-party vendors, consultants who need access to such information to carry out work on our behalf; in response to a request for information if we believe disclosure is in accordance with any applicable law, regulation or legal process.</p>
              
              <h3>4. Security</h3>
              <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
              
              <h3>5. Your Choices</h3>
              <p>You may update, correct or delete information about you at any time by logging into your online account. If you wish to delete or deactivate your account, please email us, but note that we may retain certain information as required by law or for legitimate business purposes.</p>
              
              <h3>6. Changes to This Policy</h3>
              <p>We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="copyright" className="mt-6">
            <div className="prose max-w-none dark:prose-invert">
              <h2>Copyright Policy</h2>
              <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h3>1. Copyright Compliance</h3>
              <p>Skanam.lv respects the intellectual property rights of others and expects users of the Service to do the same. It is our policy to respond to notices of alleged copyright infringement that comply with applicable international intellectual property law.</p>
              
              <h3>2. User Content Responsibility</h3>
              <p>Users may only provide content they created, that is in the public domain, or that they have explicit permission to use. Uploading copyrighted content without permission is strictly prohibited.</p>
              
              <h3>3. Reporting Copyright Violations</h3>
              <p>If you believe that your work has been copied in a way that constitutes copyright infringement, please provide us with the following information:</p>
              <ul>
                <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
                <li>Identification of the copyrighted work claimed to have been infringed</li>
                <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity</li>
                <li>Your contact information, including your address, telephone number, and an email address</li>
                <li>A statement by you that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law</li>
                <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
              </ul>
              
              <h3>4. Counter-Notification</h3>
              <p>If you believe that your content was removed by mistake, you may provide us with a written counter-notification. Please include your contact information, identification of the removed content, a statement under penalty of perjury that you have a good faith belief that the content was removed in error, and your consent to the jurisdiction of the federal court.</p>
              
              <h3>5. Repeat Infringers</h3>
              <p>Skanam.lv will, in appropriate circumstances, disable and/or terminate the accounts of users who are repeat infringers.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LegalPage;

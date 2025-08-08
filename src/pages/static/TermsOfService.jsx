import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO, SchemaMarkup } from '../../utils/seoUtils';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Terms of Service | PR GuestPost Marketplace"
        description="Our terms of service outline the rules, guidelines, and legal terms that govern your use of PR GuestPost's guest posting marketplace platform."
        keywords="terms of service, user agreement, legal terms, PR GuestPost, guest posting marketplace, terms and conditions"
        canonical="https://prguest.com/terms-of-service"
      />
      
      <SchemaMarkup
        type="WebPage"
        data={{
          name: "Terms of Service",
          description: "Terms and conditions for using PR GuestPost's guest posting marketplace platform",
          datePublished: "2024-01-01",
          dateModified: "2024-05-15"
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last Updated: May 15, 2024</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to PR GuestPost ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the PR GuestPost website, services, and applications (collectively, the "Services").
            </p>
            <p>
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services. Please read these Terms carefully before using our platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Definitions</h2>
            <p>In these Terms, the following definitions apply:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li><strong>"Buyer"</strong> refers to any user who purchases guest posting services on our platform.</li>
              <li><strong>"Publisher"</strong> refers to any user who offers guest posting opportunities on their websites through our platform.</li>
              <li><strong>"Content"</strong> refers to any text, images, videos, or other material submitted for guest posts.</li>
              <li><strong>"Listing"</strong> refers to a Publisher's offer to publish guest content on their website for a fee.</li>
              <li><strong>"Order"</strong> refers to a Buyer's purchase of a Publisher's services.</li>
              <li><strong>"Platform Fee"</strong> refers to the commission we charge for facilitating transactions between Buyers and Publishers.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Account Registration</h2>
            <p>
              To access certain features of our Services, you must register for an account. When you register, you agree to provide accurate, current, and complete information about yourself. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p>
              You must be at least 18 years old to create an account. By creating an account, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms.
            </p>
            <p>
              We reserve the right to suspend or terminate your account if we have reason to believe that the information you provided is inaccurate, outdated, or incomplete, or if you have violated these Terms.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Publisher Obligations</h2>
            <p>As a Publisher on our platform, you agree to:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>Provide accurate information about your website, including but not limited to traffic statistics, domain authority, and content guidelines.</li>
              <li>Honor all accepted Orders and publish content as agreed, subject to your stated content guidelines.</li>
              <li>Maintain ownership or proper authorization to offer guest posting services on the websites you list.</li>
              <li>Keep the backlinks in published content active for a minimum of 12 months, unless the content violates your guidelines.</li>
              <li>Respond to Buyer inquiries within 48 hours.</li>
              <li>Publish content within the timeframe specified in your listing.</li>
              <li>Not artificially inflate your website metrics or misrepresent your website's quality or reach.</li>
              <li>Not engage in any deceptive practices, including creating fake reviews or manipulating ratings.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Buyer Obligations</h2>
            <p>As a Buyer on our platform, you agree to:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>Submit content that complies with the Publisher's stated guidelines.</li>
              <li>Not submit content that is unlawful, defamatory, harassing, abusive, fraudulent, obscene, or otherwise objectionable.</li>
              <li>Respect the intellectual property rights of others and not submit plagiarized content.</li>
              <li>Pay the full amount for services as specified in the Order.</li>
              <li>Communicate promptly and professionally with Publishers.</li>
              <li>Not attempt to circumvent our platform to avoid paying Platform Fees.</li>
              <li>Not use the Services for spamming or any black-hat SEO practices.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Prohibited Content</h2>
            <p>The following types of content are prohibited on our platform:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>Content related to adult, pornographic, or sexually explicit material</li>
              <li>Content promoting illegal activities, drugs, or regulated substances</li>
              <li>Content containing malware, viruses, or other harmful code</li>
              <li>Content that infringes on the intellectual property rights of others</li>
              <li>Content that promotes discrimination, violence, or hatred</li>
              <li>Content related to gambling or online casinos that doesn't comply with local regulations</li>
              <li>Content that is deceptive, false, or misleading</li>
              <li>Content that violates any applicable laws or regulations</li>
            </ul>
            
            <p>
              We reserve the right to remove any content that violates these prohibitions and to suspend or terminate the accounts of users who submit such content.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Fees and Payments</h2>
            <p>
              We charge a platform fee on all transactions between Buyers and Publishers. This fee is included in the total price shown to Buyers.
            </p>
            <p>
              Publishers receive payment for their services according to our payment schedule, which may be updated from time to time.
            </p>
            <p>
              All payments are processed through our secure payment system. We do not store credit card information on our servers.
            </p>
            <p>
              Refunds may be issued in accordance with our Refund Policy, which is incorporated into these Terms by reference.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Dispute Resolution</h2>
            <p>
              In the event of a dispute between a Buyer and a Publisher, we encourage the parties to first attempt to resolve the issue directly. If the parties cannot reach a resolution, either party may escalate the dispute to our customer support team, who will review the case and make a determination based on our policies and the evidence provided.
            </p>
            <p>
              We reserve the right to make the final decision in any dispute and to take appropriate actions, including but not limited to issuing refunds, removing listings, or suspending accounts.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Intellectual Property</h2>
            <p>
              We respect the intellectual property rights of others and expect our users to do the same. All content submitted to our platform must be original or properly licensed.
            </p>
            <p>
              By submitting content to our platform, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, publish, and distribute such content in connection with our Services.
            </p>
            <p>
              If you believe that your intellectual property rights have been violated on our platform, please contact us at copyright@prguest.com with the following information:
            </p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>Identification of the copyrighted work claimed to have been infringed</li>
              <li>Identification of the allegedly infringing material</li>
              <li>Your contact information</li>
              <li>A statement by you that you have a good faith belief that the disputed use is not authorized</li>
              <li>A statement by you, made under penalty of perjury, that the above information is accurate</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
            </p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>Your access to or use of or inability to access or use the Services</li>
              <li>Any conduct or content of any third party on the Services</li>
              <li>Any content obtained from the Services</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <p>
              In no event shall our aggregate liability exceed the greater of one hundred dollars ($100) or the amount you have paid us in the past six months.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">11. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless PR GuestPost, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Services, your violation of these Terms, or your violation of any rights of another.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">12. Modifications to the Terms</h2>
            <p>
              We may modify these Terms from time to time. If we make material changes to these Terms, we will notify you by email or by posting a notice on our website prior to the changes becoming effective. Your continued use of the Services after the effective date of the revised Terms constitutes your acceptance of such changes.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">13. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the Services at any time, without prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any legal action or proceeding arising out of or relating to these Terms or your use of the Services shall be brought exclusively in the federal or state courts located in San Francisco County, California, and you consent to the personal jurisdiction of such courts.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">15. Miscellaneous</h2>
            <p>
              These Terms constitute the entire agreement between you and PR GuestPost regarding your use of the Services and supersede all prior agreements and understandings, whether written or oral.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
            <p>
              These Terms are not assignable, transferable, or sublicensable by you except with our prior written consent. We may assign, transfer, or delegate any of our rights and obligations under these Terms without consent.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">16. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> legal@prguest.com<br />
              <strong>Postal address:</strong> PR GuestPost Inc., 123 Market Street, Suite 456, San Francisco, CA 94105, USA
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              By using our Services, you acknowledge that you have read and understood these Terms and agree to be bound by them.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;
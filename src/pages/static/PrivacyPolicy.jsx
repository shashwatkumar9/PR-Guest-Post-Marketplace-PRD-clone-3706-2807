import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO, SchemaMarkup } from '../../utils/seoUtils';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Privacy Policy | PR GuestPost Marketplace"
        description="Our privacy policy explains how PR GuestPost collects, uses, and protects your personal information when you use our guest posting marketplace."
        keywords="privacy policy, data protection, user privacy, PR GuestPost, guest posting marketplace, personal data"
        canonical="https://prguest.com/privacy-policy"
      />
      
      <SchemaMarkup
        type="WebPage"
        data={{
          name: "Privacy Policy",
          description: "Our privacy policy explains how PR GuestPost collects, uses, and protects your personal information.",
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last Updated: May 15, 2024</p>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to PR GuestPost ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
            <p>
              This privacy policy aims to give you information on how PR GuestPost collects and processes your personal data through your use of this website, including any data you may provide through this website when you sign up for an account, purchase a service, or participate in our marketplace.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Data We Collect About You</h2>
            <p>Personal data means any information about an individual from which that person can be identified. It does not include data where the identity has been removed (anonymous data).</p>
            <p>We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data</strong> includes billing address, delivery address, email address, and telephone numbers.</li>
              <li><strong>Financial Data</strong> includes payment card details, payment history, and transaction records.</li>
              <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us or listed with us.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
              <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
              <li><strong>Usage Data</strong> includes information about how you use our website, products, and services.</li>
              <li><strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from us and our third parties and your communication preferences.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. How We Collect Your Personal Data</h2>
            <p>We use different methods to collect data from and about you including through:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li><strong>Direct interactions.</strong> You may give us your Identity, Contact, and Financial Data by filling in forms or by corresponding with us by post, phone, email, or otherwise. This includes personal data you provide when you:</li>
              <ul className="list-disc pl-6 mt-2 mb-2">
                <li>Create an account on our website</li>
                <li>Subscribe to our service or publications</li>
                <li>Request marketing to be sent to you</li>
                <li>Enter a competition, promotion, or survey</li>
                <li>List your website on our marketplace</li>
                <li>Purchase guest posting services</li>
                <li>Give us feedback or contact us</li>
              </ul>
              <li><strong>Automated technologies or interactions.</strong> As you interact with our website, we will automatically collect Technical Data about your equipment, browsing actions, and patterns. We collect this personal data by using cookies, server logs, and other similar technologies.</li>
              <li><strong>Third parties or publicly available sources.</strong> We may receive personal data about you from various third parties and public sources such as analytics providers, advertising networks, search information providers, and payment service providers.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. How We Use Your Personal Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
            
            <p>Generally, we do not rely on consent as a legal basis for processing your personal data although we will get your consent before sending direct marketing communications to you via email or text message. You have the right to withdraw consent to marketing at any time by contacting us.</p>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Purposes for which we will use your personal data</h3>
            <p>We have set out below a description of all the ways we plan to use your personal data, and which of the legal bases we rely on to do so:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>To register you as a new customer or publisher</li>
              <li>To process and deliver your orders or listing services</li>
              <li>To manage our relationship with you</li>
              <li>To enable you to participate in a promotion or survey</li>
              <li>To administer and protect our business and this website</li>
              <li>To deliver relevant website content and advertisements to you</li>
              <li>To use data analytics to improve our website, products/services, marketing, customer relationships, and experiences</li>
              <li>To make suggestions and recommendations to you about goods or services that may be of interest to you</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a duty of confidentiality.
            </p>
            <p>
              We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Data Retention</h2>
            <p>
              We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
            </p>
            <p>
              To determine the appropriate retention period for personal data, we consider the amount, nature, and sensitivity of the personal data, the potential risk of harm from unauthorized use or disclosure of your personal data, the purposes for which we process your personal data and whether we can achieve those purposes through other means, and the applicable legal, regulatory, tax, accounting, or other requirements.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">7. Your Legal Rights</h2>
            <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to:</p>
            
            <ul className="list-disc pl-6 mt-4 mb-4">
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data.</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>
            
            <p>
              If you wish to exercise any of the rights set out above, please contact us at privacy@prguest.com.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">8. Cookies</h2>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. For more information about the cookies we use, please see our <Link to="/cookie-policy" className="text-primary-600 hover:text-primary-800">Cookie Policy</Link>.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">9. Changes to the Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top of this privacy policy.
            </p>
            <p>
              You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@prguest.com<br />
              <strong>Postal address:</strong> PR GuestPost Inc., 123 Market Street, Suite 456, San Francisco, CA 94105, USA
            </p>
            
            <p className="mt-8">
              You have the right to make a complaint at any time to the relevant data protection authority in your jurisdiction. We would, however, appreciate the chance to deal with your concerns before you approach the authority, so please contact us in the first instance.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              If you have any questions about our Privacy Policy, please <Link to="/contact" className="text-primary-600 hover:text-primary-800">contact us</Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
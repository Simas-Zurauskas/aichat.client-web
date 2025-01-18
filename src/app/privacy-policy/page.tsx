'use client';
import { Container } from '@mui/material';

const Page = () => {
  return (
    <Container maxWidth="md">
      <article>
        <header>
          <h1>Privacy Policy</h1>
          <p>
            <em>Effective Date: [Date]</em>
          </p>
        </header>

        <section>
          <h2>1. Introduction</h2>
          <p>
            We respect your privacy and are committed to complying with the EU General Data Protection Regulation (GDPR)
            and the California Consumer Privacy Act (CCPA), where applicable.
          </p>
        </section>

        <section>
          <h2>2. Data We Collect</h2>
          <ul>
            <li>
              <strong>Account Information:</strong> We collect your email address and profile information through Google
              OAuth for authentication.
            </li>
            <li>
              <strong>User Content:</strong> We store and process any files (PDF, DOCX) you upload to create chat
              contexts. These files are stored encrypted on AWS S3.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect usage statistics (e.g., number of chat instances, vector
              operations) to operate and improve the App.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>
              <strong>Service Provision:</strong> To authenticate you, store your files, and enable your chat instances.
            </li>
            <li>
              <strong>Service Improvement:</strong> To analyze usage trends to improve and maintain the App.
            </li>
            <li>
              <strong>Legal Compliance:</strong> To comply with any court order, law, or legal process, and to respond
              to lawful requests by public authorities.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Data Sharing</h2>
          <p>
            We do not sell your personal data to third parties. We may share data with service providers (e.g., AWS)
            strictly for the purpose of hosting and encrypting your files. We may disclose your data if required by law
            or to enforce our T&amp;C.
          </p>
        </section>

        <section>
          <h2>5. Data Retention and Deletion</h2>
          <ul>
            <li>
              <strong>Files and Chat Instances:</strong> Automatically deleted 1 month after chat instance creation, or
              earlier if you choose to delete them.
            </li>
            <li>
              <strong>Account Data:</strong> Retained until you delete your account, after which all associated data
              (including files and embeddings) will be permanently deleted.
            </li>
            <li>
              <strong>Retention Exceptions:</strong> We may retain minimal data to comply with legal obligations, but
              only if strictly necessary and in accordance with GDPR/CCPA.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Your Rights (GDPR/CCPA)</h2>
          <ul>
            <li>
              <strong>Access and Portability:</strong> You can request a copy of your personal data.
            </li>
            <li>
              <strong>Rectification and Erasure:</strong> You can request correction or deletion of your personal data
              at any time by contacting us or by deleting your account.
            </li>
            <li>
              <strong>Opt-out:</strong> You can opt out of certain uses of your data where applicable under GDPR/CCPA.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Data Security</h2>
          <p>
            We use encryption and secure storage solutions (e.g., AWS S3) to protect your data. However, no method of
            transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>8. Children’s Privacy</h2>
          <p>
            This App is not directed to individuals under the age of [13/16 depending on your jurisdiction]. We do not
            knowingly collect personal data from children.
          </p>
        </section>

        <section>
          <h2>9. International Transfers</h2>
          <p>
            If you access our App from outside [Your Country], your data may be transferred to and processed in [Your
            Country]. We take steps to ensure data protection remains consistent with GDPR/CCPA.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make significant changes, we will notify you.
            Continued use of the App after changes are posted constitutes acceptance of the revised Policy.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            For any questions or requests regarding this Privacy Policy or your personal data, please contact us at:
          </p>
          <address>
            Email: <a href="mailto:simaszurauskas@gmail.com">simaszurauskas@gmail.com</a>
          </address>
        </section>
      </article>
    </Container>
  );
};

export default Page;

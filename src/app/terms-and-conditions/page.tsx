'use client';
import { Container } from '@mui/material';

const Page = () => {
  return (
    <Container maxWidth="md">
      <article>
        <header>
          <h1>Terms and Conditions</h1>
          <p>
            <em>Effective Date: [Date]</em>
          </p>
        </header>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using this service (“App”), you agree to be bound by these Terms and Conditions
            (“T&amp;C”). If you do not agree, please discontinue use immediately.
          </p>
        </section>

        <section>
          <h2>2. Eligibility</h2>
          <p>
            You must be at least the age of majority in your jurisdiction to use the App. By using the App, you
            represent and warrant that you meet this requirement.
          </p>
        </section>

        <section>
          <h2>3. Account Registration</h2>
          <ul>
            <li>You may sign up using Google OAuth only.</li>
            <li>You are responsible for all activity under your account.</li>
            <li>You may delete your account at any time, and all associated data will be permanently removed.</li>
          </ul>
        </section>

        <section>
          <h2>4. User-Generated Content</h2>
          <p>
            You may upload PDF and DOCX files (“User Content”) to create custom contexts for your chat instances. You
            represent and warrant that you have all necessary rights to upload and use such User Content. We do not
            endorse, control, or take responsibility for any User Content you or others upload.
          </p>
        </section>

        <section>
          <h2>5. Chat Instances</h2>
          <ul>
            <li>You may create up to five (5) chat instances at a time.</li>
            <li>
              Each chat instance and all related files and embeddings will be automatically deleted one (1) month after
              creation.
            </li>
            <li>You may delete or add files to an instance at any time before it expires.</li>
            <li>All instance-related data is permanently lost when deleted.</li>
          </ul>
        </section>

        <section>
          <h2>6. Vector Operations</h2>
          <p>
            Your account is limited to 50,000 vector operations per month across all instances. A “vector operation” is
            defined as the addition of one vector to the database.
          </p>
        </section>

        <section>
          <h2>7. Restrictions</h2>
          <p>
            You will not use the App to store or share any unlawful, harmful, or infringing material. You are solely
            responsible for compliance with all applicable local, state, national, and international laws.
          </p>
        </section>

        <section>
          <h2>8. Disclaimers</h2>
          <p>
            <strong>No Warranties:</strong> The App is provided on an “AS IS” and “AS AVAILABLE” basis. We disclaim any
            warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, we are not liable for any
            damages, including but not limited to direct, indirect, incidental, special, or consequential damages, or
            loss of data arising out of or related to your use of the App.
          </p>
        </section>

        <section>
          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold us harmless from any claims, damages, liabilities, and expenses (including
            legal fees) arising out of your use or misuse of the App or your breach of these T&amp;C.
          </p>
        </section>

        <section>
          <h2>10. Modifications</h2>
          <p>
            We reserve the right to modify these T&amp;C at any time. If we make material changes, we will notify you.
            Your continued use of the App after changes are posted constitutes your acceptance of the revised T&amp;C.
          </p>
        </section>

        <section>
          <h2>11. Governing Law and Jurisdiction</h2>
          <p>
            These T&amp;C will be governed by and construed in accordance with the laws of the Republic of Lithuania and
            applicable European Union regulations, without regard to conflict of law provisions. Any dispute arising
            from these T&C shall be brought exclusively before the competent courts of the Republic of Lithuania, unless
            otherwise required by mandatory consumer protection laws in your country of residence.
          </p>
        </section>
      </article>
    </Container>
  );
};

export default Page;

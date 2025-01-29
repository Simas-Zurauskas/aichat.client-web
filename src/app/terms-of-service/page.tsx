'use client';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

const Wrap = styled(Container)`
  * {
    color: ${({ theme }) => {
      return theme.colors.text;
    }};
  }
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  margin-bottom: 4rem;
`;

const Page = () => {
  return (
    <Wrap maxWidth="md">
      <h1>Terms of Service for ProMax.AI</h1>
      <p>
        <strong>Last Updated:</strong> 27th January 2025
      </p>

      <p>
        Welcome to <strong>ProMax.AI</strong> ("the App"). By accessing or using the App, you agree to comply with and
        be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the App.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using the App, you confirm that you are at least 18 years old or have the legal capacity to enter into this
        agreement. You also agree to these Terms and our{' '}
        <a href="/privacy-policy" target="_blank">
          Privacy Policy
        </a>
        .
      </p>

      <h2>2. Description of Service</h2>
      <p>ProMax.AI is a web application that allows users to:</p>
      <ul>
        <li>Sign in/up using Google OAuth.</li>
        <li>Create custom chat instances powered by LLMs (e.g., GPT-4, Gemini 1.5 Pro, DeepSeek V3, DeepSeek R1).</li>
        <li>Upload and manage PDF and DOCX files, which are stored and encrypted on AWS S3.</li>
        <li>Generate vector embeddings from uploaded files for use in chat instances.</li>
        <li>Manage multiple chat instances, each with customizable settings and context.</li>
      </ul>

      <h2>3. User Responsibilities</h2>
      <p>You agree to the following:</p>
      <ul>
        <li>You are solely responsible for the content you upload, including files and text context.</li>
        <li>You will not upload sensitive, illegal, or harmful content.</li>
        <li>
          You will not exceed the usage limits, including the maximum of 6 active instances and 20,000 vector operations
          per month.
        </li>
        <li>You will comply with all applicable laws and regulations.</li>
      </ul>

      <h2>4. Data Management</h2>
      <ul>
        <li>
          Chat instances and associated files are automatically deleted after 1 month of creation unless extended by the
          user.
        </li>
        <li>
          You may extend the lifetime of an instance by 30 days from the extension date. Extensions can be repeated
          multiple times.
        </li>
        <li>
          You may delete your account at any time, which will permanently remove all associated data, including files,
          embeddings, and chat instances.
        </li>
      </ul>

      <h2>5. Limitations of Liability</h2>
      <p>
        The App is provided "as is," and we make no warranties regarding its functionality, accuracy, or reliability.
        You agree that:
      </p>
      <ul>
        <li>We are not responsible for any damages, losses, or legal issues arising from your use of the App.</li>
        <li>You indemnify and hold us harmless from any claims related to your use of the App.</li>
      </ul>

      <h2>6. Third-Party Services</h2>
      <p>The App uses the following third-party services:</p>
      <ul>
        <li>
          <strong>Google OAuth</strong> for authentication.
        </li>
        <li>
          <strong>AWS S3</strong> for file storage and encryption.
        </li>
      </ul>
      <p>These services have their own terms and policies, and we are not responsible for their practices.</p>

      <h2>7. Prohibited Activities</h2>
      <p>You must not:</p>
      <ul>
        <li>Use the App for illegal or unauthorized purposes.</li>
        <li>Attempt to reverse-engineer, hack, or disrupt the App.</li>
        <li>Share your account credentials or allow others to access your account.</li>
      </ul>

      <h2>8. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to the App at any time, with or without notice, for
        violations of these Terms or for any other reason.
      </p>
      <p>
        We reserve the right to discontinue or shut down the App at any time, with or without prior notice. Upon
        shutdown, all user data, including uploaded files, vector embeddings, and chat instances, will be permanently
        deleted. We assume no liability for any loss of data or disruption caused by the termination of the App.
      </p>

      <h2>9. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. Any changes will be posted on this page, and your continued use of
        the App constitutes acceptance of the updated Terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of Lithuania. Any disputes arising from these Terms or your use of the App
        will be resolved in the courts of Lithuania.
      </p>

      <h2>11. Contact Information</h2>
      <p>
        If you have any questions about these Terms, please contact us at:{' '}
        <a href="mailto:simaszurauskas@gmail.com">simaszurauskas@gmail.com</a>.
      </p>
    </Wrap>
  );
};

export default Page;

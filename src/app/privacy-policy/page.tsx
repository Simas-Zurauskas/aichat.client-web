'use client';
import { Container } from '@mui/material';
import styled from '@emotion/styled';

const Wrap = styled(Container)`
  * {
    color: ${({ theme }) => theme.colors.text};
  }
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  margin-bottom: 4rem;
`;

const Page = () => {
  return (
    <Wrap maxWidth="md">
      <h1>Privacy Policy for ProMax.AI</h1>
      <p>
        <strong>Last Updated:</strong> 27th January 2025
      </p>

      <p>
        Thank you for using <strong>ProMax.AI</strong> ("the App"). This Privacy Policy explains how we handle your
        information when you use our services. By using the App, you agree to the terms outlined in this policy.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect and process the following information:</p>
      <ul>
        <li>
          <strong>Google OAuth Data:</strong> When you sign in/up using Google OAuth, we collect your email address and
          basic profile information provided by Google.
        </li>
        <li>
          <strong>User-Uploaded Files:</strong> You may upload PDF and DOCX files to create custom chat instances. These
          files are stored and encrypted on AWS S3.
        </li>
        <li>
          <strong>Text Context:</strong> You may provide additional text context for uploaded files to improve the
          functionality of the App.
        </li>
        <li>
          <strong>Usage Data:</strong> We track the number of vector operations (vector ops) performed by your account.
        </li>
      </ul>
      <p>We do not collect any other personal data.</p>

      <h2>2. How We Use Your Information</h2>
      <p>Your information is used solely for the following purposes:</p>
      <ul>
        <li>To provide and maintain the App's functionality.</li>
        <li>To process and store your uploaded files and associated text context.</li>
        <li>To generate vector embeddings for chat instances.</li>
        <li>To enforce usage limits (e.g., vector ops and instance limits).</li>
        <li>To delete your data upon account deletion or instance expiration.</li>
      </ul>

      <h2>3. Data Storage and Security</h2>
      <ul>
        <li>
          <strong>File Storage:</strong> Uploaded files are stored and encrypted on AWS S3.
        </li>
        <li>
          <strong>Data Retention:</strong> Chat instances and associated files are automatically deleted after 1 month
          of creation unless extended by the user. Extensions add 30 days from the extension date.
        </li>
        <li>
          <strong>Account Deletion:</strong> You may delete your account at any time, which will permanently remove all
          associated data, including files, embeddings, and chat instances.
        </li>
      </ul>

      <h2>4. Your Responsibilities</h2>
      <ul>
        <li>You are solely responsible for the content you upload and the text context you provide.</li>
        <li>You agree not to upload sensitive, illegal, or harmful content.</li>
        <li>
          You acknowledge that the App is not responsible for the accuracy, legality, or consequences of your use of the
          App.
        </li>
      </ul>

      <h2>5. Limitations of Liability</h2>
      <ul>
        <li>
          The App is provided "as is," and we make no warranties regarding its functionality, accuracy, or reliability.
        </li>
        <li>We are not responsible for any damages, losses, or legal issues arising from your use of the App.</li>
        <li>You agree to indemnify and hold us harmless from any claims related to your use of the App.</li>
      </ul>

      <h2>6. Third-Party Services</h2>
      <p>
        The App uses <strong>Google OAuth</strong> for authentication and <strong>AWS S3</strong> for file storage.
        These third-party services have their own privacy policies, and we are not responsible for their practices.
      </p>

      <h2>7. Compliance with Laws</h2>
      <ul>
        <li>
          The App complies with the <strong>General Data Protection Regulation (GDPR)</strong> and other applicable
          privacy laws.
        </li>
        <li>
          If you are located outside the European Union, you consent to the transfer and processing of your data in
          accordance with this policy.
        </li>
      </ul>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued
        use of the App constitutes acceptance of the updated policy.
      </p>

      <h2>9. Contact Information</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:{' '}
        <a href="mailto:simaszurauskas@gmail.com">simaszurauskas@gmail.com</a>.
      </p>
    </Wrap>
  );
};

export default Page;

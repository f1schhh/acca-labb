import { Box, Container, Typography, Button, Paper } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container
      maxWidth="md"
      sx={{ py: 4 }}
    >
      <Paper sx={{ p: 4 }}>
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
          >
            Privacy Policy
          </Typography>
          <Typography>Last updated: 11/12/2024</Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Data We Collect
          </Typography>
          <div>
            We collect various types of information to provide you with the best
            possible experience. The information we gather may include:
            <ul>
              <li>
                <strong>Personal Information</strong>: Name, email address,
                phone number, home address, city, country, and postal code.
              </li>
              <li>
                <strong>Account and Login Information</strong>: Account
                credentials and session details.
              </li>
              <li>
                <strong>Job-Related Information</strong>: Job titles, job
                locations, company names, application statuses, and related
                data.
              </li>
              <li>
                <strong>Communication Information</strong>: Any communication
                you have with us, such as support queries or feedback.
              </li>
              <li>
                <strong>Device and Usage Information</strong>: Information about
                your device, browser, IP address, and usage activities.
              </li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            How We Use Your Data
          </Typography>
          <div>
            We use the information we collect for the following purposes:
            <ul>
              <li>
                <strong>Account Management</strong>: To create and manage your
                user account, verify your email, and maintain security.
              </li>
              <li>
                <strong>Job Services</strong>: To save job listings, track job
                applications, and facilitate your job search and applications.
              </li>
              <li>
                <strong>Communication</strong>: To send you updates,
                notifications, and important messages related to your account or
                job applications.
              </li>
              <li>
                <strong>Personalization</strong>: To personalize your experience
                on our platform, including job recommendations.
              </li>
              <li>
                <strong>Marketing</strong>: To send you marketing emails and
                promotions. You can opt out of marketing emails at any time.
              </li>
              <li>
                <strong>Security</strong>: To ensure the security of our
                services and prevent fraud.
              </li>
              <li>
                <strong>Legal Compliance</strong>: To comply with legal
                requirements or respond to lawful requests from authorities.
              </li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            How We Share Your Information
          </Typography>
          <div>
            We do not sell your personal data. However, we may share your data
            in the following circumstances:
            <ul>
              <li>
                <strong>Service Providers</strong>: With third-party vendors who
                help us deliver services such as email providers or cloud
                storage.
              </li>
              <li>
                <strong>Business Transfers</strong>: In the case of a merger,
                acquisition, or asset sale.
              </li>
              <li>
                <strong>Legal Requirements</strong>: To comply with legal
                obligations or respond to requests from authorities.
              </li>
              <li>
                <strong>Job Applications</strong>: Job companies may receive
                your application details if you apply for a job through our
                platform.
              </li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            Data Retention
          </Typography>
          <Typography>
            We retain your data as long as necessary to fulfill the purposes
            outlined in this policy, including legal or regulatory compliance.
            We will delete your data upon account deletion, subject to retention
            policies.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Your Data Protection Rights
          </Typography>
          <div>
            You have the following rights regarding your personal data:
            <ul>
              <li>
                <strong>Access</strong>: You can request access to the personal
                data we hold about you.
              </li>
              <li>
                <strong>Correction</strong>: You can request updates to any
                inaccurate or incomplete data.
              </li>
              <li>
                <strong>Deletion</strong>: You can request the deletion of your
                personal data, subject to exceptions.
              </li>
              <li>
                <strong>Opt-out of Marketing</strong>: You can unsubscribe from
                marketing communications at any time.
              </li>
              <li>
                <strong>Data Portability</strong>: Request a copy of your data
                in a machine-readable format.
              </li>
              <li>
                <strong>Objection to Processing</strong>: You may object to
                certain processing activities, including marketing.
              </li>
            </ul>
            To exercise your rights, please contact us at [Contact Email].
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            Data Security
          </Typography>
          <Typography>
            We implement a variety of security measures to protect your personal
            data, including encryption and secure access controls. However,
            please be aware that no transmission method is 100% secure.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Cookies and Tracking Technologies
          </Typography>
          <Typography>
            We use cookies and tracking technologies to improve your experience
            on our platform. You can control cookie settings through your
            browser, but disabling cookies may affect service functionality.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            International Data Transfers
          </Typography>
          <Typography>
            Your personal data may be transferred to countries outside your
            region, and we ensure appropriate safeguards are in place for
            compliance with applicable laws.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Children&apos;s Privacy
          </Typography>
          <Typography>
            Our services are not intended for children under 13 years old, and
            we do not knowingly collect personal information from children.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Changes to This Privacy Policy
          </Typography>
          <Typography>
            We reserve the right to update this policy. Changes will be posted
            on this page with an updated &quot;Effective Date.&quot; We
            encourage you to review the policy periodically.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Contact Us
          </Typography>
          <div>
            If you have questions or concerns about this Privacy Policy, please
            contact us at:
            <ul>
              <li>Email: [Contact Email]</li>
              <li>Phone: [Contact Phone Number]</li>
              <li>Address: [Company Address]</li>
            </ul>
          </div>

          <Button
            variant="contained"
            href="/signup"
          >
            Back to signup
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

import { Box, Container, Typography, Button, Paper } from "@mui/material";

export default function PersonalDataRecord() {
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
            Record for Personal Data Processing
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Name and Contact Information of the Data Controller, the Data
            Controller&apos;s Representative, and the Data Protection Officer
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Data Controller</strong>: Acca AB
              </li>
              <li>
                <strong>Contact Information</strong>:
                <ul>
                  <li>Phone: +46 73 1234567</li>
                  <li>Email: info@acca.com</li>
                  <li>Address: Drottninggatan 1</li>
                </ul>
              </li>
              <li>
                <strong>Representative</strong>: Acca Brynelsson, CEO
              </li>
              <li>
                <strong>Data Protection Officer</strong>: Jessika Persson,
                jessika.persson@acca.com, +46 73 1234567
              </li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            Purpose of Processing
          </Typography>
          <div>
            Personal data is processed to:
            <ul>
              <li>Maintain and manage user accounts</li>
              <li>Communicate with users for customer service and support</li>
              <li>Fulfill contractual obligations</li>
              <li>Send information and marketing (upon consent)</li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            Description of Categories of Data Subjects and Categories of
            Personal Data
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Categories of Data Subjects</strong>: Customers, users,
                employees
              </li>
              <li>
                <strong>Categories of Personal Data</strong>:
                <ul>
                  <li>First name</li>
                  <li>Last name</li>
                  <li>Email address</li>
                  <li>Password (encrypted)</li>
                  <li>Address (street, postal code, city, country)</li>
                  <li>Phone number</li>
                </ul>
              </li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            Categories of Recipients to Whom Personal Data Has Been or Will Be
            Disclosed
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Internal</strong>: Customer service and technical
                support
              </li>
              <li>
                <strong>External</strong>: IT service providers, payment
                providers, marketing partners (if applicable and with consent)
              </li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            Transfers of Personal Data to a Third Country or an International
            Organization
          </Typography>
          <Typography>
            <strong>Transfers</strong>: No
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
          >
            Intended Time Limits for Deletion of Various Categories of Data
          </Typography>
          <div>
            <ul>
              <li>For customer data: 1 year</li>
              <li>For employees: 5 years after end of employment</li>
              <li>For marketing data: Until consent is withdrawn</li>
            </ul>
          </div>

          <Typography
            variant="h5"
            gutterBottom
          >
            General Description of Technical and Organizational Security
            Measures
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Technical Measures</strong>:
                <ul>
                  <li>Encryption of sensitive information, e.g., passwords</li>
                  <li>Firewalls and antivirus software for network security</li>
                  <li>Regular security updates for systems</li>
                </ul>
              </li>
              <li>
                <strong>Organizational Measures</strong>:
                <ul>
                  <li>Access restrictions based on job roles</li>
                  <li>Data protection training for employees</li>
                  <li>Regular security audits and risk assessments</li>
                </ul>
              </li>
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

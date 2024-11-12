import { Box, Container, Typography, Button, Paper } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography>Last updated: 11/12/2024</Typography>

          <Typography variant="h5" gutterBottom>
            Data We Collect
          </Typography>
          <Typography>
            We collect and process the following personal data: - Email address
            - Name - Job application details - Account preferences
          </Typography>

          <Typography variant="h5" gutterBottom>
            How We Use Your Data
          </Typography>
          <Typography>
            Your data is used to: - Manage your job applications - Provide
            application tracking services - Send relevant notifications
          </Typography>

          <Typography variant="h5" gutterBottom>
            Your Rights
          </Typography>
          <Typography>
            You have the right to: - Access your personal data - Request data
            deletion - Export your data - Withdraw consent
          </Typography>
        </Box>
        <Button variant="contained" href="/signup">
          Back to signup
        </Button>
      </Paper>
    </Container>
  );
}

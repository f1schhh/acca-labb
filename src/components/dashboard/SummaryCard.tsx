import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SummaryCard({
  title,
  stat,
  jobbTitle,
  companyTitle,
}: {
  title: string;
  stat?: number;
  jobbTitle?: string;
  companyTitle?: string;
}) {
  return (
    <Card variant="outlined" sx={{ width: { xs: "100%", sm: "100%" } }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {title}
        </Typography>
        {stat && (
          <Typography
            variant="body1"
            sx={{ color: "text.primary", fontSize: 20 }}
          >
            {stat}
          </Typography>
        )}
        {jobbTitle && companyTitle && (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 20, fontWeight: 600 }}
          >
            {jobbTitle} at {companyTitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

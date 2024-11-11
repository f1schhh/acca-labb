import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SummaryCard({
  title,
  stat = 0,
}: {
  title: string;
  stat: number;
}) {
  return (
    <Card variant="outlined" sx={{ width: { xs: "100%", sm: "100%" } }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontSize: 25 }}
        >
          {stat}
        </Typography>
      </CardContent>
    </Card>
  );
}

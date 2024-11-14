import { Box, Container, Typography, Button, Paper } from "@mui/material";

export default function PersonalDataRecord() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Register för behandling av personuppgifter
          </Typography>

          <Typography variant="h5" gutterBottom>
            Namn och kontaktuppgifter för den personuppgiftsansvarige, den
            personuppgiftsansvariges företrädare samt dataskyddsombudet
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Personuppgiftsansvarig</strong>: Acca AB
              </li>
              <li>
                <strong>Kontaktuppgifter</strong>:
                <ul>
                  <li>Telefon: +46 73 1234567</li>
                  <li>E-post: info@acca.se</li>
                  <li>Adress: Drottninggatan 1</li>
                </ul>
              </li>
              <li>
                <strong>Företrädare</strong>: Acca Brynelsson, CEO
              </li>
              <li>
                <strong>Dataskyddsombud</strong>: Jessika Persson,
                jessika.persson@acca.se, +46 73 1234567
              </li>
            </ul>
          </div>

          <Typography variant="h5" gutterBottom>
            Ändamålen med behandlingen
          </Typography>
          <div>
            Personuppgifterna behandlas för att:
            <ul>
              <li>Underhålla och administrera användarkonton</li>
              <li>Kommunicera med användare för kundservice och support</li>
              <li>Fullgöra avtalsförpliktelser</li>
              <li>Skicka information och marknadsföring (efter medgivande)</li>
            </ul>
          </div>

          <Typography variant="h5" gutterBottom>
            Beskrivning av kategorierna av registrerade och kategorierna av
            personuppgifter
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Kategorier av registrerade</strong>: Kunder, användare,
                anställda
              </li>
              <li>
                <strong>Kategorier av personuppgifter</strong>:
                <ul>
                  <li>Förnamn</li>
                  <li>Efternamn</li>
                  <li>E-postadress</li>
                  <li>Lösenord (krypterat)</li>
                  <li>Adress (gata, postnummer, stad, land)</li>
                  <li>Telefonnummer</li>
                </ul>
              </li>
            </ul>
          </div>

          <Typography variant="h5" gutterBottom>
            Kategorier av mottagare till vilka personuppgifterna har lämnats
            eller ska lämnas ut
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Internt</strong>: Kundservice och teknisk support
              </li>
              <li>
                <strong>Externt</strong>: Leverantörer av IT-tjänster,
                betalningsleverantörer, marknadsföringspartners (om tillämpligt
                och efter medgivande)
              </li>
            </ul>
          </div>

          <Typography variant="h5" gutterBottom>
            Överföringar av personuppgifter till ett tredjeland eller en
            internationell organisation
          </Typography>
          <Typography>
            <strong>Överföringar</strong>: Nej
          </Typography>

          <Typography variant="h5" gutterBottom>
            Förutsedda tidsfrister för radering av de olika kategorierna av
            uppgifter
          </Typography>
          <div>
            <ul>
              <li>För kunddata: 1 år</li>
              <li>För anställda: 5 år efter avslutad anställning</li>
              <li>För marknadsföringsdata: Tills samtycke återkallas</li>
            </ul>
          </div>

          <Typography variant="h5" gutterBottom>
            Allmän beskrivning av tekniska och organisatoriska säkerhetsåtgärder
          </Typography>
          <div>
            <ul>
              <li>
                <strong>Tekniska åtgärder</strong>:
                <ul>
                  <li>Kryptering av känslig information, t.ex. lösenord</li>
                  <li>Brandväggar och antivirusprogram för nätverkssäkerhet</li>
                  <li>Regelbundna säkerhetsuppdateringar av system</li>
                </ul>
              </li>
              <li>
                <strong>Organisatoriska åtgärder</strong>:
                <ul>
                  <li>Tillgångsbegränsning baserat på arbetsroll</li>
                  <li>Utbildning i dataskydd för anställda</li>
                  <li>Regelbundna säkerhetskontroller och riskanalyser</li>
                </ul>
              </li>
            </ul>
          </div>

          <Button variant="contained" href="/signup">
            Back to signup
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

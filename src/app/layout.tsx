import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Container, CssBaseline } from "@mui/material";
import { Metadata } from "next";
import siteConfig from "../../config/siteConfig";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});
export const metadata: Metadata = {
  title: siteConfig.siteName,
  description: siteConfig.description,
  authors: {
    name: siteConfig.author,
    url: siteConfig.baseUrl,
  },
  keywords: siteConfig.keywords,
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
              maxWidth="xl"
              disableGutters
            >
              {children}
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

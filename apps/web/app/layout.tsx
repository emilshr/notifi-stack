import { NotifiWrapper } from "@emilshr/notifi";
import { AppContextProviders } from "../server/TrpcProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProviders>
      <NotifiWrapper>
        <html lang="en">
          <body>{children}</body>
        </html>
      </NotifiWrapper>
    </AppContextProviders>
  );
}

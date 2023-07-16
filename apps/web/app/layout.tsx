import { AppContextProviders } from "./TrpcProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppContextProviders>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AppContextProviders>
  );
}

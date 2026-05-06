import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <title>ЭЕШ материалууд</title>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

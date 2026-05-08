import "./globals.css";
export const metadata = {
  title: "ЭЕШ материалууд",
  description: "ЭЕШ-ийн материалууд by Damiigaa ,Gankhuleg",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

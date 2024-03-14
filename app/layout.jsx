import "@styles/globals.css";

export const metadata = {
  title: "Word Vault",
  description: "Search through a catelogue of dictionary words to find their meaning and information.",
  icons: {
    icon: "/favicon_book.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
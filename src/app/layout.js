import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from "../components/ui/provider";
import Header from '../components/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'My Portfolio',
  description: 'Crafted by a Full Stack Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

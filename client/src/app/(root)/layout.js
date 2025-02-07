import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import toast, { Toaster } from 'react-hot-toast';
export const metadata = {
  title: "Blinket",
  description: "HomePage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="min-h-[75vh]">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

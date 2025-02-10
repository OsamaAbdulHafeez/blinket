import Header from "@/components/header";
import DashboardPage from "./page";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <Header />
          <DashboardPage child={children} />
          <Footer />
          <Toaster />
      </body>
    </html>
  );
}

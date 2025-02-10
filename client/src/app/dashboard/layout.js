import Header from "@/components/header";
import DashboardPage from "./page";
import Footer from "@/components/footer";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <DashboardPage child={children}/>
        <Footer/>
      </body>
    </html>
  );
}

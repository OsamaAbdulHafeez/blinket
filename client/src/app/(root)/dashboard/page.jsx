"use client"
import UserMenuList from "@/components/userMenu/userMenuList";

const DashboardPage = ({ children }) => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
        <div className="py-8 sticky top-6 overflow-y-auto hidden lg:block">
            <UserMenuList/>
        </div>
        <div className="bg-white p-4">
            {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
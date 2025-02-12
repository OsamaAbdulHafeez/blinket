"use client"
import UserMenuList from "@/components/userMenu/userMenuList";

const DashboardPage = ({child}) => {
  return (
    <section className="bg-white min-h-[75vh]">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
        <div className="py-8 sticky top-6 overflow-y-auto hidden lg:block border-r">
            <UserMenuList/>
        </div>
        <div className="bg-white">
            {child}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
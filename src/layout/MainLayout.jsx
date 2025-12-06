import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const { pathname } = useLocation();

  const isNotFound = pathname === "/404";

  return (
    <>
      {!isNotFound && <Navbar />}

      <main className="min-h-screen max-w-7xl mx-auto px-4">
        <Outlet />
      </main>

      {!isNotFound && <Footer />}
    </>
  );
}

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SportsComponent from "../components/sport/Sports";

function SportsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SportsComponent />
      <Footer />
    </div>
  );
}

export default SportsPage;

import React from "react";
import Navbar from "../components/Navbar";
import SportsComponent from "../components/sport/Sports";

function SportsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <SportsComponent />
    </div>
  );
}

export default SportsPage;

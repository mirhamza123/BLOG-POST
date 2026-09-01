import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TravalComponent from "../components/traval/Traval";

function TravalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <TravalComponent />
      <Footer />
    </div>
  );
}

export default TravalPage;

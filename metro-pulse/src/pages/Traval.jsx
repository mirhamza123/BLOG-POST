import React from "react";
import Navbar from "../components/Navbar";
import TravalComponent from "../components/traval/Traval";

function TravalPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <TravalComponent />
    </div>
  );
}

export default TravalPage;

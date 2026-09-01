import React from "react";
import Navbar from "../components/Navbar";
import HomeComponent from "../components/home/HeroArticle";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <HomeComponent />
    </div>
  );
}

export default Home;

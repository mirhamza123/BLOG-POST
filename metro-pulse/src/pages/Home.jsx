import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeComponent from "../components/home/HeroArticle";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <HomeComponent />
      <Footer />
    </div>
  );
}

export default Home;

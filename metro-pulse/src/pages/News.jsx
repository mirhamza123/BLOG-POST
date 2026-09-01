import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsComponent from "../components/news/News";

function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <NewsComponent />
      <Footer />
    </div>
  );
}

export default NewsPage;

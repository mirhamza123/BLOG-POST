import React from "react";
import Navbar from "../components/Navbar";
import NewsComponent from "../components/news/News";

function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <NewsComponent />
    </div>
  );
}

export default NewsPage;

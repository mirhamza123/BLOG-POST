import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import Sports from "./pages/Sports";
import Traval from "./pages/Traval";
import CardDtail from "./components/CardDtail";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />
            }
          />
          <Route path="/news" element={<News searchQuery={searchQuery} />} />
          <Route
            path="/sports"
            element={<Sports searchQuery={searchQuery} />}
          />
          <Route
            path="/travel"
            element={<Traval searchQuery={searchQuery} />}
          />
          <Route
            path="/traval"
            element={<Traval searchQuery={searchQuery} />}
          />
          <Route path="/article/:slug" element={<CardDtail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

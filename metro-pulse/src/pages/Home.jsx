import React from "react";
import HomeComponent from "../components/home/HeroArticle";

function Home({ searchQuery, selectedCategory }) {
  return (
    <HomeComponent
      searchQuery={searchQuery}
      selectedCategory={selectedCategory}
    />
  );
}

export default Home;

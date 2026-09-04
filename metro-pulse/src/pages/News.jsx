import React from "react";
import NewsComponent from "../components/news/News";

function NewsPage({ searchQuery }) {
  return <NewsComponent searchQuery={searchQuery} />;
}

export default NewsPage;
